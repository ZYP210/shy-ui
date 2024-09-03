import { defineComponent, computed, unref } from 'vue'
import { Form } from 'ant-design-vue'
import type { Rule as ValidationRule } from 'ant-design-vue/lib/form/interface'
import { isFunction, isNull } from '@shy-plugins/utils'
import { ShyComponentMap } from '../../../ShyForm/src/ShyComponentMap'
import { cloneDeep, get, upperFirst } from 'lodash-es'
import {
  createPlaceholderMessage,
  setComponentRuleType
} from '../../../ShyForm/src/helper'

export default defineComponent({
  props: {
    formModel: {
      type: Object
    },
    formProps: {
      type: Object
    },
    setFormModel: {
      type: Function,
      default: () => {}
    },
    schema: {
      type: Object
    },
    formActionType: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { attrs, slots }) {
    const getComponentsProps = computed(() => {
      const { schema, formModel, formActionType } = props as any

      let { componentProps = {} as any } = schema
      if (isFunction(componentProps)) {
        componentProps =
          componentProps({ schema, formModel, formActionType }) ?? {}
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
        // const maxlength =
        //   componentProps?.maxlength === undefined
        //     ? 100
        //     : componentProps.maxlength
        // componentProps = Object.assign({}, componentProps, {
        //   maxlength
        // })
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
        // ...(config[schema?.component] || {}), // 全局注册
        ...componentProps
      } as Recordable
    })

    function renderItem() {
      const { field, componentProps } = props.schema as any

      return (
        <Form.Item name={field} {...{ ...componentProps }}>
          <div>{renderComponent()}</div>
        </Form.Item>
      )
    }

    function handleRules(): ValidationRule[] {
      const {
        rules: defRules = [],
        component,
        rulesMessageJoinLabel,
        label,
        required
      } = props.schema as any

      let rules: ValidationRule[] = cloneDeep(defRules) as ValidationRule[]
      // const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } =
      //   props.formProps

      // const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
      //   ? rulesMessageJoinLabel
      //   : globalRulesMessageJoinLabel
      // const defaultMsg =
      //   createPlaceholderMessage(component) +
      //   `${joinLabel ? (label ? label : '') : ''}`

      function validator(rule: any, value: any) {
        const msg = rule.message || ''
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

      // const getRequired = isFunction(required)
      //   ? required(unref(getValues))
      //   : required
      const getRequired = true

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
        const isShow = true

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
        changeEvent = 'change',
        valueField
      } = props.schema as any

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

      const propsData: Recordable = {
        allowClear: true,
        getPopupContainer: (trigger: Element) => trigger.parentNode,
        size: 'small',
        ...unref(getComponentsProps),
        codeField: field
      }

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
        return <Comp {...compAttr} onInput={handleInput} />
      }

      return <Comp {...compAttr}></Comp>
    }

    return () => {
      const { component } = props.schema as any
      if (!ShyComponentMap.has(component)) {
        return null
      }
      return renderItem()
    }
  }
})
