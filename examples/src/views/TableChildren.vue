<template>
  <!-- <Form :model="state">
    <FormItem name="table"> -->
  <TableChildren :columns="columns" v-model:value="state" />
  <!-- </FormItem>

    <a-button @click="handleValidate">校验</a-button>
  </Form> -->
</template>
<script lang="ts" setup>
import { Form, FormItem } from 'ant-design-vue'
import { TableChildren } from '3h1-ui'
import { ref } from 'vue'

const state = ref([])

const columns = [
  {
    title: '计划付款时间',
    dataIndex: 'paymentTime',
    type: 'datePicker'
  },
  {
    title: '付款金额',
    dataIndex: 'paymentAmount',
    type: 'number'
  },
  {
    title: '备注',
    dataIndex: 'remark'
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
  console.log('777')
}
const handleRemove = () => {
  console.log('remove')
}

onMounted(() => {
  state.value = [{ paymentTime: '' }].map((ele) => ele)
})
</script>
<style lang="less" scoped></style>
