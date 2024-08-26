<template>
  <div class="p-16px w-full h-2000px overflow-auto">
    <div class="flex gap-8px">
      <Button @click="handleGetForm">获取form</Button>
      <Button @click="handlePush">push200条数据</Button>
      <Button @click="handleReset">reset</Button>
    </div>
    <ShyForm :labelWidth="100" @register="registerForm" @submit="handleSubmit">
      <template #ApiModalSelect="{ model, field }">
        <ApiModalSelect
          v-model:value="model[field]"
          :fieldNames="{ label: 'a', value: 'id' }"
          @modal-confirm="handleModalChange"
        />
      </template>
    </ShyForm>
    <!-- <div class="h-2000px"></div> -->
  </div>
</template>
<script lang="ts" setup>
import type { ShyFormSchema } from '3h1-ui'
import { useShyForm, ApiModalSelect, ShyForm, BasicButton } from '3h1-ui'
import { Button } from 'ant-design-vue'
import { useMessage } from '@shy-plugins/use'
import { h, onMounted } from 'vue'
import { ref } from 'vue'
import { theme } from 'ant-design-vue'

const { useToken } = theme
const { token } = useToken()

const handlePush = () => {
  setFieldsValue({
    // zzz: {
    //   Table: Array.from({ length: 1 }, (_, i) => {
    //     return {
    //       a: 1,
    //       b: 2,

    //       c: 4,
    //       d: ''
    //     }
    //   })
    // },
    Table: Array.from({ length: 1 }, (_, i) => {
      return {
        a: 1,
        b: 2,

        c: 4,
        d: ''
      }
    })
  })
}

