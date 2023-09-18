import { computed, defineComponent, ref } from 'vue'
import { basicProps, Schema, basicColProps } from './props'
import { Divider } from 'ant-design-vue'
import DescriptionGroup from './DescriptionGroup'
import { CopyOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'Description',
  props: basicProps,
  emits: ['register'],
  setup(props, { emit, slots }) {
    const prefixCls = 'shy-basic-description'

    const getProps = computed(() => {
      return {
        ...props,
        ...innerProps.value
      }
    })

    const innerProps = ref(null)
    const setDescProps = (props) => {
      innerProps.value = { ...innerProps.value, ...props }
    }

    const copyToClipboard = async (text) => {
      try {
        // 将文本内容复制到系统剪贴板中
        await navigator.clipboard.writeText(text)
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }
    }

    const handleClick = (value) => {
      copyToClipboard(value)
    }

    const rows = computed(() => {
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
          return (
            <div
              class={`${prefixCls}-row`}
              style={{
                flex: `0 0 ${
                  ((item?.colProps?.span || basicColProps) / 24) * 100
                }%`
              }}
            >
              <span
                style={{
                  width: `${getProps.value.labelWidth}px`
                }}
                class={`${prefixCls}-label`}
              >
                {slots[`${item.field}Label`]
                  ? slots[`${item.field}Label`]()
                  : item.label}
                {getProps.value?.isShowColon ? ':' : ''}
              </span>

              <span class={`${prefixCls}-value`}>
                {slots[`${item.field}Value`]
                  ? slots[`${item.field}Value`]()
                  : getProps.value.data[item.field]}
                {item?.isCopy ? (
                  <span
                    style="cursor:pointer"
                    onClick={() => handleClick(getProps.value.data[item.field])}
                  >
                    <CopyOutlined />
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
