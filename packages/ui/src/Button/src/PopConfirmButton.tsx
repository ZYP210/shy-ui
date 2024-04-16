import { computed, defineComponent, unref } from 'vue'
import BasicButton from './BasicButton'
import { Popconfirm } from 'ant-design-vue'
import { extendSlots } from '@shy-plugins/utils'
import { omit } from 'lodash-es'
import { useAttrs } from '@shy-plugins/use'

const props = {
  enable: {
    type: Boolean,
    default: true
  }
}

const PopConfirmButton = defineComponent({
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const attrs = useAttrs()

    const getBindValues = computed(() => {
      return Object.assign(
        {
          okText: '确定',
          cancelText: '取消'
        },
        { ...props, ...unref(attrs) }
      )
    })

    return () => {
      const bindValues = omit(unref(getBindValues), 'icon')
      const btnBind = omit(bindValues, 'title') as Recordable
      if (btnBind.disabled) btnBind.color = ''

      const Button = () => {
        return <BasicButton {...btnBind}>{extendSlots(slots)}</BasicButton>
      }

      if (!props.enable) {
        return Button()
      }

      return <Popconfirm {...bindValues}>{{ default: Button }}</Popconfirm>
    }
  }
})

export default PopConfirmButton
