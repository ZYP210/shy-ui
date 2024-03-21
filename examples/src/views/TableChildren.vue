<template>
  <Form :model="state">
    <FormItem name="table">
      <TableChildren
        ref="tableRef"
        codeField="table"
        :columns="columns"
        v-model:value="state.table"
        @add="handleAdd"
        @remove="handleRemove"
      />
    </FormItem>

    <a-button @click="handleValidate">校验</a-button>
  </Form>
</template>
<script lang="ts" setup>
import { Form, FormItem } from 'ant-design-vue'
import { TableChildren } from '3h1-ui'
import { ref } from 'vue'

const state = reactive({
  table: [
    { b: 2, c: '' },
    { a: 1, b: 2 },
    { a: 1, b: 2 },
    { a: 1, b: 2 }
  ]
})

const columns = [
  {
    title: 'a',
    dataIndex: 'a',
    type: 'ApiSelect',
    componentProps: ({ record, index }) => {
      return {
        api: async (params) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                { label: 'a', value: 'a' },
                { label: 'b', value: 'b' }
              ])
            }, 3000)
          })
        },
        onChange: () => {
          record.d = index
        },
      }
    },
    required: true
  },
  {
    title: 'b',
    dataIndex: 'b',
    type: 'text'
  },
  {
    title: 'c',
    dataIndex: 'c',
    type: 'DatePicker'
  },
  {
    title: 'd',
    dataIndex: 'd',
    required: true
  },
  {
    title: 'e',
    dataIndex: 'e'
  }
]
const tableRef = ref()
const handleValidate = async () => {
  try {
    await tableRef.value.validate()
  } catch {
    console.log('error')
  }
}

const handleAdd = () => {
  console.log('add')
}
const handleRemove = () => {
  console.log('remove')
}
</script>
<style lang="less" scoped></style>
