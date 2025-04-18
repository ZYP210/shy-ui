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
import { dateUtil, isEmpty } from '@shy-plugins/utils'
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
import { useGlobalConfig } from '../../../config/index'
import {
  cloneDeep,
  isBoolean,
  isEqual,
  omit,
  pick,
  set,
  isFunction,
  merge
} from 'lodash-es'
import { useDesign } from '@shy-plugins/use/web/useDesign'
import { UpOutlined } from '@ant-design/icons-vue'
import { formProps } from 'ant-design-vue/es/form'
import './style/index.less'

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
    provide('parentEmit', emit)

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

    const getBindValue = computed(
      () =>
        ({
          ...attrs,
          ...props,
          ...defaultAntConfig,
          ...unref(getProps)
        } as any)
    )

    const getSchema = computed((): FormSchema[] => {
      const treeExpandField = (schemas: FormSchema[]) => {
        return schemas.map((schema) => {
          const {
            defaultValue,
            component,
            componentProps = {},
            isHandleDateDefaultValue = true
          } = schema

          let _props: Recordable = {}
          if (typeof componentProps === 'function') {
            _props =
              componentProps({
                formModel,
                schema,
                formActionType: {
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
                },
                tableAction: props.tableAction
              }) || {}
          } else {
            _props = componentProps
          }

          if (
            isHandleDateDefaultValue &&
            defaultValue &&
            component &&
            dateItemType.includes(component)
          ) {
            const valueFormat = _props ? _props['valueFormat'] : null
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

          if (schema?.component?.includes?.('Input')) {
            schema.defaultValue = schema.defaultValue ?? ''
          }

          if (schema.component === 'Table') {
            schema.defaultValue = schema.defaultValue || reactive([])
          }

          if (schema.component === 'Group' && componentProps) {
            // schema.defaultValue = schema.defaultValue || reactive({})

            return {
              ...schema,
              componentProps: (...args) => {
                let _c_props: Recordable = {}
                if (typeof componentProps === 'function') {
                  _c_props = componentProps(...args) || {}
                } else {
                  _c_props = componentProps
                }

                return {
                  ..._c_props,
                  schemas: treeExpandField(cloneDeep(_c_props.schemas))
                }
              }
            }
          }

          return schema
        })
      }

      const schemas: FormSchema[] = treeExpandField(
        unref(schemaRef) || (unref(getProps).schemas as any)
      )

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

          function handleSchemas(schemas: FormSchema[] = []) {
            schemas.forEach((item) => {
              const isComponentProps = item.field === key && item.componentProps

              // 如果匹配了当前字段，处理 onModelChange
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

              // 如果是 Group 类型，递归处理其子 schemas
              if (item.component === 'Group' && item.componentProps?.schemas) {
                handleSchemas(item.componentProps.schemas)
              }
            })
          }

          handleSchemas(unref(getProps).schemas)
        }
        Object.assign(tempFormModel, cloneDeep(formModel))
        unref(getProps).submitOnChange && handleSubmit()
      }, 300),
      { deep: true }
    )

    async function setProps(formProps: Partial<FormProps>): Promise<void> {
      propsRef.value = merge(unref(propsRef) || {}, formProps)
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
      return !!unref(getBindValue).tableAction
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
      return unref(getSchema).reduce((pre, cur) => {
        return (pre += getCurColSpan(cur))
      }, 0)
    })
    const isAutoShowFormItem = computed(() => {
      return !(
        unref(allColSpanSum) / (unref(ROW_SLICE) + unref(ACTION_COL)) >
        unref(getBindValue).autoAdvancedLine
      )
    })
    const isShowFormCollapse = computed(
      () => unref(allColSpanSum) > unref(ROW_SLICE) + unref(ACTION_COL)
    )

    const getCurColSpan = (cur) => {
      const getValues = () => {
        const { mergeDynamicData } = unref(getProps)

        return {
          field: cur.field,
          model: formModel,
          values: {
            ...mergeDynamicData,
            ...unref(defaultValueRef),
            ...formModel
          } as Recordable,
          schema: cur
        }
      }

      const findShow = () => {
        const { show, ifShow } = cur

        let isShow = true
        let isIfShow = true

        if (isBoolean(show)) {
          isShow = show
        }
        if (isBoolean(ifShow)) {
          isIfShow = ifShow
        }
        if (isFunction(show)) {
          isShow = show(getValues())
        }
        if (isFunction(ifShow)) {
          isIfShow = ifShow(getValues())
        }
        return { isShow, isIfShow }
      }
      const { isShow, isIfShow } = findShow()
      if (!isShow || !isIfShow) return 0

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
          (schema.colProps?.span ?? unref(getBindValue)?.baseColProps?.span) /
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
              [`--w-gap`]: `${realSpan * unref(getBindValue).gap}px`
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
