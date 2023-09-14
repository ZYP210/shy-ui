<template>
  <vxe-table
    class="shy-table"
    ref="tableRef"
    align="center"
    :height="props.height || undefined"
    :data="data"
    border
    show-overflow="tooltip"
    :column-config="{ resizable: true }"
    :row-config="{ height: props.rowHeight }"
    @checkbox-all="checkboxChangeEvent"
    @checkbox-change="checkboxChangeEvent"
    size="small"
  >
    <vxe-column type="checkbox" width="60" v-if="props.isCheckbox"></vxe-column>
    <vxe-column
      type="seq"
      width="60"
      title="序号"
      align="center"
      v-if="props.isIndex"
    ></vxe-column>
    <template v-for="(column, index) in props.column" :key="index">
      <vxe-column
        :field="column.prop"
        :title="column.label"
        :width="column?.width || undefined"
        align="center"
      >
        <template #default="{ row }" v-if="column?.slot === true">
          <slot :name="column.prop" v-bind="{ row }">插槽已开启</slot>
        </template>
      </vxe-column>
    </template>
    <vxe-column
      align="center"
      title="操作"
      v-if="props.isMenu"
      :width="props.menuWidth"
    >
      <template #default="{ row }">
        <ButtonGroup
          :data="buttonList"
          @click-event="buttonClickEvent($event, row)"
        />
      </template>
    </vxe-column>
  </vxe-table>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import 'xe-utils'
import 'vxe-table/lib/style.css'
import { VxeTable, VxeColumn, VxeTableInstance } from 'vxe-table'

import ButtonGroup from './ButtonGroup.vue'
import TooltipView from './TooltipView.vue'

const emits = defineEmits([
  'page-change',
  'search-change',
  'checkbox-change',
  'add',
  'edit',
  'remove',
  'view'
])
interface Column {
  prop: string
  label: string
  searchSpan?: number
  search?: boolean
  type?: string
  dicData?: { label: string; value: string }[]
  width?: number | undefined
  isAdd?: boolean | undefined
  isEdit?: boolean | undefined
  isView?: boolean | undefined
  height?: number | string
  slot?: boolean
}

interface Props {
  isCheckbox?: boolean
  isIndex?: boolean
  isMenu?: boolean
  column: Column[]
  data: any[]
  rowHeight?: number
  height?: string | undefined
  menuWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  isCheckbox: true,
  isIndex: true,
  isMenu: true,
  height: undefined,
  data: () => [],
  rowHeight: 40,
  menuWidth: 160
})

const buttonList = [
  {
    title: '查看',
    dataIndex: 'view'
  },
  {
    title: '修改',
    dataIndex: 'edit'
  },
  {
    title: '删除',
    dataIndex: 'del'
  }
]

const buttonClickEvent = (key, row) => {
  //@ts-ignore
  emits('add-event', 1)
}

// // add
// const addEvent = () => {
//   emits('add')
// }
// // remove
// const removeEvent = (row) => {
//   emits('remove', { row })
// }

// // edit
// const editEvent = (row) => {
//   emits('edit', { row })
// }
// // view
// const viewEvent = (row) => {
//   emits('view', { row })
// }

// 选中
const tableRef = ref<VxeTableInstance>()
const checkboxChangeEvent = () => {
  const table = tableRef.value as VxeTableInstance
  const list = table.getCheckboxRecords()
  console.log('list', list)
  emits('checkbox-change', list)
}
</script>

<style scoped lang="less">
.shy-table {
  &::v-deep(.vxe-table--body) {
    .vxe-cell {
      font-size: 14px;
      font-family: 'PingFang SC', Helvetica, Arial, Verdana, Tahoma, sans-serif;
      color: #3c3c3c;
      font-weight: 500;
    }
  }

  &::v-deep(.vxe-header--row) {
    .vxe-cell--title {
      font-size: 14px;
      font-family: 'PingFang SC', Helvetica, Arial, Verdana, Tahoma, sans-serif;
      color: #333;
      font-weight: 500;
    }
  }
}

.shy-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  flex: none;
}
</style>
