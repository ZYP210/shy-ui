<template>
  <BasicModal
    :title="props.title"
    width="80%"
    @register="register"
    @ok="handleComfirm"
  >
    <div class="wrapper overflow-hidden">
      <DeptTree v-bind="getTreeProps" class="tree" @select="handleSelect" />
      <div class="table-wrapper">
        <Table v-bind="getTableProps" ref="tableRef" />
      </div>
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
import { useModalInner, BasicModal } from '../../../../Modal'
import DeptTree from './DeptTree.vue'
import Table from './Table.vue'
import { inject, ref, unref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: 'title'
  }
})

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
  const rows = tableRef.value.getSelectRows()
  closeModal()

  emit('confirm', rows)
}
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
}

.tree {
  flex: none;
}

.table-wrapper {
  flex: 1 1 0%;
  overflow: hidden;
}
</style>
