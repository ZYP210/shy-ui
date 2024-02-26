import { CSSProperties, computed, defineComponent, ref } from 'vue'
import { basicProps, Schema, basicColProps } from './props'
import { Divider } from 'ant-design-vue'
import DescriptionGroup from './DescriptionGroup'
import { CopyOutlined } from '@ant-design/icons-vue'
import { useMessage } from '@shy-plugins/use'
import { BasicHelp } from '../../Basic/index'
import { DescriptionProps } from './typing'

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
      switch (getProps.value.labelAlign) {
        case 'left':
          return { justifyContent: 'flex-start' }
        case 'center':
          return { justifyContent: 'center' }
        case 'right':
          return { justifyContent: 'flex-end' }
        default:
          if(getProps.value.bordered){
            return { justifyContent: 'center' }
          } else {
            return { justifyContent: 'flex-end' }
          }
      }
    })

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
                    ...labelAlignCss.value,
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

                  {item?.helpMessage ? (
                    <BasicHelp
                      style={{ paddingTop: '5px' }}
                      placement="top"
                      class="mx-1"
                      text={item?.helpMessage}
                    />
                  ) : (
                    ''
                  )}
                  {getProps.value?.isShowColon ? '：' : ''}
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
    return () => (
      <div
        class={
          isBordered.value
            ? `${prefixCls}-wrapper ${prefixCls}-wrapper-bordered`
            : `${prefixCls}-wrapper`
        }
      >
        {rows.value}
      </div>
    )
  }
})
