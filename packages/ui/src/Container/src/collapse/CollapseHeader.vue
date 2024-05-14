<template>
  <div :class="[`${prefixCls}__header px-2 py-5`, $attrs.class]">
    <BasicTitle :helpMessage="helpMessage" normal>
      <template v-if="title">
        {{ title }}
      </template>
      <template v-else>
        <slot name="title"></slot>
      </template>
    </BasicTitle>
    <div :class="`${prefixCls}__action`">
      <slot name="action"></slot>
      <div
        v-if="canExpan"
        @click="$emit('expand')"
        :class="`${prefixCls}-arrow`"
      >
        <BasicArrow down :expand="show" />
        <span>{{ show ? '收起' : '展开' }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { BasicArrow, BasicTitle } from '../../../Basic'

const props = {
  prefixCls: { type: String },
  helpMessage: {
    type: [Array, String] as PropType<string[] | string>,
    default: ''
  },
  title: { type: String },
  show: { type: Boolean },
  canExpan: { type: Boolean }
}

export default defineComponent({
  components: { BasicArrow, BasicTitle },
  inheritAttrs: false,
  props,
  emits: ['expand']
})
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-collapse-container';

.@{prefix-cls}-arrow {
  font-size: 14px !important;
  color: var(--primary-5);
  cursor: pointer;
}
</style>
