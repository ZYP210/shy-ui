<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-title`" :style="{ '--size': getSize }">
      {{ title }}
    </div>
    <div :class="`${prefixCls}-bar`" :style="{ '--color': `${color}` }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { basicLabelProps } from './props'
import { useDesign } from '@shy-plugins/use'

export default defineComponent({
  props: basicLabelProps,
  setup(props) {
    const { prefixCls } = useDesign('basic-label')

    const getSize = computed(() => {
      const unit =
        typeof props.size === 'number' || !isNaN(+props.size) ? 'px' : ''
      return `${props.size}${unit}`
    })

    return {
      prefixCls,
      getSize
    }
  }
})
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-basic-label';

.@{prefix-cls} {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 15px;

  &-title {
    font-size: var(--size);
    font-weight: bold;
  }

  &-bar {
    width: 2px;
    height: 14px;
    background-color: var(--color);
  }
}
</style>
