<template>
  <div :class="prefixCls">
    <slot name="headerTitle" v-if="slots.headerTitle"></slot>
    <div :class="`${prefixCls}-title`" v-if="slots.headerTitle || title || addable">
      <BasicTitle :helpMessage="helpMessage" v-if="!slots.headerTitle && title">
        {{ title }}
      </BasicTitle>

      <Icon
        v-if="addable"
        icon="ant-design:plus-square-outlined"
        :style="{
          color: '#2da44e'
        }"
        class="cursor-pointer"
        @click="handleMenuClick"
      />
    </div>

    <div class="shy-search" v-if="search || toolbar">
      <div :class="getInputSearchCls" v-if="search">
        <Input
          :placeholder="t('common.searchText')"
          allowClear
          v-model:value="searchValue"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch, useSlots } from 'vue'
import { Input } from 'ant-design-vue'
import { Icon } from '../../../Icon'
import { BasicTitle } from '../../../Basic'
import { useI18n } from '@shy-plugins/use'
import { useDebounceFn } from '@vueuse/core'
import { ToolbarEnum } from '../types/tree'
import { useDesign } from '@shy-plugins/use'

const searchValue = ref('')

const { prefixCls } = useDesign('ant-tree-header')

const props = defineProps({
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
    type: Boolean,
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
} as const)
const emit = defineEmits(['strictly-change', 'search', 'plus-click'])

const slots = useSlots()
const { t } = useI18n()

const getInputSearchCls = computed(() => {
  return ['mr-1', 'w-full']
})


function handleMenuClick(e: { key: ToolbarEnum }) {
  emit('plus-click')
}

function emitChange(value?: string): void {
  emit('search', value)
}

const debounceEmitChange = useDebounceFn(emitChange, 200)

watch(
  () => searchValue.value,
  (v) => {
    debounceEmitChange(v)
  }
)

watch(
  () => props.searchText,
  (v) => {
    if (v !== searchValue.value) {
      searchValue.value = v
    }
  }
)
</script>
<style lang="less" scoped>
.shy-search {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  flex: 1 1 0%;
  justify-self: stretch;
}
</style>
