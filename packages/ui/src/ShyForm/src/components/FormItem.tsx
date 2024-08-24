import type { Ref } from 'vue'
import { computed, defineComponent, toRefs, unref, ref } from 'vue'
import type { FormProps, FormSchema } from '../types/form'
import type { Rule as ValidationRule } from 'ant-design-vue/lib/form/interface'

import { Col, Form } from 'ant-design-vue'
import { ShyComponentMap } from '../ShyComponentMap'
import { BasicHelp } from '../../..//Basic'
import { isBoolean, isFunction, isNull, getSlot } from '@shy-plugins/utils'
import { createPlaceholderMessage, setComponentRuleType } from '../helper'
import { cloneDeep, get, upperFirst } from 'lodash-es'
import { useItemLabelWidth } from '../hooks/useLabelWidth'
import { BasicTitle as Divider } from '../../../Basic/'
import { useGlobalConfig } from '../../../../config/index'
import { FormItemProps } from '../props'

const FormItem = defineComponent({
  inheritAttrs: false,
  props: FormItemProps,
  setup(props, { slots, attrs }) {
    const { config } = useGlobalConfig('form')

    const { schema, formProps } = toRefs(props) as {
      schema: Ref<FormSchema>
      formProps: Ref<FormProps>
    }

    const itemLabelWidthProp = useItemLabelWidth(schema, formProps)

    const getValues = computed(() => {
      const { allDefaultValues, formModel, schema } = props
      const { mergeDynamicData } = props.formProps
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...allDefaultValues,
          ...formModel
        } as Recordable,
        schema: schema
      }
    })

    const isTableForm = computed(() => !!formProps.value.formLabelInInput)

    const flag = ref(0)

    const getComponentsProps = computed(() => {
      const { schema, tableAction, formModel, formActionType } = props

      let { componentProps = {} as any } = schema
      if (isFunction(componentProps)) {
        componentProps =
          componentProps({ schema, tableAction, formModel, formActionType }) ??
          {}
      }

      if (schema.component === 'Divider') {
        componentProps = Object.assign({ type: 'horizontal' }, componentProps, {
          orientation: 'left',
          plain: true,
          label: schema?.label || ''
        })
      }

      if (schema.component === 'Group') {
        componentProps = Object.assign(componentProps, {
          ...props
        })
      }

      if (
        schema.component.includes('Picker') ||
        schema.component.includes('Select')
      ) {
        componentProps.getPopupContainer = () => document.body
      }

      if (['RangePicker', 'DatePicker'].includes(schema.component)) {
        componentProps.monthCellRender = ({ current }) => {
          if (current.month() === new Date().getMonth()) {
            return (
              <div class="ant-picker-cell-inner ant-picker-cell-now">
                {`${current.month() + 1}月`}
              </div>
            )
          }
          return (
            <div class="ant-picker-cell-inner">
              {`${current.month() + 1}月`}
            </div>
          )
        }
      }

      if (schema.component === 'Input') {
        const maxlength =
          componentProps?.maxlength === undefined
            ? 100
            : componentProps.maxlength
        componentProps = Object.assign({}, componentProps, {
          maxlength
        })
        componentProps.onInputEvent = (e) => {
          flag.value += 1

          componentProps.maxlength =
            componentProps?.maxlength === undefined
              ? 100
              : componentProps.maxlength

          if (!get(getValues.value.model, getValues.value.schema.field)) {
            componentProps.showCount = true
          } else {
            componentProps.showCount = false
          }
        }
        flag.value
      }

      if (schema.component === 'Select') {
        const label = componentProps?.fieldNames?.label || 'label'
        componentProps = Object.assign({}, componentProps, {
          showSearch: true,
          filterOption: (input: string, option: any) => {
            return option[label].toLowerCase().indexOf(input.toLowerCase()) >= 0
          },
          getPopupContainer: () => document.body
        })
      }

      return {
        ...(config[schema?.component] || {}),
        ...componentProps
      } as Recordable
    })

    const getDisable = computed(() => {
      const { disabled: globDisabled } = props.formProps
      const { dynamicDisabled } = props.schema
      const { disabled: itemDisabled = false } = unref(getComponentsProps)
      let disabled = !!globDisabled || itemDisabled
      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled
      }
      if (isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(unref(getValues), globDisabled)
      }
      return disabled
    })

    function getShow(): { isShow: boolean; isIfShow: boolean } {
      const { show, ifShow } = props.schema

      let isShow = true
      let isIfShow = true

      if (isBoolean(show)) {
        isShow = show
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow
      }
      if (isFunction(show)) {
        isShow = show(unref(getValues))
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(unref(getValues))
      }
      return { isShow, isIfShow }
    }

    function handleRules(): ValidationRule[] {
      const {
        rules: defRules = [],
        component,
        rulesMessageJoinLabel,
        label,
        dynamicRules,
        required
      } = props.schema
      if (isFunction(dynamicRules)) {
        return dynamicRules(unref(getValues)) as ValidationRule[]
      }

      let rules: ValidationRule[] = cloneDeep(defRules) as ValidationRule[]
      const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } =
        props.formProps

      const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
        ? rulesMessageJoinLabel
        : globalRulesMessageJoinLabel
      const defaultMsg =
        createPlaceholderMessage(component) +
        `${joinLabel ? (label ? label : '') : ''}`

      function validator(rule: any, value: any) {
        const msg = rule.message || defaultMsg
        if (value === undefined || isNull(value)) {
          // 空值
          return Promise.reject(msg)
        } else if (Array.isArray(value) && value.length === 0) {
          // 数组类型
          return Promise.reject(msg)
        } else if (typeof value === 'string' && value.trim() === '') {
          // 空字符串
          return Promise.reject(msg)
        } else if (
          typeof value === 'object' &&
          Reflect.has(value, 'checked') &&
          Reflect.has(value, 'halfChecked') &&
          Array.isArray(value.checked) &&
          Array.isArray(value.halfChecked) &&
          value.checked.length === 0 &&
          value.halfChecked.length === 0
        ) {
          // 非关联选择的tree组件
          return Promise.reject(msg)
        }
        return Promise.resolve()
      }

      const getRequired = isFunction(required)
        ? required(unref(getValues))
        : required

      /*
       * 1、若设置了required属性，又没有其他的rules，就创建一个验证规则；
       * 2、若设置了required属性，又存在其他的rules，则只rules中不存在required属性时，才添加验证required的规则
       *     也就是说rules中的required，优先级大于required
       */
      if (getRequired) {
        if (!rules || rules.length === 0) {
          rules = [{ required: getRequired, validator }]
        } else {
          const requiredIndex: number = rules.findIndex((rule) =>
            Reflect.has(rule, 'required')
          )

          if (requiredIndex === -1) {
            rules.push({ required: getRequired, validator })
          }
        }
      }

      const requiredRuleIndex: number = rules.findIndex(
        (rule) =>
          Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator')
      )

      if (requiredRuleIndex !== -1) {
        const rule = rules[requiredRuleIndex]
        const { isShow } = getShow()
        if (!isShow) {
          rule.required = false
        }
        if (component) {
          if (!Reflect.has(rule, 'type')) {
            rule.type = component === 'InputNumber' ? 'number' : 'string'
          }

          rule.message = rule.message || defaultMsg

          if (component.includes('Input') || component.includes('Textarea')) {
            rule.whitespace = true
          }
          const valueFormat = unref(getComponentsProps)?.valueFormat
          setComponentRuleType(rule, component, valueFormat)
        }
      }

      // Maximum input length rule check
      const characterInx = rules.findIndex((val) => val.max)
      if (characterInx !== -1 && !rules[characterInx].validator) {
        rules[characterInx].message =
          rules[characterInx].message ||
          t('component.form.maxTip', [rules[characterInx].max] as Recordable)
      }
      return rules
    }

    function renderComponent() {
      const {
        renderComponentContent,
        component,
        field,
        label,
        changeEvent = 'change',
        valueField
      } = props.schema

      const isCheck = component && ['Switch', 'Checkbox'].includes(component)

      const eventKey = `on${upperFirst(changeEvent)}`
      const on = {
        [eventKey]: (...args: Nullable<Recordable>[]) => {
          const [e] = args

          if (propsData[eventKey] && args.length >= 1) {
            propsData[eventKey](...args)
          }

          const target = e ? e.target : null
          const value = target ? (isCheck ? target.checked : target.value) : e

          props.setFormModel(field, value)
        }
      }
      const Comp = ShyComponentMap.get(component) as ReturnType<
        typeof defineComponent
      >

      const { autoSetPlaceHolder, size } = props.formProps
      const propsData: Recordable = {
        allowClear: true,
        getPopupContainer: (trigger: Element) => trigger.parentNode,
        size,
        ...unref(getComponentsProps),
        disabled: unref(getDisable)
      }

      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder
      if (isCreatePlaceholder && component !== 'RangePicker' && component) {
        propsData.placeholder =
          unref(getComponentsProps)?.placeholder ||
          createPlaceholderMessage(
            component,
            isTableForm.value ? (label as string) : ''
          )
      }
      propsData.codeField = field
      propsData.formValues = unref(getValues)

      const bindValue: Recordable = {
        [valueField || (isCheck ? 'checked' : 'value')]: get(
          props.formModel,
          field
        )
      }

      const compAttr: Recordable = {
        ...propsData,
        ...(component === 'Group' ? {} : on),
        ...bindValue
      }

      const handleInput = (e) => {
        compAttr?.onInputEvent && compAttr.onInputEvent(e)
      }

      if (!renderComponentContent) {
        return (
          <Comp
            ref={unref(getComponentsProps)?.useRef}
            {...compAttr}
            onInput={handleInput}
          />
        )
      }
      const compSlot = isFunction(renderComponentContent)
        ? { ...renderComponentContent(unref(getValues)) }
        : {
            default: () => renderComponentContent
          }

      return (
        <Comp ref={unref(getComponentsProps)?.useRef} {...compAttr}>
          {compSlot}
        </Comp>
      )
    }

    function renderLabelHelpMessage() {
      const { label, helpMessage, helpComponentProps, subLabel } = props.schema
      const renderLabel = subLabel ? (
        <span>
          {label} <span class="text-secondary">{subLabel}</span>
        </span>
      ) : (
        label
      )
      const getHelpMessage = isFunction(helpMessage)
        ? helpMessage(unref(getValues))
        : helpMessage
      if (
        !getHelpMessage ||
        (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)
      ) {
        return renderLabel
      }
      return (
        <span>
          {renderLabel}
          <BasicHelp
            placement="top"
            class="mx-1"
            text={getHelpMessage}
            {...helpComponentProps}
          />
        </span>
      )
    }

    function renderItem() {
      const { itemProps, slot, render, field, suffix, component } = props.schema
      const { labelCol, wrapperCol } = unref(itemLabelWidthProp)
      const { colon } = props.formProps

      if (component === 'Divider') {
        return (
          <Col span={24}>
            <Divider {...unref(getComponentsProps)}>
              {renderLabelHelpMessage()}
            </Divider>
          </Col>
        )
      } else {
        const getContent = () => {
          return slot
            ? getSlot(slots, slot, unref(getValues))
            : render
            ? render(unref(getValues))
            : renderComponent()
        }

        const showSuffix = !!suffix
        const getSuffix = isFunction(suffix) ? suffix(unref(getValues)) : suffix

        return (
          <Form.Item
            name={field}
            colon={colon}
            class={{ 'suffix-item': showSuffix }}
            {...(itemProps as Recordable)}
            label={
              !isTableForm.value && component !== 'Group'
                ? renderLabelHelpMessage()
                : undefined
            }
            rules={handleRules()}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <div style="display:flex">
              <div style="flex:1;">{getContent()}</div>
              {showSuffix && <span class="suffix">{getSuffix}</span>}
            </div>
          </Form.Item>
        )
      }
    }

    return () => {
      const {
        colProps = {},
        colSlot,
        renderColContent,
        component
      } = props.schema
      if (!ShyComponentMap.has(component)) {
        return null
      }

      const { baseColProps = {} } = props.formProps
      const realColProps = { ...baseColProps, ...colProps, ...attrs }
      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        // 当前设备是移动设备
        realColProps.span = realColProps?.padSpan || 24
      }

      const { isIfShow, isShow } = getShow()
      const values = unref(getValues)

      const getContent = () => {
        return colSlot
          ? getSlot(slots, colSlot, values)
          : renderColContent
          ? renderColContent(values)
          : renderItem()
      }

      return (
        isIfShow && (
          <Col {...realColProps} v-show={isShow}>
            {getContent()}
          </Col>
        )
      )
    }
  }
})

export default FormItem
