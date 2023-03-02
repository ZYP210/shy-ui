<template>
  <div class="m-4">
    <Button @click="handleGetForm">获取form</Button>
    <BasicForm
      :labelWidth="100"
      @register="registerForm"
      :actionColOptions="{ span: 24 }"
      @submit="handleSubmit"
    >
      <template #ApiModalSelect="{ model, field }">
        <ApiModalSelect v-model:value="model[field]" />
      </template>
    </BasicForm>
  </div>
</template>
<script lang="ts" setup>
import {
  BasicForm,
  FormSchema,
  useForm,
  TableChildren,
  ApiModalSelect
} from '3h1-ui'
import { Button } from 'ant-design-vue'
import { useMessage } from '@shy-plugins/use'
import { onMounted } from 'vue'
import { ref } from 'vue'

const tree = {
  api: () => {
    return new Promise((resolve) =>
      resolve([{ label: '1', value: '1', children: [] }])
    )
  }
}

const schemas: FormSchema[] = [
  // {
  //   field: 'field',
  //   component: 'Input',
  //   label: '字段1',
  //   colProps: {
  //     span: 8
  //   },
  //   defaultValue: '1',
  //   componentProps: {
  //     placeholder: '自定义placeholder',
  //     onChange: (e) => {
  //       console.log(e)
  //     }
  //   }
  // },
  // {
  //   field: 'table',
  //   label: 'table',
  //   component: 'Table',
  //   componentProps: {
  //     columns: [
  //       {
  //         title: 'a',
  //         dataIndex: 'a'
  //       },
  //       {
  //         title: 'b',
  //         dataIndex: 'b'
  //       },
  //       {
  //         title: 'c',
  //         dataIndex: 'c'
  //       },
  //       {
  //         title: 'd',
  //         dataIndex: 'd'
  //       },
  //       {
  //         title: 'e',
  //         dataIndex: 'e'
  //       }
  //     ]
  //   }
  // },
  {
    field: 'c',
    label: '选择弹框',
    component: 'Input',
    slot: 'ApiModalSelect'
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
