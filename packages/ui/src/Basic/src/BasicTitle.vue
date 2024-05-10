<template>
  <span :class="getClass">
    <div :class="`${prefixCls}-label`">
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
            isFunction($attrs.extra)
              ? $attrs.extra?.()
              : h('span', $attrs.extra)
          "
        ></component>
      </slot>
    </div>
    <div :class="`${prefixCls}-expand`" v-if="expand" @click="handleExpand">
      <BasicArrow down :expand="isExpand" :class="`${prefixCls}-expand-icon`" />
      <span>{{ isExpand ? '收起' : '展开' }}</span>
    </div>
  </span>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import { useSlots, computed, ref, h } from 'vue'
import BasicHelp from './BasicHelp.vue'
import BasicArrow from './BasicArrow.vue'
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
  span: { type: Boolean, default: true },

  /**
   * Whether show to expand
   * @default: false
   */
  expand: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['handleExpand'])

const handleExpand = () => {
  isExpand.value = !isExpand.value
  emit('handleExpand')
}

const { prefixCls } = useDesign('basic-title')

const slots = useSlots()

const getClass = computed(() => [
  prefixCls,
  { [`${prefixCls}-show-span`]: props.span && slots.default }
])

const isExpand = ref(false)
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-basic-title';

.@{prefix-cls} {
  position: relative;
  display: flex;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 14px;
  color: var(--gray-10);
  line-height: 20px;
  padding: 0 0 0 10px;
  margin: 10px 0;
  justify-content: space-between;
  align-items: center;

  &-label {
    display: flex;
    gap: 8px;
    align-items: center;
  }

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

  &-expand {
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: var(--primary-5);

    &-icon {
      margin-right: 3px;
    }
  }
}
</style>
