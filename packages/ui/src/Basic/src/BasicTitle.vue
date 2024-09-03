<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp
      :class="`${prefixCls}-help`"
      v-if="helpMessage"
      :text="helpMessage"
    />
    <slot name="extra">
      <component
        v-if="$attrs?.extra"
        :is="
          isFunction($attrs.extra) ? $attrs.extra?.() : h('span', $attrs.extra)
        "
      ></component>
    </slot>
  </span>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import { useSlots, computed, h } from 'vue'
import BasicHelp from './BasicHelp'
import { useDesign } from '@shy-plugins/use'
import { isFunction } from '@shy-plugins/utils'

const props = defineProps({
  /**
   * Help text list or string
   * @default: ''
   */
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  /**
   * Whether the color block on the left side of the title
   * @default: false
   */
  span: { type: Boolean, default: true }
})

const { prefixCls } = useDesign('basic-title')
const slots = useSlots()
const getClass = computed(() => [
  prefixCls,
  { [`${prefixCls}-show-span`]: props.span && slots.default }
])
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-basic-title';

.@{prefix-cls} {
  position: relative;
  display: flex;
  font-family: PingFangSC, PingFang SC;
  font-weight: bold;
  font-size: 14px;
  color: var(--gray-9);
  line-height: 20px;
  padding: 0 0 0 10px;
  margin: 10px 0;
  align-items: center;
  gap: 8px;

  &-show-span::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 12px;
    background: var(--primary-5);
    border-radius: 1px;
    left: 2px;
    top: 50%;
    transform: translateY(-50%);
  }

  &-help {
    margin-left: 10px;
  }
}
</style>
