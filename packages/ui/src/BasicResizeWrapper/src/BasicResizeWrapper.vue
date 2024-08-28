<template>
  <div :class="prefixCls" ref="currentScreenRef">
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
      screenRef.value.style.transform = `scale(${
        currentScreenRef.value.offsetWidth / props.designWidth
      },${currentScreenRef.value.offsetHeight / props.designHeight})`

      // screenRef.value.style.left = '50%';
      // screenRef.value.style.translateX = '-50%';
    }

    const screenRef = ref()
    const currentScreenRef = ref()

    const designWidth = computed(() => `${props.designWidth}px`)
    const designHeight = computed(() => `${props.designHeight}px`)

    window.addEventListener('resize', setScale)

    onMounted(() => {
      setScale()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', setScale)
    })

    return {
      designWidth,
      designHeight,
      prefixCls,
      screenRef,
      currentScreenRef,
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

  &-view {
    position: absolute;
    width: var(--design-width);
    height: var(--design-height);
    transform-origin: top left;
  }
}
</style>
