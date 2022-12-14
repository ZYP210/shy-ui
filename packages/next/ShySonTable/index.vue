<template>
  <a-table
    :columns="tableColumns"
    :data-source="tableData"
    @resizeColumn="handleResizeColumn"
  >
    <template #headerCell="{ column }">
      <template v-if="column.dataIndex === 'tableMenu'">
        <a-button type="primary" shape="circle" @click="addItem">
          <template #icon><plus-circle-outlined /></template>
        </a-button>
      </template>
    </template>
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.slot">
        <slot :name="column.dataIndex" :data="record" :column="column"></slot
      ></template>
      <template v-else-if="column.dataIndex !== 'tableMenu'">
        <a-input
          v-if="column.type == 'input'"
          v-model:value="record[column.dataIndex]"
          :disabled="column.disabled"
          :placeholder="'请输入' + column.title"
        />
        <a-select
          :mode="column.selectMode"
          :disabled="column.disabled"
          v-else-if="column.type == 'select'"
          v-model:value="record[column.dataIndex]"
          :options="column.dicData || []"
          :placeholder="'请选择' + column.title"
        />
        <a-tree-select
          v-else-if="column.type == 'treeSelect'"
          v-model:value="record[column.dataIndex]"
          :tree-data="column.dicData"
          tree-checkable
          allow-clear
          :placeholder="'请选择' + column.title"
        />
        <a-input-number
          v-else-if="column.type == 'number'"
          :max="column.max"
          :min="column.min"
          :disabled="column.disabled"
          v-model:value="record[column.dataIndex]"
          :defaultValue="column.value"
        />
        <a-checkbox-group
          v-else-if="column.type == 'checkbox'"
          v-model:value="record[column.dataIndex]"
          :name="column.checkboxName || 'checkboxgroup'"
          :options="column.dicData"
        />
        <a-radio-group
          v-else-if="column.type == 'radio'"
          v-model:value="record[column.dataIndex]"
          :options="column.dicData"
        />
        <a-date-picker
          v-else-if="column.type == 'date'"
          v-model:value="record[column.dataIndex]"
          :disabled="column.disabled"
          :value-format="column?.valueFormat || 'YYYY-MM-DD'"
        />
        <a-textarea
          v-else-if="column.type == 'textarea'"
          :disabled="column.disabled"
          v-model:value="record[column.dataIndex]"
        />
      </template>
      <template v-else-if="column.dataIndex === 'tableMenu'">
        <a-button danger shape="circle" @click="deleteItem(index)">
          <template #icon><close-circle-outlined /></template>
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { defineProps, watch, reactive, defineExpose } from 'vue'
import { getTableColumns } from '../../../utils/shyHook/formatOption'

interface columnItem {
  title: string
  dataIndex: string
  [parmas: string]: any
}

const handleResizeColumn = (w: number, col: any) => {
  col.width = w
}

const props = defineProps({
  columns: {
    type: Array,
    default: () => {
      return []
    }
  },
  data: {
    type: Array,
    default: () => {
      return []
    }
  }
})

const tableData: Array<object> = reactive([])
const tableColumns: Array<columnItem> = reactive([])

const deleteItem = (index: number) => {
  tableData.splice(index, 1)
}

const addItem = () => {
  tableData.push(getDefaultVal())
}

const getDefaultVal = () => {
  const val: any = {}
  tableColumns.map((e) => {
    if (e.dataIndex !== 'tableMenu') {
      val[e.dataIndex] = e.value || ''
    }
  })
  return val
}

watch(
  () => props.columns,
  (newVal) => {
    tableColumns.push(...getTableColumns(newVal, true, 80))
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.data,
  (newVal) => {
    Object.assign(tableData, newVal)
  },
  {
    immediate: true,
    deep: true
  }
)

defineExpose({
  tableData
})
</script>
