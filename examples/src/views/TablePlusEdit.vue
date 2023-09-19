<template>
  <div class="p-30px h-full overflow-hidden">
    <TablePlus
      ref="aRef"
      @register="register"
      @selection-change="handleSelectionChange"
    >
      <template #form-resetBefore>
        <a-button @click="handleAdd">新增</a-button>
      </template>
    </TablePlus>
  </div>
</template>

<script setup lang="ts">
import { useTablePlus, TablePlus } from '3h1-ui'
import dayjs from 'dayjs'

const columns = [
  {
    title: '类型编号',
    field: 'a',
    isEdit: true,
    treeNode: true
  },
  {
    title: 'b',
    field: 'b',
    isEdit: true,
    editComponentProps: {
      component: 'Switch'
    }
  },
  { title: 'd', field: 'd', isEdit: true },
  { title: 'd', field: 'd', isEdit: true },
  { title: 'd', field: 'd', isEdit: true },
  { title: 'e', field: 'e', isEdit: true },
  { title: 'c', field: 'c', isEdit: true },
  { title: 'f', field: 'f', isEdit: true },
  { title: 'g', field: 'g', isEdit: true }
]

const getList = (params = {}) => {
  const list = []
  for (let i = 0; i < 10; i++) {
    list.push({
      id: i,
      a: 1,
      b: 2,
      c: 3,
      d: 4
    })
  }
  return new Promise((resolve) => {
    return resolve({
      records: list,
      total: list.length
    })
  })
}

const formConfig = {
  schemas: [
    { label: 'a', field: 'a', component: 'Input', colProps: { span: 8 } },
    { label: 'b', field: 'b', component: 'Input', colProps: { span: 8 } },
    { label: 'c', field: 'c', component: 'Input', colProps: { span: 8 } },
    { label: 'd', field: 'd', component: 'Input', colProps: { span: 8 } },
    { label: 'e', field: 'e', component: 'RangePicker', colProps: { span: 8 } }
  ]
}

const handleSelectionChange = (value) => {}

onMounted(() => {
  getForm().setFieldsValue({ e: [dayjs(), dayjs()] })
})

const [
  register,
  {
    getRowSelection,
    setProps,
    reload,
    setEditByRow,
    getForm,
    getVxeTableRef,
    setSelectRowByKeys,
    addTableData
  }
] = useTablePlus({
  api: getList,
  columns,
  formConfig,
  isUseDefaultEditAction: true,
  columnSeq: { fixed: 'left' },
  isImmediate: false,
  rowConfig: { keyField: 'id' },
  treeConfig: { expandRowKeys: [0] }
})

const handleAdd = () => {
  addTableData([{ a: 1, id: 'a1' }])
}

onMounted(async () => {
  setProps({ searchInfo: { id: 1 } })
  await reload()
  setSelectRowByKeys(['0c'], true)
})

const handleClick = () => {}
</script>
