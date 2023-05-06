<template>
  <div class="">
    <TableChildren ref="tableRef" :columns="columns" v-model:value="data" />

    <a-button @click="handleValidate">校验</a-button>
  </div>
</template>
<script lang="ts" setup>
import { TableChildren } from '3h1-ui'
import { ref } from 'vue'

const columns = [
  {
    title: 'a',
    dataIndex: 'a',
    rules: [{ required: true }]
  },
  {
    title: 'b',
    dataIndex: 'b'
  },
  {
    title: 'c',
    dataIndex: 'c'
  },
  {
    title: 'd',
    dataIndex: 'd'
  },
  {
    title: 'e',
    dataIndex: 'e'
  }
]
const data = [
  { b: 2, c: 3 },
  { a: 1, b: 2, c: 3 },
  { a: 1, b: 2, c: 3 },
  { a: 1, b: 2, c: 3 }
]
const tableRef = ref()
const handleValidate = () => {
  tableRef.value.validate()
}
</script>
<style lang="less" scoped></style>
