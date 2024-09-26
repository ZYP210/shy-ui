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

      <template #name-c="{ row }"> 888 </template>

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
          reload()
        }
      }
    }
  ]
}

const columns = [
  {
    groupName: 'a',
    children: [
      {
        title: 'b',
        field: 'b',
        helpMessage: 'helpMessage'
      }
    ]
  },
  {
    title: '类型编号',
    field: 'a',
    helpMessage: 'helpMessage',
    treeNode: true,
    showOverflow: false
  },
  {
    title: 'b',
    field: 'b'
  },
  // {
  //   title: '类型编号',
  //   field: 'a',
  //   treeNode: true
  // },
  // {
  //   title: 'b',
  //   field: 'b'
  // },
  { title: 'c', field: 'c', width: 300 }
  // { title: 'd', field: 'd', width: 300 },
  // { title: 'e', field: 'e', width: 300 }
  // { title: 'f', field: 'f', width: 300 },
  // { title: 'g', field: 'g', width: 300 },
  // {
  //   groupName: 'bb',
  //   children: [
  //     { title: '测试a', field: 'a-a', width: 100, sortable: true },
  //     { title: '测试b', field: 'a-b', width: 100 },
  //     { title: '测试c', field: 'a-c', width: 200 },
  //     {
  //       groupName: 'cc',
  //       children: [{ title: '测试a', field: 'a-a', width: 200, sortable: true }]
  //     }
  //   ]
  // }
]

const pageNumber = ref(41)

const getList = (params) => {
  const list = []
  for (let i = 0; i < pageNumber.value; i++) {
    list.push({
      id: i,
      a: '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
      b: i + 2,
      c: i + 3,
      d: i + 4
    })
  }

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
    { label: 'a', field: 'a', component: 'Input' },
    { label: 'b', field: 'b', component: 'Input' },
    { label: 'c', field: 'c', component: 'Input' },
    { label: 'd', field: 'd', component: 'Input' },
    { label: 'e', field: 'e', component: 'RangePicker' }
  ]
}

const handleSelectionChange = (value) => {}

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
  border: true,
  columnSeq: { fixed: 'left' },
  rowConfig: { keyField: 'id' },
  treeConfig: { expandRowKeys: [0] },
  actionColumn: { width: 200 },
  transDataAfterReload: (res) => res.records,
  showOverflow: false
})

// onMounted(async () => {
//   setProps({ searchInfo: { id: 1 } })
//   await reload()
//   setSelectRowByKeys(['0c'], true)
// })

const handleClick = () => {}
</script>
