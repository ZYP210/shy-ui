<template>
  <BasicTable @register="registerTable"> </BasicTable>
</template>
<script lang="ts" setup>
import { inject, unref } from 'vue'
import { BasicTable, useTable } from '../../../../Table'

const getTableProps: any = inject('getTableProps')

const [registerTable, tableAction] = useTable({
  api: () => {},
  title: '账号列表',
  rowKey: 'id',
  columns: [],
  rowSelection: { type: 'radio' },
  clickToRowSelect: true,
  formConfig: {
    labelWidth: 80,
    schemas: []
  },
  showIndexColumn: true,
  // isCanResizeParent: true,
  resizeHeightOffset: 200,
  canResize: true,
  searchInfo: {},
  useSearchForm: false,
  ...unref(getTableProps)
})

defineExpose({ ...tableAction })
</script>
