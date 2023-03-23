<template>
  <BasicTable class="flex-1" @register="registerTable"> </BasicTable>
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
  useSearchForm: true,
  formConfig: {
    labelWidth: 80,
    schemas: []
  },
  showIndexColumn: true,
  isCanResizeParent: true,
  canResize: true,
  searchInfo: {},
  ...unref(getTableProps)
})

defineExpose({ ...tableAction })
</script>
