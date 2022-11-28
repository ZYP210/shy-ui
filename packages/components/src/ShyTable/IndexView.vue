<template>
  <div class="shy-table">
    <div class="shy-menu">
      <div class="menu-left">
        <a-space align="center">
          <a-button type="primary" @click="addEvent">
            <template #icon>
              <plus-outlined />
            </template>
            新增
          </a-button>

          <a-button @click="removeEvent">
            <template #icon>
              <delete-outlined />
            </template>
            删除
          </a-button>
          <slot name="menuLeft"></slot>
        </a-space>
      </div>
      <div class="menu-right">
        <a-space>
          <slot name="menuRight"></slot>
          <a-button class="btn-setting">
            <template #icon>
              <setting-outlined :style="{ fontSize: '16px' }" />
            </template>
            <TooltipView />
          </a-button>
        </a-space>
      </div>
    </div>

    <div class="table-wrapper">
      <vxe-table
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
        <vxe-column type="checkbox" width="60" v-if="isCheckbox"></vxe-column>
        <vxe-column
          type="seq"
          width="60"
          title="序号"
          align="center"
        ></vxe-column>
        <template v-for="(column, index) in props.column" :key="index">
          <vxe-column
            :field="column.dataIndex"
            :title="column.title"
            :width="column?.width || undefined"
            align="center"
          >
            <template #default="{ row }" v-if="column?.slot === true">
              <slot :name="column.dataIndex" v-bind="{ row }">插槽已开启</slot>
            </template>
          </vxe-column>
        </template>
        <vxe-column align="center" title="操作" :width="props.menuWidth">
          <template #default="{ row }">
            <ButtonGroup
              :data="buttonList"
              @click-event="buttonClickEvent($event, row)"
            />
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import 'xe-utils'
import 'vxe-table/lib/style.css'
import { VxeTable, VxeColumn, VxeTableInstance } from 'vxe-table'
import {
  PlusOutlined,
  DeleteOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import ButtonGroup from './ButtonGroup.vue'
import TooltipView from './TooltipView.vue'

import {
  Space as ASpace,
  Button as AButton,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Row as ARow,
  Col as ACol,
  Popconfirm as APopconfirm
} from 'ant-design-vue'

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
  dataIndex: string
  title: string
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
  column: Column[]
  data: any[]
  rowHeight?: number
  height?: string | undefined
  menuWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  isCheckbox: true,
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
  console.log('key', key)
  console.log('row', row)
  //@ts-ignore
  emits('add-event', 1)
}

// add
const addEvent = () => {
  emits('add')
}
// remove
const removeEvent = (row) => {
  emits('remove', { row })
}

// edit
const editEvent = (row) => {
  emits('edit', { row })
}
// view
const viewEvent = (row) => {
  emits('view', { row })
}

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
  display: flex;
  overflow: hidden;
  height: 100%;
  background-color: #fff;
  flex-flow: column nowrap;

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

.shy-search {
  overflow: hidden;
  margin-bottom: 16px;
  height: 0;
  transition: height 0.5s ease-out;
  flex: none;
}

.shy-page {
  flex: none;
}

.table-wrapper {
  flex: 1 1 0;
  overflow: hidden;
}

.ant-form-item {
  margin: 0 !important;
}

.menu-left {
  flex: 0 0 50%;
}

.menu-right {
  position: relative;
  text-align: right;
}

.btn-setting {
  position: relative;
}
</style>
