import { computed, defineComponent, ref } from 'vue'
import { basicProps, Schema, basicColProps } from './props'
import { Divider } from 'ant-design-vue'
import DescriptionGroup from './DescriptionGroup'
import { CopyOutlined } from '@ant-design/icons-vue'
import { useMessage } from '@shy-plugins/use'

export default defineComponent({
  name: 'Description',
  props: basicProps,
  emits: ['register'],
  setup(props, { emit, slots }) {
    const prefixCls = 'shy-basic-description'

    const { createMessage } = useMessage()

    const getProps = computed(() => {
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

    const rows = computed(() => {
      let element = null
      return getProps.value.schema.map((item: Schema) => {
        if (item?.component === 'Divider') {
          return <Divider></Divider>
        } else if (item?.component === 'Group') {
          return (
            <div style={{ flex: '0 0 100%' }}>
              <DescriptionGroup label={item?.label}></DescriptionGroup>
            </div>
          )
        } else {
          if (item?.customRender) {
            element = item?.customRender
              ? item.customRender(getProps.value.data)
              : null
          } else {
            element = slots[`${item.field}Value`]
              ? slots[`${item.field}Value`]?.({
                  model: getProps.value.data,
                  field: getProps.value.data[`${item.field}`]
                })
              : getProps.value.data[`${item.field}`]
          }
          return (
            <div
              class={`${prefixCls}-row`}
              style={{
                flex: `0 0 ${
                  ((item?.colProps?.span || basicColProps) / 24) * 100
                }%`
              }}
            >
              {slots?.[`${item.field}Label`] || item.label ? (
                <span
                  style={{
                    width: `${getProps.value.labelWidth}px`,
                    textAlign: getProps.value.labelAlign,
                    ...(getProps.value?.labelStyle
                      ? getProps.value?.labelStyle
                      : {}),
                    ...(item?.labelStyle ? item?.labelStyle : {})
                  }}
                  class={`${prefixCls}-label`}
                >
                  {slots[`${item.field}Label`]
                    ? slots[`${item.field}Label`]?.({
                        model: getProps.value.data,
                        field: item.label
                      })
                    : item.label}
                  {getProps.value?.isShowColon ? ':' : ''}
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
          )
        }
      })
    })

    emit('register', { setDescProps })
    return () => <div class={`${prefixCls}-wrapper`}>{rows.value}</div>
  }
})
