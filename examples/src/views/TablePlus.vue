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

      <template #action="{ row, column }">
        <TableAction :actions="getActions(row)" :show-count="4" />
      </template>
    </TablePlus>
  </div>
</template>

<script setup lang="ts">
import { useTablePlus, TablePlus, TableAction } from '3h1-ui'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { Button } from 'ant-design-vue'

const getActions = (row) => {
  const data = getTableData()

  return [
    {
      label: '修改',
      ifShow: row.id === 1
    },
    // {
    //   label: '查看'
    // },
    // {
    //   label: '新增'
    // },
    // {
    //   label: '测试'
    // },
    {
      label: '删除',

      popConfirm: {
        title: '是否确认删除',
        confirm: () => {
          --pageNumber.value
          reload()
        }
      }
    }
  ]
}

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
    width: 100
  },
  // { title: 'c', field: 'c', width: 300 },
  // { title: 'd', field: 'd', width: 300 },
  // { title: 'e', field: 'e', width: 300 },
  // { title: 'f', field: 'f', width: 300 },
  // { title: 'g', field: 'g', width: 300 },
  {
    groupName: 'bb',
    children: [
      { title: '测试a', field: 'a-a', width: 100, sortable: true },
      { title: '测试b', field: 'a-b', width: 100 },
      { title: '测试c', field: 'a-c', width: 200 },
      {
        groupName: 'cc',
        children: [{ title: '测试a', field: 'a-a', width: 200, sortable: true }]
      }
    ]
  }
]

const pageNumber = ref(41)

const getList = (params) => {
  const list = []
  for (let i = 0; i < pageNumber.value; i++) {
    list.push({
      id: i,
      a: i + 1,
      b: i + 2,
      c: i + 3,
      d: i + 4,
      children: [
        {
          id: i + 'c',
          a: 'dsssssssssssssssssssddddddddddddddddddsddddddddddddddddddsddddddddddddddddddsddddddddddddddddddsdddddddddddddddddd',
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
  console.log('params', params)
  if (params.current === 2) {
    return new Promise((resolve) => {
      return resolve({
        total: 10,
        records: []
      })
    })
  }
  return new Promise((resolve) => {
    return resolve({
      total: list.length,
      records: list.slice(
        params.size * (params.current - 1),
        params.size * params.current
      )
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
    getTableData,
    setTableData,
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
  treeConfig: { expandRowKeys: [0] },
  actionColumn: { width: 200 }
})

onMounted(async () => {
  setProps({ searchInfo: { id: 1 } })
  await reload()
  setSelectRowByKeys(['0c'], true)
})

const handleClick = () => {}
</script>
