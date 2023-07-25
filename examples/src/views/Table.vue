<template>
  <div class="p-15px overflow-auto h-full bg-black flex">
    <div class="w-600px mr-100px">
      <BasicTable
        title="基础示例"
        titleHelpMessage="温馨提醒"
        @register="register"
      >
        <template #toolbar>
          <a-button type="primary"> 操作按钮 </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <TableAction :actions="getActions()"></TableAction>
          </template>
        </template>
      </BasicTable>
    </div>

    <div class="w-600px">
      <BasicTable
        title="基础示例"
        titleHelpMessage="温馨提醒"
        @register="register2"
      >
        <template #toolbar>
          <a-button type="primary"> 操作按钮 </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <TableAction :actions="getActions()"></TableAction>
          </template>
        </template>
      </BasicTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTable, TableAction } from '3h1-ui'
const schemas = [
  { label: 'a', field: 'a', component: 'Input', colProps: { span: 8 } },
  { label: 'a', field: 'b', component: 'Input', colProps: { span: 8 } }
  // { label: 'a', field: 'c', component: 'Input', colProps: { span: 8 } },
  // { label: 'a', field: 'd', component: 'Input', colProps: { span: 8 } }
]
const columns = [
  {
    title: 'a',
    dataIndex: 'a',
    editRow: true,
    editComponent: 'Input'
  },
  {
    title: 'b',
    dataIndex: 'b',
    editRow: true,
    editComponent: 'Input'
  },
  {
    title: 'c',
    dataIndex: 'c',
    editRow: true,
    editComponent: 'Input'
  }
]
const [register] = useTable({
  api: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = []
        for (let i = 0; i < 100; i++) {
          data.push({ a: 1, b: 2, c: 3 })
        }
        resolve(data)
      }, 1000)
    })
  },
  columns: columns as any,
  useSearchForm: true,
  showIndexColumn: true,
  actionColumn: {
    title: '操作',
    dataIndex: 'action',
    align: 'center'
  },
  rowSelection: {},
  formConfig: {
    schemas
  }
})

const [register2] = useTable({
  api: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = []
        for (let i = 0; i < 100; i++) {
          data.push({ a: 1, b: 2, c: 3 })
        }
        resolve(data)
      }, 1000)
    })
  },
  columns: columns as any,
  useSearchForm: true,
  showIndexColumn: true,
  actionColumn: {
    title: '操作',
    dataIndex: 'action',
    align: 'center'
  },
  rowSelection: {},
  formConfig: {
    schemas
  }
})

const getActions = () => {
  return [
    {
      label: '查看',
      onClick: () => {
        console.log('view')
      }
    },
    {
      label: '修改',
      onClick: () => {
        console.log('update')
      }
    },
    {
      label: '删除',
      popConfirm: {
        title: '是否删除',
        confirm: () => {
          console.log('remove')
        }
      }
    }
  ]
}

const getDropDownActions = () => {
  return [
    {
      label: '查看',
      onClick: () => {
        console.log('view')
      }
    },
    {
      label: '修改',
      onClick: () => {
        console.log('update')
      }
    },
    {
      label: '删除',
      popConfirm: {
        title: '是否删除',
        confirm: () => {
          console.log('remove')
        }
      }
    }
  ]
}

const formConfig = {
  schemas: [{ label: 'a', field: 'a', component: 'Input' }]
}
const data = [{ a: 1 }]
</script>

<style scoped>
.p4 {
  /* height: 100%; */
  background-color: #f0f0f0;
}
</style>
