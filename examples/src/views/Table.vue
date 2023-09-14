<template>
  <div class="flex flex-col bg-black">
    <div class="h-80px flex-none"></div>
    <div class="flex-auto p-10px">
      <BasicTable
        title="基础示例"
        titleHelpMessage="温馨提醒"
        @register="register"
      >
        <template #toolbar>
          <a-button type="primary"> 操作按钮 </a-button>
        </template>

        <template #bodyCell="{ column }">
          <template v-if="column.dataIndex === 'action'">
            <TableAction
              :showCount="1"
              :actions="[{ label: '编辑' }, { label: '编辑' }]"
            />
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
  { label: 'a', field: 'b', component: 'Input', colProps: { span: 8 } },
  { label: 'a', field: 'c', component: 'Input', colProps: { span: 8 } },
  { label: 'a', field: 'd', component: 'Input', colProps: { span: 8 } }
]
const columns = [
  {
    title: '年龄',
    dataIndex: 'age',
    advancedType: 'string',
    component: 'ApiSelect',
    globalShow: false,
    componentProps: {
      api: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { label: '测试', value: 1 },
              { label: '测试', value: 2 },
              { label: '测试', value: 3 }
            ])
          }, 1000)
        })
      }
    }
    // advancedShow: false
  },
  {
    title: '姓名',
    dataIndex: 'name',
    advancedType: 'string',
    component: 'ApiSelect'
  },

  {
    title: '生日',
    dataIndex: 'birth',
    advancedType: 'date'
  },
  {
    title: '爱好',
    dataIndex: 'fav',
    advancedType: 'select',
    component: 'ApiSelect',
    componentProps: {
      api: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { label: '测试', value: 1 },
              { label: '测试', value: 2 },
              { label: '测试', value: 3 }
            ])
          }, 1000)
        })
      }
    }
  },
  {
    title: '字符串1',
    dataIndex: 'string1',
    advancedType: 'string',
    component: 'select'
  },
  { title: '字符串2', dataIndex: 'string2' },
  { title: '字符串3', dataIndex: 'string3' }
]
const [register] = useTable({
  api: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: 1 },
          { sex: 2 },
          { age: 3 },
          { name: 1 },
          { sex: 2 },
          { age: 3 },
          { name: 1 },
          { sex: 2 },
          { age: 3 },
          { name: 1 },
          { sex: 2 },
          { age: 3 },
          { name: 1 },
          { sex: 2 },
          { age: 3 },
          { name: 1 },
          { sex: 2 },
          { age: 3 }
        ])
      }, 1000)
    })
  },
  beforeFetch: (params) => {
    console.log(params)
    return params
  },
  searchInfo: { a: 1 },
  columns: columns as any,
  useSearchForm: true,
  useAdvancedSearch: true,
  showIndexColumn: true,
  // pagination: true,
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
