import { CSSProperties, computed, defineComponent, ref, reactive } from 'vue'
import { basicProps, Schema, basicColProps } from './props'
import { Divider } from 'ant-design-vue'
import DescriptionGroup from './DescriptionGroup'
import { CopyOutlined } from '@ant-design/icons-vue'
import { useMessage } from '@shy-plugins/use'
import { BasicHelp } from '../../Basic/index'
import { DescriptionProps } from './typing'
import { isBoolean, isFunction, isNumber } from '@shy-plugins/utils'
import FormItem from './components/formItem'
import { Form } from 'ant-design-vue'

export default defineComponent({
  name: 'Description',
  props: basicProps,
  emits: ['register'],
  setup(props, { emit, slots }) {
    const prefixCls = 'shy-basic-description'

    const { createMessage } = useMessage()

    const getProps = computed<DescriptionProps>(() => {
      return {
        ...props,
        ...innerProps.value
      }
    })

    const innerProps = ref<any>(null)
    const setDescProps = (props) => {
      innerProps.value = { ...innerProps.value, ...props }
    }

    const handleClick = (value: string) => {
      navigator.clipboard.writeText(value).then(
        () => {
          createMessage.success('复制成功')
        },
        () => {
          createMessage.error('无法复制文本到剪贴板')
        }
      )
    }

    const isBordered = computed(() => getProps.value.bordered)

    const labelAlignCss = computed<CSSProperties>(() => {
      if (getProps.value.mode === 'vertical') {
        return { justifyContent: 'flex-start' }
      }

      switch (getProps.value.labelAlign) {
        case 'left':
          return { justifyContent: 'flex-start' }
        case 'center':
          return { justifyContent: 'center' }
        case 'right':
          return { justifyContent: 'flex-end' }
        default:
          if (getProps.value.bordered) {
            return { justifyContent: 'center' }
          } else {
            return { justifyContent: 'flex-end' }
          }
      }
    })

    const formModel = reactive({})
    const setFormModel = (key, value) => {
      formModel[key] = value
    }

    const getFieldsValue = () => {
      return formModel
    }

    const setFieldsValue = (values) => {
      Object.assign(formModel, values)
    }

    const renderItem = (schema) => {
      return (
        <FormItem
          schema={schema}
          formModel={formModel}
          setFormModel={setFormModel}
          formActionType={{
            setDescProps,
            setFieldsValue,
            getFieldsValue,
            updateSchemas
          }}
        ></FormItem>
      )
    }

    const innerSchemas = ref([])
    const updateSchemas = (array) => {
      innerSchemas.value = array
    }
    const getSchemas = computed(() => {
      innerSchemas.value.forEach((innerSchema: { field: string }) => {
        const schema = getProps.value.schema.find(
          (item) => item.field === innerSchema.field
        )
        if (schema) {
          Object.assign(schema, innerSchema)
        }
      })
      return getProps.value.schema
    })

    const rows = computed(() => {
      let element = null
      return getSchemas.value.map((item: Schema) => {
        if (item?.component === 'Divider') {
          return <Divider></Divider>
        } else if (item?.component === 'Group') {
          return (
            <div style={{ flex: '0 0 100%' }}>
              <DescriptionGroup label={item?.label}></DescriptionGroup>
            </div>
          )
        } else {
          const data = getProps.value.data

          if (item?.customRender) {
            element = item?.customRender ? item.customRender(data) : null
          } else if (getProps.value.summaryTotalFields?.length) {
            element = slots[`${item.field}Value`]
              ? slots[`${item.field}Value`]?.({
                  model: data,
                  field: data[`${item.field}`]
                })
              : getProps.value.summaryTotalFields.includes(item.field!) &&
                isNumber(+data[`${item.field}`]) &&
                !isNaN(+data[`${item.field}`])
              ? (+data[`${item.field}`])
                  .toFixed(getProps.value.summaryPrecision)
                  .replace(
                    /\d(?=(?:\d{3})+(?:\.|$))/g,
                    (match, offset, string) => {
                      return (
                        match +
                        (string.charAt(offset + 1) === '.' ||
                        offset === string.length - 1
                          ? ''
                          : ',')
                      )
                    }
                  )
              : data[`${item.field}`]
          } else if (item?.isForm) {
            element = renderItem(item) as any
          } else {
            element = slots[`${item.field}Value`]
              ? slots[`${item.field}Value`]?.({
                  model: data,
                  field: data[`${item.field}`]
                })
              : data[`${item.field}`]
          }

          const ifShow =
            isBoolean(item?.ifShow) || isFunction(item?.ifShow)
              ? isFunction(item.ifShow)
                ? item.ifShow(data)
                : item.ifShow
              : true

          const required = item?.required ? '*' : ''

          return ifShow ? (
            <div
              class={`${prefixCls}-row`}
              style={{
                flex: `0 0 ${
                  ((item?.colProps?.span || basicColProps) / 24) * 100
                }%`,
                flexDirection:
                  getProps.value.mode === 'horizontal' ? 'row' : 'column'
              }}
            >
              {slots?.[`${item.field}Label`] || item.label ? (
                <span
                  style={{
                    width:
                      getProps.value.mode === 'horizontal'
                        ? `${getProps.value.labelWidth}px`
                        : 'auto',
                    ...labelAlignCss.value,
                    ...(getProps.value?.labelStyle
                      ? getProps.value?.labelStyle
                      : {}),
                    ...(item?.labelStyle ? item?.labelStyle : {})
                  }}
                  class={`${prefixCls}-label`}
                >
                  <span style={{ color: 'red', width: '10px' }}>
                    {required}
                  </span>
                  {slots[`${item.field}Label`]
                    ? slots[`${item.field}Label`]?.({
                        model: getProps.value.data,
                        field: item.label
                      })
                    : item.label}

                  {item?.helpMessage ? (
                    <BasicHelp
                      style={{ paddingTop: '5px' }}
                      placement="top"
                      class="mx-1"
                      text={item?.helpMessage}
                      iconSize="9px"
                    />
                  ) : (
                    ''
                  )}
                  {getProps.value?.isShowColon ? '：' : <span></span>}
                </span>
              ) : (
                <> </>
              )}

              <span
                class={`${prefixCls}-value`}
                style={{
                  ...(getProps.value?.contentStyle
                    ? getProps.value?.contentStyle
                    : {}),
                  ...(item?.contentStyle ? item?.contentStyle : {})
                }}
              >
                {element}
                {item?.isCopy ? (
                  <span
                    style="cursor:pointer;margin-left:5px"
                    onClick={() =>
                      handleClick(getProps.value.data[`${item.field}`])
                    }
                  >
                    <CopyOutlined
                      style={{ color: '#458ef9', marginLeft: '5px' }}
                    />
                  </span>
                ) : null}
              </span>
            </div>
          ) : null
        }
      })
    })

    emit('register', {
      setDescProps,
      getFieldsValue,
      setFieldsValue,
      updateSchemas
    })

    return () => (
      <Form model={formModel}>
        <div
          class={
            isBordered.value
              ? `${prefixCls}-wrapper ${prefixCls}-wrapper-bordered`
              : `${prefixCls}-wrapper`
          }
        >
          {rows.value}
        </div>
      </Form>
    )
  }
})
