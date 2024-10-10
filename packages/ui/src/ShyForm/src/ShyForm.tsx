import type { FormActionType, FormProps, FormSchema } from './types/form'
import type { AdvanceState } from './types/hooks'
import type { Ref } from 'vue'
import {
  toRaw,
  defineComponent,
  reactive,
  ref,
  computed,
  unref,
  onMounted,
  watch,
  nextTick,
  provide,
  withModifiers,
  toRefs
} from 'vue'
import { Col, Form, Row } from 'ant-design-vue'
import FormItem from './components/FormItem'
import FormAction from './components/FormAction.vue'
import { dateItemType } from './helper'
import { dateUtil, deepMerge, isFunction } from '@shy-plugins/utils'
import { useFormValues } from './hooks/useFormValues'
import { useFormEvents } from './hooks/useFormEvents'
import { createFormContext } from './hooks/useFormContext'
import { useAutoFocus } from './hooks/useAutoFocus'
import { useModalContext } from '../../Modal'
import { useDebounceFn } from '@vueuse/core'
import {
  shyFormBasicProps,
  tableSearchColKeys,
  tableSearchColRef,
  defaultAntConfig
} from './props'
import { cloneDeep, set } from 'lodash-es'
import { useGlobalConfig } from '../../../config/index'
import { isEqual, omit, pick } from 'lodash-es'
import { useDesign } from '@shy-plugins/use'
import { UpOutlined } from '@ant-design/icons-vue'
import './style/index.less'
import { formProps } from 'ant-design-vue/es/form'

