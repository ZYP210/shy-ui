<template>
  <div class="p4">
    <BasicTable
      title="基础示例"
      titleHelpMessage="温馨提醒"
      @register="register"
    >
      <template #toolbar>
        <a-button type="primary"> 操作按钮 </a-button>
      </template>
    </BasicTable>
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
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex'
  },
  {
    title: '年龄',
    dataIndex: 'age'
  }
]
const [register] = useTable({
  api: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ name: 1 }, { sex: 2 }, { age: 3 }])
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
</script>

<style scoped>
.p4 {
  /* height: 100%; */
  background-color: #f0f0f0;
}
</style>
