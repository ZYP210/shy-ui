<template>
  <div class="m-4">
    <Button @click="handleGetForm">获取form</Button>
    <Button @click="handleReset">reset</Button>
    <div class="h-500px"></div>

    <ShyForm
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
    </ShyForm>

    <div class="h-1000px"></div>
  </div>
</template>
<script lang="ts" setup>
import {
  BasicForm,
  FormSchema,
  useForm,
  useShyForm,
  TableChildren,
  ApiModalSelect,
  ShyForm,
  FromWrapper
} from '3h1-ui'
import { Button } from 'ant-design-vue'
import { useMessage } from '@shy-plugins/use'
import { onMounted } from 'vue'
import { ref, h } from 'vue'
import dayjs from 'dayjs'
import { Select } from 'ant-design-vue'
const a = ref('')

const timeRange = [dayjs(), dayjs()]

const tree = {
  api: () => {
    return new Promise((resolve) =>
      resolve([{ label: '1', value: '1', children: [] }])
    )
  }
}

const schemas = ref<FormSchema[]>([
  {
    label: 'a',
    field: 'a',
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: async (ppp) => {
          console.log(ppp)
          return [
            {
              label:
                'a11111111111111asKLHDSAKJDHSAJKDHSADJKHSADKJSAHDASJDHSADKJASHDKJASHDKJSAHDASKJHD',
              value: 'a'
            },
            {
              label: 'b',
              value: 'b'
            }
          ]
        },
        params: { c: formModel.b }
      }
    },
    colProps: { span: 8 }
  },
  {
    label: 'b',
    field: 'b',
    component: 'Divider',
    colProps: { span: 24 }
    // componentProps: ({ formModel }) => {
    //   console.log(formModel, 999)
    //   return {
    //     api: async (ppp) => {
    //       console.log(ppp, 222)
    //       if (ppp?.aaa) return [{ label: '777', value: '777' }]
    //       return []
    //     },
    //     params: { aaa: formModel.aaa }
    //   }
    // }
  },
  {
    label: 'b',
    field: 'b',
    component: 'Input',
    colProps: { span: 8 }
    // componentProps: ({ formModel }) => {
    //   console.log(formModel, 999)
    //   return {
    //     api: async (ppp) => {
    //       console.log(ppp, 222)
    //       if (ppp?.aaa) return [{ label: '777', value: '777' }]
    //       return []
    //     },
    //     params: { aaa: formModel.aaa }
    //   }
    // }
  },
  {
    label: 'b',
    field: 'b',
    component: 'Input',
    colProps: { span: 8 }
    // componentProps: ({ formModel }) => {
    //   console.log(formModel, 999)
    //   return {
    //     api: async (ppp) => {
    //       console.log(ppp, 222)
    //       if (ppp?.aaa) return [{ label: '777', value: '777' }]
    //       return []
    //     },
    //     params: { aaa: formModel.aaa }
    //   }
    // }
  },
  {
    label: '',
    field: 'table',
    component: 'Table',
    required: true,
    colProps: { span: 24 },
    componentProps: ({ formModel }) => {
      return {
        columns: [
          {
            title: '预计付款时间',
            dataIndex: 'expectPayTime',
            type: 'DatePicker',
            required: true,
            rules: [
              {
                required: true,
                validator: async (rule, value, { record }, formActionType) => {
                  if (!value) return Promise.reject('请选择预计付款时间')
                  if (value && !record.expectReturnTime) {
                    try {
                      const errIndex = formModel.table.findIndex(
                        (ele) => ele.uuid === record.uuid
                      )
                      console.log(errIndex, 'ppp', record.uuid)
                      await formActionType.validate([
                        ['table', errIndex, 'expectReturnTime']
                      ])
                    } catch (error) {}
                    return Promise.resolve()
                  }
                  if (dayjs(value).isBefore(record.expectReturnTime)) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject('付款时间不能大于回款时间')
                  }
                }
              }
            ],
            componentProps: {
              valueFormat: 'YYYY-MM-DD HH:mm:ss'
            }
          },
          {
            title: '预计回款时间',
            dataIndex: 'expectReturnTime',
            type: 'DatePicker',
            required: true,
            rules: [
              {
                required: true,
                validator: async (rule, value, { record }, formActionType) => {
                  console.log('zzz', record.uuid)
                  if (!value) return Promise.reject('请选择预计回款时间')
                  if (value && !record.expectPayTime) {
                    try {
                      const errIndex = formModel.table.findIndex(
                        (ele) => ele.uuid === record.uuid
                      )
                      console.log(errIndex, 'zzz', record.uuid)
                      await formActionType.validate([
                        ['table', errIndex, 'expectPayTime']
                      ])
                    } catch (error) {}
                    return Promise.resolve()
                  }
                  if (dayjs(value).isAfter(record.expectPayTime)) {
                    return Promise.resolve()
                  }
                  return Promise.reject('回款时间不能小于付款时间')
                }
              }
            ],
            componentProps: {
              valueFormat: 'YYYY-MM-DD HH:mm:ss'
            }
          },
          {
            title: 'c',
            dataIndex: 'c',
            type: 'InputNumber',
            required: true
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
    }
  }
])
const { createMessage } = useMessage()
const [
  registerForm,
  { setFieldsValue, getFieldsValue, validate, updateSchema, resetFields }
] = useShyForm({
  schemas: schemas as any
})

const handleReset = () => {
  resetFields()
}

onMounted(() => {
  setFieldsValue({
    b: 123
  })
  // setTimeout(() => {
  //   setFieldsValue({
  //     table: [{ a: 9, b: 10, c: 11 }],
  //     ApiSelect: '123'
  //   })
  // }, 5000)
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

const change = () => {
  updateSchema([
    // {
    //   field: 'a',
    //   defaultValue: '111',
    //   component: 'Select',
    //   componentProps: {
    //     disabled: true
    //   }
    // },
    // {
    //   field: 'b',
    //   defaultValue: '222',
    //   component: 'Select'
    // }
  ])
}

const handleSubmit = (values: any) => {
  createMessage.success('click search,values:' + JSON.stringify(values))
}

const handleGetForm = async () => {
  try {
    const values = await validate()

    console.log('values', values)
  } catch (error) {
    console.log(error)
  }
}

const handleModalChange = (rows) => {
  console.log('rows', rows)
}
</script>
