<template>
  <div :class="prefixCls">
    <div
      :class="`${prefixCls}-title`"
      v-if="slots.headerTitle || title || addable"
    >
      <slot name="headerTitle" v-if="slots.headerTitle"></slot>
      <BasicTitle :helpMessage="helpMessage" v-if="!slots.headerTitle && title">
        {{ title }}
      </BasicTitle>

      <Icon
        v-if="addable"
        icon="ant-design:plus-square-outlined"
        class="cursor-pointer text-[var(--primary-5)]"
        @click="handleMenuClick"
      />
    </div>

    <div class="shy-search" v-if="search || toolbar">
      <div :class="`${prefixCls}-search`" v-if="search">
        <Input
          placeholder="搜索"
          allowClear
          :defaultValue="searchText"
          @change="(e) => debounceEmitChange(e.target.value)"
        />
        <slot name="searchExtra" v-bind="{ search: searchText }"></slot>
      </div>
    </div>

    <slot name="appendHeader"></slot>
  </div>
</template>
<script lang="ts" setup>
import { useSlots } from 'vue'
import { Input } from 'ant-design-vue'
import { Icon } from '../../../Icon'
import { BasicTitle } from '../../../Basic'
import { useDebounceFn } from '@vueuse/core'
import { ToolbarEnum } from '../types/tree'
import { useDesign } from '@shy-plugins/use'
import { ComputedRef } from 'vue'

const { prefixCls } = useDesign('ant-tree-header')

defineProps({
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  toolbar: {
    type: Boolean,
    default: false
  },
  checkable: {
    type: Boolean,
    default: false
  },
  addable: {
    type: Boolean,
    default: false
  },
  search: {
    type: Object as PropType<ComputedRef<string>>,
    default: false
  },
  searchText: {
    type: String,
    default: ''
  },
  checkAll: {
    type: Function,
    default: undefined
  },
  expandAll: {
    type: Function,
    default: undefined
  }
})
const emit = defineEmits(['strictly-change', 'search', 'plus-click'])

const slots = useSlots()

function handleMenuClick(e: { key: ToolbarEnum }) {
  emit('plus-click')
}

function emitChange(value?: string): void {
  emit('search', value)
}

const debounceEmitChange = useDebounceFn(emitChange, 200)
</script>
