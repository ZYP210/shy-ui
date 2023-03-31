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
import { defineComponent, ref } from 'vue'
import { BasicTable, useTable } from '3h1-ui'
const columns = [
  {
    title: '123',
    dataIndex: 'a',
    editRow: true,
    editComponent: 'Input'
  }
]
const [register] = useTable({
  api: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ a: 1 }])
      }, 1000)
    })
  },
  columns: columns as any,
  useSearchForm: true
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
