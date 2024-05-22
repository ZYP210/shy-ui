<template>
  <div>
    <BasicModal
      cancel-text="取消"
      ok-text="确定"
      :loading="false"
      :visible="true"
      title="人物选择器"
      :maskClosable="false"
    >
      <!-- <div class="h-1000px bg-pink-100"></div> -->
      <!-- <ShyTable @register="register"> </ShyTable> -->
      <!-- <ShyForm @register="registerForm" /> -->
      <Description size="middle" title="基础示例" @register="registerDescription">
        <template #phoneValue>
          <div class="w-full h-300px">
            <ShyTable @register="registerTable" />
          </div>
        </template>
      </Description>
    </BasicModal>
  </div>
</template>

<script setup lang="ts">
import {
  useModal,
  BasicModal,
  ShyTable,
  useShyTable,
  ShyTableAction,
  BasicButton,
  ShyForm,
  useShyForm,
  Description,
  useDescription
} from '3h1-ui'

const modal = useModal()

const columns: any[] = [
  {
    title: '状态',
    dataIndex: 'status'
  }
]

const [register] = useShyTable({
  isShowTitle: false,
  api: ({ current, size }): any => {
    // console.log(params)
    return {
      records: Array.from({ length: 1 }, (_, i) => {
        return {
          id: i,
          status: i,
          rangePlace: i,
          place: '河北',
          createTime: 1695024076000,
          name: 'zzz',
          phone: '1212121',
          address: '1111',
          remark: 999,
          qualifiedNum: 100000.11111111
        }
      }),
      total: 100
    }
  },
  onColumnsChange: (data) => {
    console.log(data)
  },
  onColumnsReset: () => {
    console.log('columns-reset')
  },
  resizable: true,
  rowKey: 'id',
  columns,
  isSortFetch: false,
  useSearchForm: true,
  formConfig: {
    schemas: [
      {
        label: '日期范围',
        component: 'RangePicker',
        field: 'createTime',
        colProps: { span: 6 }
      }
    ]
  },
  showTableSetting: true,
  rowSelection: {},
  clickToRowSelect: false,
  actionColumn: {
    dataIndex: 'action',
    title: '操作',
    fixed: 'right'
  },
  showIndexColumn: true
})

const schemas = [
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
]

const schema: any[] = [
  {
    field: 'username',
    label: '测试',
    colProps: { span: 8 },
    isCopy: true
  },
  {
    field: 'summary',
    label: '合计',
    colProps: { span: 8 }
  },
  {
    field: 'summary1',
    label: '合计1',
    colProps: { span: 8 }
  },
  // {
  //   field: 'nickName',
  //   label: '昵称',
  //   colProps: { span: 16 },
  //   isCopy: false,
  //   customRender: (data) => {
  //     return h(Tag, { color: 'success' }, data.phone)
  //   },
  //   ifShow: (data) => {
  //     console.log(data)
  //     return !!data.nickName
  //   }
  // },
  {
    field: 'phone',
    label: '联系电话',
    colProps: { span: 24 },
    helpMessage: '这是一个'
  },
  // {
  //   field: 'email',
  //   label: '邮箱',
  //   colProps: { span: 8 }
  // },

  {
    field: 'addr',
    label: '地址',
    colProps: { span: 24 }
  }
]

const [
  registerForm,
  { setFieldsValue, getFieldsValue, validate, updateSchema, resetFields }
] = useShyForm({
  schemas: schemas as any
})

const [registerDescription, { setDescProps }] = useDescription({
  // data: mockData,
  labelWidth: 100,
  bordered: true,
  schema,
  summaryTotalFields: ['summary', 'summary1']
  // mode: 'vertical'
})

const [registerTable] = useShyTable({
  dataSource: [{}],
  columns: [
    {
      title: '测试',
      dataIndex: 'test'
    }
  ],
  isShowFooter: false,
  showIndexColumn: true,
  showTableSetting: false
})
</script>

<!-- <style scoped></style> -->
