import { Modal } from 'ant-design-vue'
import { defineComponent, toRefs, unref } from 'vue'
import { basicProps } from '../props'
import { useModalDragMove } from '../hooks/useModalDrag'
import { useAttrs } from '../hooks/useAttrs'
import { extendSlots } from '../utils/tsxHelper'
import { omit } from 'lodash-es'

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel'],
  setup(props, { slots, emit }) {
    const { visible, draggable, destroyOnClose } = toRefs(props)
    const attrs = useAttrs()
    useModalDragMove({
      visible,
      destroyOnClose,
      draggable
    })

    const onCancel = (e: Event) => {
      emit('cancel', e)
    }

    return () => {
      const propsData = { ...unref(attrs), ...props, onCancel } as Recordable
      const modalProps = omit(propsData, 'visible')
      return <Modal {...modalProps}>{extendSlots(slots)}</Modal>
    }
  }
})