const ShyForm = defineComponent({
  props: shyFormBasicProps,
  emits: [
    'advanced-change',
    'reset',
    'submit',
    'register',
    'field-value-change'
  ],
  setup(props, { emit, attrs, slots }) {
    const formModel = reactive<Recordable>({})
    const modalFn = useModalContext()

    const { ROW_SLICE, RANGE_PICKER_COL, OTHER_COL, ACTION_COL } =
      toRefs(tableSearchColRef)

    const advanceState = reactive<AdvanceState>({
      isAdvanced: true,
      hideAdvanceBtn: false,
      isLoad: false,
      actionSpan: 6
    })

    const defaultValueRef = ref<Recordable>({})
    const isInitedDefaultRef = ref(false)
    const propsRef = ref<Partial<FormProps>>({})
    const schemaRef = ref<Nullable<FormSchema[]>>(null)
    const formElRef = ref<Nullable<FormActionType>>()

    const { prefixCls } = useDesign('ant-form')

    const { config } = useGlobalConfig('form')

    const getProps = computed((): FormProps => {
      return {
        ...(props as any),
        ...config, // 全局注入属性
        ...unref(propsRef)
      } as FormProps
    })

    const getFormClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--compact`]: unref(getProps).compact
        }
      ]
    })

    const getRow = computed((): Recordable => {
      const { baseRowStyle = {}, rowProps } = unref(getProps)
      return {
        style: baseRowStyle,
        ...rowProps
      }
    })

    const getBindValue = computed(() => ({
      ...attrs,
      ...props,
      ...defaultAntConfig,
      ...unref(getProps)
    }))

    const getSchema = computed((): FormSchema[] => {
      const schemas: FormSchema[] =
        unref(schemaRef) || (unref(getProps).schemas as any)
      for (const schema of schemas) {
        const {
          defaultValue,
          component,
          componentProps,
          isHandleDateDefaultValue = true
        } = schema
        if (
          isHandleDateDefaultValue &&
          defaultValue &&
          component &&
          dateItemType.includes(component)
        ) {
          const valueFormat = componentProps
            ? componentProps['valueFormat']
            : null
          if (!Array.isArray(defaultValue)) {
            schema.defaultValue = valueFormat
              ? dateUtil(defaultValue).format(valueFormat)
              : dateUtil(defaultValue)
          } else {
            const def: any[] = []
            defaultValue.forEach((item) => {
              def.push(
                valueFormat
                  ? dateUtil(item).format(valueFormat)
                  : dateUtil(item)
              )
            })
            schema.defaultValue = def
          }
        }

        if (component === 'Group') {
          schema.defaultValue = schema.defaultValue ?? {}
        }
      }
      if (unref(getProps).showAdvancedButton) {
        return cloneDeep(
          schemas.filter(
            (schema) => schema.component !== 'Divider'
          ) as FormSchema[]
        )
      } else {
        return cloneDeep(schemas as FormSchema[])
      }
    })

    const getFormActionBindProps = computed(
      (): Recordable => ({ ...getProps.value, ...advanceState })
    )

    const { handleFormValues, initDefault } = useFormValues({
      getProps,
      defaultValueRef,
      getSchema,
      formModel
    })

    useAutoFocus({
      getSchema,
      getProps,
      isInitedDefault: isInitedDefaultRef,
      formElRef: formElRef as Ref<FormActionType>
    })

    const {
      handleSubmit,
      setFieldsValue,
      clearValidate,
      validate,
      validateFields,
      getFieldsValue,
      updateSchema,
      resetSchema,
      appendSchemaByField,
      removeSchemaByField,
      resetFields,
      scrollToField
    } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      //@ts-ignore
      formElRef: formElRef as Ref<FormActionType>,
      //@ts-ignore
      schemaRef: schemaRef as Ref<FormSchema[]>,
      handleFormValues
    })

    createFormContext({
      resetAction: resetFields,
      submitAction: handleSubmit,
      contextBindValue: getBindValue
    })

    watch(
      () => unref(getProps).model,
      () => {
        const { model } = unref(getProps)
        if (!model) return
        setFieldsValue(model)
      },
      {
        immediate: true
      }
    )

    watch(
      () => unref(getProps).schemas,
      (schemas) => {
        resetSchema(schemas ?? [])
      }
    )

    watch(
      () => getSchema.value,
      (schema) => {
        nextTick(() => {
          //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
          modalFn?.redoModalHeight?.()
        })
        if (unref(isInitedDefaultRef)) {
          return
        }
        if (schema?.length) {
          initDefault()
          isInitedDefaultRef.value = true
        }
      }
    )

    const tempFormModel = reactive<Recordable>({})

    watch(
      () => formModel,
      useDebounceFn((val) => {
        if (isEqual(toRaw(val), toRaw(tempFormModel))) return
        for (const key in val) {
          if (isEqual(toRaw(val[key]), toRaw(tempFormModel[key]))) continue
          unref(getProps).schemas?.forEach((item) => {
            const isComponentProps = item.field === key && item.componentProps
            if (
              isComponentProps &&
              !isFunction(item.componentProps) &&
              item.componentProps?.onModelChange
            ) {
              item.componentProps.onModelChange(val[key])
            } else if (isComponentProps && isFunction(item.componentProps)) {
              const modelProps = item.componentProps({
                schema: item,
                formModel: formModel,
                formActionType: formActionType as FormActionType,
                tableAction: props.tableAction
              })
              if (modelProps.onModelChange) {
                modelProps.onModelChange(val[key])
              }
            }
          })
        }
        Object.assign(tempFormModel, cloneDeep(formModel))
        unref(getProps).submitOnChange && handleSubmit()
      }, 300),
      { deep: true }
    )

    async function setProps(formProps: Partial<FormProps>): Promise<void> {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
    }

    function setFormModel(key: string, value: any) {
      set(formModel, key, value)
      const { validateTrigger } = unref(getBindValue)
      if (!validateTrigger || validateTrigger === 'change') {
        validateFields([key]).catch(() => {})
      }
      emit('field-value-change', key, value)
      unref(getBindValue).onFieldValueChange?.(key, value)
    }

    function handleEnterPress(e: Event) {
      const { autoSubmitOnEnter } = unref(getProps)
      if (!autoSubmitOnEnter) return

      if (
        (e as KeyboardEvent).key === 'Enter' &&
        e.target &&
        e.target instanceof HTMLElement
      ) {
        const target: HTMLElement = e.target as HTMLElement
        handleSubmit()

        if (
          target &&
          target.tagName &&
          target.tagName.toUpperCase() == 'INPUT'
        ) {
        }
      }
    }

    const formActionType: FormActionType = {
      getFieldsValue,
      setFieldsValue,
      resetFields,
      updateSchema,
      resetSchema,
      setProps,
      removeSchemaByField,
      appendSchemaByField,
      clearValidate,
      submit: handleSubmit,
      validateFields,
      validate,
      scrollToField
    }
    provide('formActionType', formActionType)

    const isTableForm = computed(() => {
      return !!getBindValue.value.tableAction
    })

    watch(
      isTableForm,
      (val) => {
        if (val && !unref(getProps).formLabelInInput) {
          const newCol = [20, 6, 6, 4]
          tableSearchColKeys.forEach((key, index) => {
            tableSearchColRef[key] = newCol[index]
          })
        }
      },
      {
        immediate: true
      }
    )

    const COL_DIFF = (span) => {
      return span * ((unref(ROW_SLICE) + unref(ACTION_COL)) / unref(ROW_SLICE))
    }
    const allColSpanSum = computed(() => {
      return getSchema.value.reduce((pre, cur) => {
        return (pre += getCurColSpan(cur))
      }, 0)
    })
    const isAutoShowFormItem = computed(() => {
      return !(
        allColSpanSum.value / (unref(ROW_SLICE) + unref(ACTION_COL)) >
        getBindValue.value.autoAdvancedLine
      )
    })
    const isShowFormCollapse = computed(
      () => allColSpanSum.value > unref(ROW_SLICE) + unref(ACTION_COL)
    )
    const getCurColSpan = (cur) => {
      if (!cur?.colProps?.span) {
        switch (cur.component) {
          case 'RangePicker':
            return COL_DIFF(unref(RANGE_PICKER_COL))
          default:
            return COL_DIFF(unref(OTHER_COL))
        }
      }
      return COL_DIFF(cur.colProps.span)
    }
    const isShowFormInside = ref(isAutoShowFormItem.value)
    const handleChangeState = () => {
      isShowFormInside.value = !isShowFormInside.value
      emit('advanced-change')
    }

    onMounted(() => {
      initDefault()
      emit('register', formActionType)
    })

    return () => {
      const ignoreKeys = [
        'resetBefore',
        'submitBefore',
        'advanceBefore',
        'advanceAfter',
        'advancedSearch'
      ]

      const renderFormActon = () => {
        return getFormActionBindProps.value.showActionButtonGroup ? (
          <Col
            class={`${prefixCls}-action-content`}
            span={unref(ACTION_COL)}
            style={{
              [`--col-span`]: `${
                (unref(ACTION_COL) / (unref(ROW_SLICE) + unref(ACTION_COL))) *
                100
              }%`
            }}
          >
            <FormAction
              {...getFormActionBindProps.value}
              class={`${prefixCls}-action`}
            >
              {{
                ...Object.keys(pick(slots, ignoreKeys)).reduce((pre, cur) => {
                  return {
                    ...pre,
                    [cur]: (data) => slots?.[cur]?.(data || {})
                  }
                }, {}),
                default: () =>
                  isShowFormCollapse.value ? (
                    <div
                      class={`${prefixCls}-show`}
                      onClick={handleChangeState}
                    >
                      <UpOutlined rotate={isShowFormInside.value ? 0 : 180} />
                      {isShowFormInside.value ? '收起' : '展开'}
                    </div>
                  ) : null
              }}
            </FormAction>
          </Col>
        ) : null
      }

      const renderItem = (schema) => {
        const realSpan =
          (schema.colProps?.span ?? getBindValue.value?.baseColProps?.span) /
          (unref(ROW_SLICE) + unref(ACTION_COL))

        return (
          <FormItem
            tableAction={props.tableAction}
            formActionType={formActionType}
            schema={schema}
            formProps={getProps.value}
            allDefaultValues={defaultValueRef.value}
            formModel={formModel}
            setFormModel={setFormModel}
            class={{ [`${prefixCls}-table-form-item`]: isTableForm.value }}
            style={{
              [`--col-span`]: `${realSpan * 100}%`,
              [`--w-gap`]: `${realSpan * getBindValue.value.gap}px`
            }}
          >
            {{
              ...Object.keys(omit(slots, ignoreKeys)).reduce((pre, cur) => {
                return {
                  ...pre,
                  [cur]: (data) => slots?.[cur]?.(data || {})
                }
              }, {})
            }}
          </FormItem>
        )
      }

      const renderFormItems = () => {
        return getSchema.value
          .map((schema) => {
            return renderItem(schema)
          })
          .reduce((pre: (JSX.Element | null)[], cur, currIndex) => {
            if (!isTableForm.value) return pre.concat(cur)

            const alwaysShowLineCount = getBindValue.value.alwaysShowLines

            const currProps = getSchema.value[currIndex]

            const colSpanSum = getSchema.value
              .slice(0, currIndex + 1)
              .reduce((pre, cur) => {
                return (pre += getCurColSpan(cur))
              }, 0)

            const isAlwaysShowLineCount =
              colSpanSum <=
              alwaysShowLineCount * (unref(ROW_SLICE) + unref(ACTION_COL))
            const isColShow = isShowFormInside.value || isAlwaysShowLineCount

            const renderColPropsItem = () => {
              const Components = isColShow
                ? renderItem({
                    ...currProps,
                    colProps: { span: getCurColSpan(currProps) }
                  })
                : null
              return pre.concat(Components)
            }

            switch (currProps.component) {
              case 'RangePicker':
                return renderColPropsItem()
              default:
                return renderColPropsItem()
            }
          }, [])
      }

      return (
        <>
          <Form
            {...pick(getBindValue.value, Object.keys(formProps()))}
            class={getFormClass.value}
            ref={formElRef}
            model={formModel}
            style={{
              '--gap': `${getBindValue.value.gap}px`
            }}
            onKeyup={withModifiers(handleEnterPress, ['enter'])}
          >
            <Row class={`${prefixCls}-row`}>
              <Col
                span={
                  isTableForm.value
                    ? unref(ROW_SLICE)
                    : unref(ROW_SLICE) + unref(ACTION_COL)
                }
                class={`${prefixCls}-content-col`}
              >
                <Row {...getRow.value} class={`${prefixCls}-input`}>
                  {slots?.formHeader?.()}
                  {renderFormItems()}
                </Row>
              </Col>
              {renderFormActon()}
            </Row>
          </Form>
          {isTableForm.value ? (
            <div class={`${prefixCls}-split-line`}></div>
          ) : null}
        </>
      )
    }
  }
})

export default ShyForm