const schemas = ref<ShyFormSchema[]>([
  {
    label: '',
    field: 'initTicketList',
    component: 'Input',
    // defaultValue: [],
    show: false
  },
  {
    label: '分组表单',
    field: 'zzz',
    component: 'Group',
    componentProps: ({ formModel }) => {
      return {
        groupInObject: false,
        groupType: 'Divider',
        extra: () => h('div', { class: 'flex-1' }, 111),
        expandIconPosition: 'end',
        schemas: [
          {
            field: 'Table',
            component: 'Table',
            required: true,
            colProps: { span: 24 },
            componentProps: ({ formModel }) => {
              return {
                rowSelection: {
                  type: 'checkbox',
                  onChange: (selectedRowKeys, selectedRows) => {
                    console.log(selectedRowKeys, selectedRows)
                  }
                },
                useRef: (compRef) => {},
                columns: [
                  {
                    title: 'zzzz',
                    dataIndex: 'a',
                    defaultValue: 111
                  },
                  {
                    title: 'zzzz',
                    dataIndex: 'a',
                    defaultValue: 111
                  },
                  {
                    title: 'zzzz',
                    dataIndex: 'a',
                    defaultValue: 111
                  },
                  {
                    title: 'zzzz',
                    dataIndex: 'a',
                    defaultValue: 111
                  },
                  {
                    title: 'zzzzz',
                    dataIndex: 'b',
                    type: 'text'
                  },
                  {
                    title: 'zzzzzz',
                    dataIndex: 'c',
                    type: 'text'
                  },
                  {
                    title: 'zzzzzz',
                    dataIndex: 'c',
                    type: 'text'
                  },
                  {
                    title: 'zzzzzz',
                    dataIndex: 'c',
                    type: 'text'
                  },
                  {
                    title: 'zzzzzz',
                    dataIndex: 'c',
                    type: 'text'
                  },
                  {
                    title: 'zzzzzz',
                    dataIndex: 'c',
                    type: 'text'
                  },
                  {
                    title: 'zzzzzz',
                    dataIndex: 'c',
                    type: 'text'
                  }
                  // {
                  //   title: '手机号',
                  //   dataIndex: 'contactsPhone',
                  //   required: true,
                  //   type: 'DatePicker'
                  //   // rules: [
                  //   //   {
                  //   //     pattern: /^1[3-9]\d{9}$/,
                  //   //     message: '请输入正确的手机号码',
                  //   //     trigger: 'blur'
                  //   //   }
                  //   // ]
                  // }
                ]
              }
            }
          }
        ]
      }
    },
    colProps: { span: 24 }
  }
  // {
  //   label: 'Input',
  //   field: 'Input',
  //   defaultValue: '111',
  //   component: 'Input',
  //   componentProps: {
  //     // disabled: true
  //   }
  // },
  // {
  //   label: 'InputTextArea',
  //   field: 'InputTextArea',
  //   defaultValue: '111',
  //   component: 'InputTextArea',
  //   componentProps: {
  //     // disabled: true
  //   }
  // },
  // {
  //   label: 'InputNumber',
  //   field: 'InputNumber',
  //   component: 'InputNumber'
  // },
  // {
  //   label: 'InputPassword',
  //   field: 'InputPassword',
  //   component: 'InputPassword'
  // },
  // {
  //   label: 'InputSearch',
  //   field: 'InputSearch',
  //   component: 'InputSearch'
  // },
  // {
  //   label: 'AutoComplete',
  //   field: 'AutoComplete',
  //   component: 'AutoComplete'
  // },
  // {
  //   label: 'ApiSelect',
  //   field: 'ApiSelect',
  //   required: true,
  //   component: 'ApiSelect',
  //   componentProps: ({ formModel }) => {
  //     return {
  //       api: async (ppp) => {
  //         return [
  //           {
  //             label:
  //               'a11111111111111asKLHDSAKJDHSAJKDHSADJKHSADKJSAHDASJDHSADKJASHDKJASHDKJSAHDASKJHD',
  //             value: 'a'
  //           },
  //           {
  //             label: 'b',
  //             value: 'b'
  //           }
  //         ]
  //       },
  //       params: { c: formModel.b }
  //     }
  //   }
  // },
  // {
  //   label: 'ApiTree',
  //   field: 'ApiTree',
  //   component: 'ApiTree',
  //   componentProps: {
  //     api: () => {
  //       return [
  //         {
  //           title: '1111'
  //         }
  //       ]
  //     }
  //   }
  // },
  // {
  //   label: 'TreeSelect',
  //   field: 'TreeSelect',
  //   component: 'TreeSelect',
  //   componentProps: {
  //     treeData: [
  //       {
  //         label: '111',
  //         value: '1'
  //       }
  //     ]
  //   }
  // },
  // {
  //   label: 'ApiTreeSelect',
  //   field: 'ApiTreeSelect',
  //   component: 'ApiTreeSelect',
  //   componentProps: {
  //     api: () => {
  //       return [
  //         {
  //           label: '1',
  //           value: '1'
  //         }
  //       ]
  //     }
  //   }
  // },
  // {
  //   label: 'ApiRadioGroup',
  //   field: 'ApiRadioGroup',
  //   component: 'ApiRadioGroup',
  //   componentProps: {
  //     api: () => {
  //       return [
  //         {
  //           label: '111',
  //           value: '888'
  //         },
  //         {
  //           label: '222',
  //           value: '333'
  //         }
  //       ]
  //     }
  //   }
  // },
  // {
  //   label: 'Switch',
  //   field: 'Switch',
  //   component: 'Switch'
  // },
  // {
  //   label: 'RadioButtonGroup',
  //   field: 'RadioButtonGroup',
  //   component: 'RadioButtonGroup',
  //   componentProps: {
  //     options: [
  //       {
  //         label: '111',
  //         value: '888'
  //       },
  //       {
  //         label: '222',
  //         value: '333'
  //       }
  //     ]
  //   }
  // },
  // {
  //   label: 'RadioGroup',
  //   field: 'RadioGroup',
  //   component: 'RadioGroup',
  //   componentProps: {
  //     options: [
  //       {
  //         label: '111',
  //         value: '888'
  //       },
  //       {
  //         label: '222',
  //         value: '333'
  //       }
  //     ]
  //   }
  // },
  // {
  //   label: 'Checkbox',
  //   field: 'Checkbox',
  //   component: 'Checkbox'
  // },
  // {
  //   label: 'CheckboxGroup',
  //   field: 'CheckboxGroup',
  //   component: 'CheckboxGroup',
  //   componentProps: {
  //     options: [
  //       {
  //         label: '111',
  //         value: '888'
  //       },
  //       {
  //         label: '222',
  //         value: '333'
  //       }
  //     ]
  //   }
  // },
  // {
  //   label: 'ApiCascader',
  //   field: 'ApiCascader',
  //   component: 'ApiCascader',
  //   componentProps: {
  //     api: () => {
  //       return [
  //         {
  //           label: '111',
  //           value: '888'
  //         },
  //         {
  //           label: '222',
  //           value: '333'
  //         }
  //       ]
  //     }
  //   }
  // },
  // {
  //   label: 'Cascader',
  //   field: 'Cascader',
  //   component: 'Cascader',
  //   componentProps: {
  //     options: [
  //       {
  //         label: '111',
  //         value: '888'
  //       },
  //       {
  //         label: '222',
  //         value: '333'
  //       }
  //     ]
  //   }
  // },
  // {
  //   label: 'Slider',
  //   field: 'Slider',
  //   component: 'Slider'
  // },
  // {
  //   label: 'Rate',
  //   field: 'Rate',
  //   component: 'Rate'
  // },
  // {
  //   label: 'ApiTransfer',
  //   field: 'ApiTransfer',
  //   component: 'ApiTransfer',
  //   componentProps: {
  //     api: () => {
  //       return [
  //         {
  //           title: '1111',
  //           key: '888'
  //         },
  //         {
  //           title: '222',
  //           key: '333'
  //         }
  //       ]
  //     }
  //   }
  // },
  // {
  //   label: 'Upload',
  //   field: 'Upload',
  //   component: 'Upload',
  //   componentProps: {
  //     api: () => {}
  //   }
  // },
  // {
  //   label: 'DatePicker',
  //   field: 'DatePicker',
  //   component: 'DatePicker',
  //   componentProps: {
  //     picker: 'month'
  //   }
  // },
  // {
  //   label: 'MonthPicker',
  //   field: 'MonthPicker',
  //   component: 'MonthPicker'
  // },
  // {
  //   label: 'RangePicker',
  //   field: 'RangePicker',
  //   component: 'RangePicker',
  //   componentProps: {
  //     picker: 'month'
  //   }
  // },
  // {
  //   label: 'WeekPicker',
  //   field: 'WeekPicker',
  //   component: 'WeekPicker'
  // },
  // {
  //   label: 'TimePicker',
  //   field: 'TimePicker',
  //   component: 'TimePicker'
  // },
  // {
  //   label: 'StrengthMeter',
  //   field: 'StrengthMeter',
  //   component: 'StrengthMeter'
  // },
  // {
  //   label: 'IconPicker',
  //   field: 'IconPicker',
  //   component: 'IconPicker'
  // },
  // {
  //   label: 'ColorPicker',
  //   field: 'ColorPicker',
  //   component: 'ColorPicker',
  //   componentProps: {
  //     onChange: (val) => {
  //       token.value.colorPrimary = val
  //     }
  //   }
  // },
  // {
  //   label: 'Tinymce',
  //   field: 'Tinymce',
  //   component: 'Tinymce',
  //   colProps: { span: 24 }
  // },
  // {
  //   label: '111',
  //   field: '',
  //   component: 'Divider',
  //   componentProps: {
  //     extra: h(BasicButton, null, 1111)
  //   },
  //   colProps: { span: 24 }
  // },
  // {
  //   label: '111',
  //   field: 'ddd',
  //   required: true,
  //   component: 'Input'
  // },
  // {
  //   label: 'Table',
  //   field: 'Table',
  //   component: 'Table',
  //   ifShow: ({ values }) => values.ddd === '111',
  //   required: true,
  //   colProps: { span: 24 },
  //   componentProps: ({ formModel }) => {
  //     return {
  //       columns: [
  //         {
  //           title: '手机号',
  //           dataIndex: 'contactsPhone',
  //           required: true,
  //           rules: [
  //             {
  //               pattern: /^1[3-9]\d{9}$/,
  //               message: '请输入正确的手机号码',
  //               trigger: 'blur'
  //             }
  //           ]
  //         }
  //       ],
  //       footerRender: () => [
  //         h('span', null, `不含税金额: 1`),
  //         h('span', null, `税额: 1`),
  //         h('span', null, `含税总价: 1`)
  //       ]
  //     }
  //   }
  // }
])
const { createMessage } = useMessage()
const [
  registerForm,
  { setFieldsValue, getFieldsValue, validate, updateSchema, resetFields }
] = useShyForm({
  schemas: schemas as any,
  formLabelInInput: true,
  layout: 'horizontal',
  baseColProps: { span: 8 }
  // showActionButtonGroup: true
})

const handleReset = () => {
  resetFields()
}

onMounted(() => {
  setFieldsValue({
    Table: [{ c: 1, d: 2, e: 3 }]
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
