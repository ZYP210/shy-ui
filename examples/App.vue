<template>
  <div class="box-main">
    <s-search :column="searchColumn"></s-search>
    <s-table :column="tableColumn" :data="tableData"></s-table>
    <s-page :page="page"></s-page>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue'

const form = ref({ a: 1, b: 2, c: 3 })
const column = [
  {
    label: '表单1',
    prop: 'a'
  },
  {
    label: '表单1',
    prop: 'b'
  },
  {
    label: '表单1',
    prop: 'c'
  }
]
const tableData = ref([{ a: 1 }])
const tableColumn = [
  {
    title: 'a',
    dataIndex: 'a'
  }
]
const searchColumn = [
  {
    label: 'a',
    prop: 'a'
  }
]

const page = ref({ current: 1, pageSize: 10, total: 100 })
</script>

<style lang="less" scoped>
.box-main {
  overflow: hidden;
  margin: 100px auto 0;
  width: 1000px;
  // height: 1000px;
}
</style>
