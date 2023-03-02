<template>
  <BasicTable class="flex-1" @register="registerTable"> </BasicTable>
</template>
<script lang="ts" setup>
// import { reactive } from 'vue'
import { BasicTable, useTable } from '../../../../Table'

const props = defineProps({
  columns: {
    default: () => [
      { title: 'a', dataIndex: 'a' },
      { title: 'b', dataIndex: 'b' },
      { title: 'c', dataIndex: 'c' },
      { title: 'd', dataIndex: 'd' }
    ]
  },
  schemas: {
    default: () => [
      { label: 'a', field: 'a', component: 'Input', colProps: { span: 8 } },
      { label: 'b', field: 'b', component: 'Input', colProps: { span: 8 } }
    ]
  },
  api: {
    default: () => () =>
      new Promise((resolve) =>
        resolve([
          { a: 1, b: 2, c: 3, d: 4, id: '1' },
          { a: 1, b: 2, c: 3, d: 4, id: '2' },
          { a: 1, b: 2, c: 3, d: 4, id: '3' },
          { a: 1, b: 2, c: 3, d: 4, id: '4' },
          { a: 1, b: 2, c: 3, d: 4, id: '5' },
          { a: 1, b: 2, c: 3, d: 4, id: '6' },
          { a: 1, b: 2, c: 3, d: 4, id: '7' },
          { a: 1, b: 2, c: 3, d: 4, id: '8' },
          { a: 1, b: 2, c: 3, d: 4, id: '9' },
          { a: 1, b: 2, c: 3, d: 4, id: '10' }
        ])
      )
  },
  fieldNames: {
    default: () => {
      return { label: 'a', value: 'id' }
    }
  }
})
const [registerTable, { reload, setProps, getSelectRows, getRowSelection }] =
  useTable({
    api: props.api as any,
    title: '账号列表',
    isTreeTable: true,
    rowKey: 'id',
    columns: props.columns,
    rowSelection: { type: 'checkbox' },
    clickToRowSelect: false,
    useSearchForm: true,
    formConfig: {
      labelWidth: 80,
      schemas: props.schemas as any
    },
    showIndexColumn: true,
    isCanResizeParent: true,
    canResize: true,
    searchInfo: {}
  })

defineExpose({ reload, getRowSelection, setProps, getSelectRows })
</script>
