<template>
  <div class="m-4 flex flex-col gap-16px overflow-auto">
    <!-- <div class="flex gap-8px">
      <Button type="primary" @click="handleGetForm">获取form</Button>
      <Button @click="handleReset">reset</Button>
    </div> -->
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
  </div>
</template>
<script lang="ts" setup>
import { FormSchema, useShyForm, ApiModalSelect, ShyForm } from '3h1-ui'
import { Button } from 'ant-design-vue'
import { useMessage } from '@shy-plugins/use'
import { onMounted } from 'vue'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { theme } from 'ant-design-vue'

const { useToken } = theme
const { token } = useToken()

const schemas = ref<FormSchema[]>([
  {
    label: 'Input',
    field: 'Input',
    defaultValue: '111',
    component: 'Input',
    componentProps: {
      // disabled: true
    },
    colProps: { span: 8 }
  },
  {
    label: 'InputTextArea',
    field: 'InputTextArea',
    defaultValue: '111',
    component: 'InputTextArea',
    componentProps: {
      // disabled: true
    },
    colProps: { span: 8 }
  },
  {
    label: 'InputNumber',
    field: 'InputNumber',
    component: 'InputNumber',
    colProps: { span: 8 }
  },
  {
    label: 'InputPassword',
    field: 'InputPassword',
    component: 'InputPassword',
    colProps: { span: 8 }
  },
  {
    label: 'InputSearch',
    field: 'InputSearch',
    component: 'InputSearch',
    colProps: { span: 8 }
  },
  {
    label: 'AutoComplete',
    field: 'AutoComplete',
    component: 'AutoComplete',
    colProps: { span: 8 }
  },
  {
    label: 'ApiSelect',
    field: 'ApiSelect',
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
    label: 'Select',
    field: 'Select',
    required: true,
    component: 'Select',
    componentProps: ({ formModel }) => {
      return {
        options: [
          {
            label:
              'a11111111111111asKLHDSAKJDHSAJKDHSADJKHSADKJSAHDASJDHSADKJASHDKJASHDKJSAHDASKJHD',
            value: 'a'
          },
          {
            label: 'b',
            value: 'b'
          }
        ],
        params: { c: formModel.b }
      }
    },
    colProps: { span: 8 }
  },
  {
    label: 'ApiTree',
    field: 'ApiTree',
    component: 'ApiTree',
    componentProps: {
      api: () => {
        return [
          {
            title: '1111'
          }
        ]
      }
    },
    colProps: { span: 8 }
  },
  {
    label: 'TreeSelect',
    field: 'TreeSelect',
    component: 'TreeSelect',
    componentProps: {
      treeData: [
        {
          label: '111',
          value: '1'
        }
      ]
    },
    colProps: { span: 8 }
  },
  {
    label: 'ApiTreeSelect',
    field: 'ApiTreeSelect',
    component: 'ApiTreeSelect',
    componentProps: {
      api: () => {
        return [
          {
            label: '1',
            value: '1'
          }
        ]
      }
    },
    colProps: { span: 8 }
  },
  {
    label: 'ApiRadioGroup',
    field: 'ApiRadioGroup',
    component: 'ApiRadioGroup',
    componentProps: {
      api: () => {
        return [
          {
            label: '111',
            value: '888'
          },
          {
            label: '222',
            value: '333'
          }
        ]
      }
    },
    colProps: { span: 8 }
  },
  {
    label: 'Switch',
    field: 'Switch',
    component: 'Switch',
    colProps: { span: 8 }
  },
  {
    label: 'RadioButtonGroup',
    field: 'RadioButtonGroup',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        {
          label: '111',
          value: '888'
        },
        {
          label: '222',
          value: '333'
        }
      ]
    },
    colProps: { span: 8 }
  },
  {
    label: 'RadioGroup',
    field: 'RadioGroup',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '111',
          value: '888'
        },
        {
          label: '222',
          value: '333'
        }
      ]
    },
    colProps: { span: 8 }
  },
  {
    label: 'Checkbox',
    field: 'Checkbox',
    component: 'Checkbox',
    colProps: { span: 8 }
  },
  {
    label: 'CheckboxGroup',
    field: 'CheckboxGroup',
    component: 'CheckboxGroup',
    componentProps: {
      options: [
        {
          label: '111',
          value: '888'
        },
        {
          label: '222',
          value: '333'
        }
      ]
    },
    colProps: { span: 8 }
  },
  {
    label: 'ApiCascader',
    field: 'ApiCascader',
    component: 'ApiCascader',
    componentProps: {
      api: () => {
        return [
          {
            label: '111',
            value: '888'
          },
          {
            label: '222',
            value: '333'
          }
        ]
      }
    },
    colProps: { span: 8 }
  },
  {
    label: 'Cascader',
    field: 'Cascader',
    component: 'Cascader',
    componentProps: {
      options: [
        {
          label: '111',
          value: '888'
        },
        {
          label: '222',
          value: '333'
        }
      ]
    },
    colProps: { span: 8 }
  },
  {
    label: 'Slider',
    field: 'Slider',
    component: 'Slider',
    colProps: { span: 8 }
  },
  {
    label: 'Rate',
    field: 'Rate',
    component: 'Rate',
    colProps: { span: 8 }
  },
  {
    label: 'ApiTransfer',
    field: 'ApiTransfer',
    component: 'ApiTransfer',
    componentProps: {
      api: () => {
        return [
          {
            title: '1111',
            key: '888'
          },
          {
            title: '222',
            key: '333'
          }
        ]
      }
    },
    colProps: { span: 8 }
  },
  {
    label: 'Upload',
    field: 'Upload',
    component: 'Upload',
    componentProps: {
      api: () => {}
    },
    colProps: { span: 8 }
  },
  {
    label: 'DatePicker',
    field: 'DatePicker',
    component: 'DatePicker',
    colProps: { span: 8 }
  },
  {
    label: 'MonthPicker',
    field: 'MonthPicker',
    component: 'MonthPicker',
    colProps: { span: 8 }
  },
  {
    label: 'RangePicker',
    field: 'RangePicker',
    component: 'RangePicker',
    colProps: { span: 8 }
  },
  {
    label: 'WeekPicker',
    field: 'WeekPicker',
    component: 'WeekPicker',
    colProps: { span: 8 }
  },
  {
    label: 'TimePicker',
    field: 'TimePicker',
    component: 'TimePicker',
    colProps: { span: 8 }
  },
  {
    label: 'StrengthMeter',
    field: 'StrengthMeter',
    component: 'StrengthMeter',
    colProps: { span: 8 }
  },
  {
    label: 'IconPicker',
    field: 'IconPicker',
    component: 'IconPicker',
    colProps: { span: 8 }
  },
  {
    label: 'ColorPicker',
    field: 'ColorPicker',
    component: 'ColorPicker',
    componentProps: {
      onChange: (val) => {
        token.value.colorPrimary = val
      }
    },
    colProps: { span: 8 }
  },
  {
    label: 'Tinymce',
    field: 'Tinymce',
    component: 'Tinymce',
    colProps: { span: 24 }
  },
  {
    label: 'Table',
    field: 'Table',
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
