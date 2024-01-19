<template>
  <div class="m-4">
    <Button @click="handleGetForm">获取form</Button>
    <Button @click="handleReset">reset</Button>
    <BasicForm
      :labelWidth="100"
      @register="registerForm"
      :actionColOptions="{ span: 24 }"
      @submit="handleSubmit"
    >
      <template #ApiModalSelect="{ model, field }">
        <ApiModalSelect
          v-model:value="model[field]"
          :fieldNames="{ label: 'a', value: 'id' }"
          @modal-confirm="handleModalChange"
        />
      </template>
    </BasicForm>
  </div>
</template>
<script lang="ts" setup>
import { BasicForm, FormSchema, useForm, ApiModalSelect } from '3h1-ui'
import { Button } from 'ant-design-vue'
import { useMessage } from '@shy-plugins/use'

const schemas: any = [
  {
    field: 'aa',
    label: '数字框',
    component: 'InputNumber',
    componentProps: {
      formatter: (value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      parser: (value) => value.replace(/\￥\s?|(,*)/g, ''),
      controls: false,
      min: 0,
      precision: 2
    }
  }
]
const { createMessage } = useMessage()
const [
  registerForm,
  { setFieldsValue, getFieldsValue, validate, updateSchema, resetFields }
] = useForm({
  schemas
})

const handleReset = () => {
  resetFields()
}

const handleSubmit = (values: any) => {
  createMessage.success('click search,values:' + JSON.stringify(values))
}

const handleGetForm = async () => {
  const values = await validate()

  console.log('values', values)
}

const handleModalChange = (rows) => {
  console.log('rows', rows)
}
</script>
