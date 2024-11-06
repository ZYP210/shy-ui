<template>
  <div :class="prefixCls" ref="parentScreenRef">
    <div :class="`${prefixCls}-view`" ref="screenRef">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, computed } from 'vue'
import { basicResizeWrapperProps } from './props'
import { useDesign } from '@shy-plugins/use'

export default defineComponent({
  props: basicResizeWrapperProps,
  setup(props, { emit }) {
    const { prefixCls } = useDesign('basic-resize-wrapper')

    function setScale() {
      const { width, height } = parentScreenRef.value.getBoundingClientRect()
      screenRef.value.style.transform = `scale(${width / props.designWidth},${
        height / props.designHeight
      })`
    }

    const screenRef = ref()
    const parentScreenRef = ref()

    const designWidth = computed(() => `${props.designWidth}px`)
    const designHeight = computed(() => `${props.designHeight}px`)
    const resizeObserver = ref()

    onMounted(() => {
      resizeObserver.value = new ResizeObserver(setScale)
      // 开始观察元素
      resizeObserver.value.observe(parentScreenRef.value)
    })

    onUnmounted(() => {
      resizeObserver.value.disconnect()
    })

    return {
      designWidth,
      designHeight,
      prefixCls,
      screenRef,
      parentScreenRef,
      setScale,
      emit
    }
  }
})
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-basic-resize-wrapper';

.@{prefix-cls} {
  --design-width: v-bind(designWidth);
  --design-height: v-bind(designHeight);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &-view {
    position: absolute;
    width: var(--design-width);
    height: var(--design-height);
    transform-origin: top left;
  }
}
</style>
