<template>
  <BasicModal
    title="title"
    width="80%"
    @register="register"
    @ok="handleComfirm"
  >
    <div class="wrapper">
      <DeptTree v-bind="getTreeProps" class="tree" @select="handleSelect" />
      <Table v-bind="getTableProps" ref="tableRef" class="table" />
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
import { useModalInner, BasicModal } from '../../../../Modal'
import DeptTree from './DeptTree.vue'
import Table from './Table.vue'
import { inject, ref, unref } from 'vue'

const [register, { closeModal }] = useModalInner((data) => {})

const getTreeProps = inject('getTreeProps')
const getTableProps: any = inject('getTableProps')

const tableRef = ref()
const handleSelect = (key) => {
  tableRef.value.setProps({ searchInfo: { deptId: key } })
  tableRef.value.reload()
}

const emit = defineEmits(['confirm', 'register'])

const handleComfirm = () => {
  const { selectedRowKeys } = tableRef.value.getRowSelection()
  const rows = tableRef.value.getSelectRows()

  const labelList = rows.map((item) => {
    return item[unref(getTableProps).fieldNames.label]
  })
  closeModal()
  emit('confirm', selectedRowKeys, labelList)
}
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
}

.tree {
  flex: none;
}

.table {
  flex: auto;
}
</style>
