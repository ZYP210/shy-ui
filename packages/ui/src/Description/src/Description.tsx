import { computed, defineComponent, ref } from 'vue'
import { basicProps, Schema, basicColProps } from './props'

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
      innerProps.value = props
    }

    const rows = getProps.value.schema.map((item: Schema) => {
      return (
        <div
          class={`${prefixCls}-row`}
          style={{
            flex: `0 0 ${((item?.colProps?.span || basicColProps) / 24) * 100}%`
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
          </span>
        </div>
      )
    })

    emit('register', { setDescProps })
    return () => <div class={`${prefixCls}-wrapper`}>{rows}</div>
  }
})
