<template>
  <div class="m-4">
    <Button @click="handleGetForm">获取form</Button>
    <BasicForm
      :labelWidth="100"
      @register="registerForm"
      :actionColOptions="{ span: 24 }"
      @submit="handleSubmit"
    />
  </div>
</template>
<script lang="ts" setup>
import { BasicForm, FormSchema, useForm, TableChildren } from '3h1-ui'
import { Button } from 'ant-design-vue'
import { useMessage } from '@shy-plugins/use'
import { onMounted } from 'vue'
import { ref } from 'vue'

const schemas: FormSchema[] = [
  {
    field: 'field',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8
    },
    defaultValue: '1',
    componentProps: {
      placeholder: '自定义placeholder',
      onChange: (e) => {
        console.log(e)
      }
    }
  },
  {
    field: 'table',
    label: 'table',
    component: 'Table',
    componentProps: {
      columns: [
        {
          title: 'a',
          dataIndex: 'a'
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
    }
  },
  {
    field: '选择弹框',
    label: '选择弹框',
    component: 'ApiModalSelect',
    componentProps: {}
  }
]
const { createMessage } = useMessage()
const [registerForm, { setFieldsValue, getFieldsValue }] = useForm({
  schemas
})

onMounted(() => {
  setFieldsValue({
    field: 123,
    table: [{ a: 1, b: 2, c: 3 }]
  })
})

const data = ref([])
const columns = [
  {
    title: 'a',
    dataIndex: 'a'
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

const handleSubmit = (values: any) => {
  createMessage.success('click search,values:' + JSON.stringify(values))
}

const handleGetForm = () => {
  const values = getFieldsValue()

  console.log('values', values)
}
</script>
