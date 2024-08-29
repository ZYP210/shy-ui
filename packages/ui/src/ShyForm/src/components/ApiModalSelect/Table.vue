<template>
  <ShyTable @register="registerTable"> </ShyTable>
</template>
<script lang="ts" setup>
import { inject, unref } from 'vue'
import { ShyTable, useShyTable } from '../../../../ShyTable'

const getTableProps: any = inject('getTableProps')

const [registerTable, tableAction] = useShyTable({
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
