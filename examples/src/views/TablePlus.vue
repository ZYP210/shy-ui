<template>
  <div class="p-30px h-full overflow-hidden">
    <TablePlus @register="register">
      <template #toolbar>
        <a-button @click="handleClick">123</a-button>
        <a-button>1</a-button>
      </template>

      <template #action>
        <!--        <a-button>123</a-button>-->
        1233
      </template>

      <template #a="{ row }">{{ row }}</template>
    </TablePlus>
  </div>
</template>

<script setup lang="ts">
import { TablePlus, useTablePlus } from '3h1-ui'

const columns = [
  { title: 'a', dataIndex: 'a', width: 100 },
  { title: 'b', field: 'b', width: 100 },
  { title: 'c', field: 'c', width: 100 },
  { title: 'd', field: 'd' },
  { title: 'e', field: 'e' },
  { title: 'f', field: 'f' },
  { title: 'g', field: 'g' },
  { title: 'g', field: 'g1' },
  { title: 'g', field: 'g2' },
  { title: 'g', field: 'g3' },
  { title: 'g', field: 'g4' },
  { title: 'g', field: 'g5' },
  { title: 'g', field: 'g6' }
]

const getList = (params = {}) => {
  const list = []
  for (let i = 0; i < 110; i++) {
    list.push({
      a: 1,
      b: 2,
      c: 3,
      d: 4
    })
  }
  return new Promise((resolve) => {
    return resolve({
      records: list,
      total: list.length
    })
  })
}

const formConfig = {
  schemas: [
    { label: 'a', field: 'a', component: 'Input', colProps: { span: 8 } },
    { label: 'b', field: 'b', component: 'Input', colProps: { span: 8 } },
    { label: 'c', field: 'c', component: 'Input', colProps: { span: 8 } },
    { label: 'd', field: 'd', component: 'Input', colProps: { span: 8 } }
  ]
}

const [register, { getRowSelection }] = useTablePlus({
  api: getList,
  columns,
  formConfig,
  isShowSearch: false
})

const handleClick = () => {
  const records = getRowSelection()
}
</script>
