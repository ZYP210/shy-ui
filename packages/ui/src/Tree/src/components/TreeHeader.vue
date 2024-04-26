<template>
  <div :class="bem()">
    <slot name="headerTitle" v-if="slots.headerTitle"></slot>
    <div class="flex justify-between items-center">
      <BasicTitle :helpMessage="helpMessage" v-if="!slots.headerTitle && title">
        {{ title }}
      </BasicTitle>

      <Dropdown @click.prevent v-if="toolbar">
        <Icon
          icon="ant-design:plus-square-outlined"
          :style="{
            color: '#2da44e'
          }"
        />
        <template #overlay>
          <Menu @click="handleMenuClick">
            <template v-for="item in toolbarList" :key="item.value">
              <MenuItem v-bind="{ key: item.value }">
                {{ item.label }}
              </MenuItem>
              <MenuDivider v-if="item.divider" />
            </template>
          </Menu>
        </template>
      </Dropdown>
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
import { Dropdown, Menu, MenuItem, MenuDivider, Input } from 'ant-design-vue'
import { Icon } from '../../../Icon'
import { BasicTitle } from '../../../Basic'
import { useI18n } from '@shy-plugins/use'
import { useDebounceFn } from '@vueuse/core'
import { createBEM } from '@shy-plugins/utils'
import { ToolbarEnum } from '../types/tree'

const searchValue = ref('')

const [bem] = createBEM('tree-header')

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
const emit = defineEmits(['strictly-change', 'search'])

const slots = useSlots()
const { t } = useI18n()

const getInputSearchCls = computed(() => {
  // const titleExists = slots.headerTitle || props.title
  return ['mr-1', 'w-full']
})

const toolbarList = computed(() => {
  const { checkable } = props
  const defaultToolbarList = [
    { label: t('component.tree.expandAll'), value: ToolbarEnum.EXPAND_ALL },
    {
      label: t('component.tree.unExpandAll'),
      value: ToolbarEnum.UN_EXPAND_ALL,
      divider: checkable
    }
  ]

  return defaultToolbarList

  // return checkable
  //   ? [
  //       { label: t('component.tree.selectAll'), value: ToolbarEnum.SELECT_ALL },
  //       {
  //         label: t('component.tree.unSelectAll'),
  //         value: ToolbarEnum.UN_SELECT_ALL,
  //         divider: checkable
  //       },
  //       ...defaultToolbarList,
  //       {
  //         label: t('component.tree.checkStrictly'),
  //         value: ToolbarEnum.CHECK_STRICTLY
  //       },
  //       {
  //         label: t('component.tree.checkUnStrictly'),
  //         value: ToolbarEnum.CHECK_UN_STRICTLY
  //       }
  //     ]
  //   : defaultToolbarList
})

function handleMenuClick(e: { key: ToolbarEnum }) {
  const { key } = e
  switch (key) {
    case ToolbarEnum.SELECT_ALL:
      props.checkAll?.(true)
      break
    case ToolbarEnum.UN_SELECT_ALL:
      props.checkAll?.(false)
      break
    case ToolbarEnum.EXPAND_ALL:
      props.expandAll?.(true)
      break
    case ToolbarEnum.UN_EXPAND_ALL:
      props.expandAll?.(false)
      break
    case ToolbarEnum.CHECK_STRICTLY:
      emit('strictly-change', false)
      break
    case ToolbarEnum.CHECK_UN_STRICTLY:
      emit('strictly-change', true)
      break
  }
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
