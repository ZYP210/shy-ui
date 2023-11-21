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

    const innerProps = ref<any>(null)
    const setDescProps = (props) => {
      innerProps.value = { ...innerProps.value, ...props }
    }

    function copyToClipboard(text: string) {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    const handleClick = (value: string) => {
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
                  width: `${getProps.value.labelWidth}px`,
                  textAlign: getProps.value.labelAlign
                }}
                class={`${prefixCls}-label`}
              >
                {slots[`${item.field}Label`]
                  ? slots[`${item.field}Label`]?.()
                  : item.label}
                {getProps.value?.isShowColon ? ':' : ''}
              </span>

              <span class={`${prefixCls}-value`}>
                {slots[`${item.field}Value`]
                  ? slots[`${item.field}Value`]?.()
                  : getProps.value.data[`${item.field}`]}
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
