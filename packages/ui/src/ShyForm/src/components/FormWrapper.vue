<template>
  <div :class="[prefixCls, getClass]">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useDesign } from '@shy-plugins/use'
import { computed } from 'vue'

const { prefixCls } = useDesign('ant-form-wrapper')

const props = defineProps({
  span: {
    type: Number,
    default: () => 1
  }
})

const getClass = computed(() => {
  switch (props.span) {
    case 1:
      return `${prefixCls}-col-1`
    case 2:
      return `${prefixCls}-col-2`
    case 3:
      return `${prefixCls}-col-3`
    default:
      return ''
  }
})
</script>
