<template>
  <div class="pl-15px pr-15px overflow-hidden h-full">
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
import { defineComponent, ref } from 'vue'
import { BasicTable, useTable } from '3h1-ui'
const columns = [
  {
    title: '123',
    dataIndex: 'a',
    editRow: true,
    editComponent: 'Input'
  },
  {
    title: '123',
    dataIndex: 'b',
    editRow: true,
    editComponent: 'Input'
  },
  {
    title: '123',
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
          data.push({ a: 1 })
        }
        resolve(data)
      }, 1000)
    })
  },
  columns: columns as any,
  useSearchForm: true,
  showIndexColumn: true,
  actionColumn: {
    title: '操作'
  },
  rowSelection: {},
  formConfig: {
    schemas: [
      { label: 'a', field: 'a', component: 'Input', colProps: { span: 8 } },
      { label: 'a', field: 'b', component: 'Input', colProps: { span: 8 } },
      { label: 'a', field: 'c', component: 'Input', colProps: { span: 8 } },
      { label: 'a', field: 'd', component: 'Input', colProps: { span: 8 } }
    ]
  }
})

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
