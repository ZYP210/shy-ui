<template>
  <div class="p-30px h-full overflow-hidden">
    <TablePlus
      ref="aRef"
      @register="register"
      @selection-change="handleSelectionChange"
    >
      <template #toolbar>
        <a-button @click="handleClick">123</a-button>
        <a-button>1</a-button>
      </template>

      <template #action>
        <TableAction :actions="actions" />
      </template>
    </TablePlus>
  </div>
</template>

<script setup lang="ts">
import { useTablePlus, TablePlus, TableAction } from '3h1-ui'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { Button } from 'ant-design-vue'

const actions = [
  {
    label: '修改'
  },
  {
    label: '查看'
  },
  {
    label: '新增'
  },
  {
    label: '测试'
  }
]

const columns = [
  {
    title: '类型编号',
    field: 'a',
    width: 300,
    treeNode: true
  },
  {
    title: 'b',
    field: 'b',
    width: 300
  },
  { title: 'c', field: 'c', width: 300 },
  { title: 'd', field: 'd', width: 300 },
  { title: 'e', field: 'e', width: 300 },
  { title: 'f', field: 'f', width: 300 },
  { title: 'g', field: 'g', width: 300 }
]

const getList = (params = {}) => {
  const list = []
  for (let i = 0; i < 10; i++) {
    list.push({
      id: i,
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      children: [
        {
          id: i + 'c',
          a: 1,
          b: 2,
          c: 3,
          d: 4
        },
        {
          id: i + 'd',
          a: 1,
          b: 2,
          c: 3,
          d: 4
        }
      ]
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
    setSelectRowByKeys
  }
] = useTablePlus({
  api: getList,
  columns,
  formConfig,
  columnSeq: { fixed: 'left' },
  isImmediate: false,
  rowConfig: { keyField: 'id' },
  treeConfig: { expandRowKeys: [0] }
})

onMounted(async () => {
  setProps({ searchInfo: { id: 1 } })
  await reload()
  setSelectRowByKeys(['0c'], true)
})

const handleClick = () => {}
</script>
