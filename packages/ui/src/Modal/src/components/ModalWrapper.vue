<template>
  <div ref="spinRef" :style="spinStyle" :loading-tip="loadingTip">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import type { CSSProperties } from 'vue'
import {
  defineComponent,
  computed,
  ref,
  watchEffect,
  unref,
  watch,
  onMounted,
  nextTick,
  onUnmounted
} from 'vue'
import { useWindowSizeFn } from '../hooks/useWindowSizeFn'
import ScrollContainer from './ScrollContainer.vue'
import { createModalContext } from '../hooks/useModalContext'
import { useMutationObserver } from '@vueuse/core'

const props = {
  loading: { type: Boolean, default: true },
  useWrapper: { type: Boolean, default: true },
  modalHeaderHeight: { type: Number, default: 56 },
  modalFooterHeight: { type: Number, default: 56 },
  minHeight: { type: Number, default: 500 - 158 },
  height: { type: Number },
  footerOffset: { type: Number, default: 0 },
  visible: { type: Boolean },
  fullScreen: { type: Boolean },
  loadingTip: { type: String },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  }
}

export default defineComponent({
  name: 'ModalWrapper',
  components: { ScrollContainer },
  inheritAttrs: false,
  props,
  emits: ['height-change', 'ext-height'],
  setup(props, { emit }) {
    const wrapperRef = ref<ComponentRef>(null)
    const spinRef = ref<ElRef>(null)
    const realHeightRef = ref(0)
    const minRealHeightRef = ref(0)

    enum maxHeightEnum {
      small = 500,
      default = 600,
      large = 700
    }

    let realHeight = 0

    let stopElResizeFn: Fn = () => {}

    useWindowSizeFn(setModalHeight.bind(null, false))

    useMutationObserver(
      spinRef,
      () => {
        setModalHeight()
      },
      {
        attributes: true,
        subtree: true
      }
    )

    createModalContext({
      redoModalHeight: setModalHeight
    })

    const spinStyle = computed((): CSSProperties => {
      return {
        minHeight: `${props.minHeight}px`,
        [props.fullScreen ? 'height' : 'maxHeight']: `${unref(
          realHeightRef
        )}px`,
        overflow: 'auto',
        margin: '16px'
      }
    })

    watchEffect(() => {
      props.useWrapper && setModalHeight()
    })

    watch(
      () => props.fullScreen,
      (v) => {
        setModalHeight()
        if (!v) {
          realHeightRef.value = minRealHeightRef.value
        } else {
          minRealHeightRef.value = realHeightRef.value
        }
      }
    )

    onMounted(() => {
      const { modalHeaderHeight, modalFooterHeight } = props
      emit('ext-height', modalHeaderHeight + modalFooterHeight)
    })

    onUnmounted(() => {
      stopElResizeFn && stopElResizeFn()
    })

    async function setModalHeight() {
      // 解决在弹窗关闭的时候监听还存在,导致再次打开弹窗没有高度
      // 加上这个,就必须在使用的时候传递父级的visible
      if (!props.visible) return

      try {
        let maxHeight =
          maxHeightEnum[props.size] -
          props.modalFooterHeight -
          props.modalHeaderHeight -
          32

        await nextTick()
        const spinEl = unref(spinRef)

        if (!spinEl) return
        await nextTick()

        realHeight = spinEl.scrollHeight

        if (props.fullScreen) {
          realHeightRef.value =
            window.innerHeight -
            props.modalFooterHeight -
            props.modalHeaderHeight -
            28
        } else {
          realHeightRef.value = props.height
            ? props.height
            : realHeight > maxHeight
            ? maxHeight
            : realHeight
        }

        emit('height-change', unref(realHeightRef))
      } catch (error) {
        console.log(error)
      }
    }

    return { wrapperRef, spinRef, spinStyle, setModalHeight }
  }
}) as any
</script>
