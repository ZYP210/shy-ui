<template>
  <div>
    <TableAction :actions="action" :showCount="3" />
  </div>
</template>

<script setup lang="ts">
import { TableAction } from '3h1-ui'

const action = [
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
</script>

<style scoped></style>
