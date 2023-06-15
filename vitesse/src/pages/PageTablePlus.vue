<template>
  <TablePlus @register="register" />
  <div>123</div>
</template>

<script lang="ts" setup>
import { TablePlus, useTablePlus } from '3h1-ui'

const [register] = useTablePlus({
  columns: [{ title: 'a', dataIndex: 'a' }]
})
</script>
