<template>
  <div class="p-16px w-full overflow-auto">
    <div class="flex gap-8px">
      <Button @click="handleGetForm">获取form</Button>
      <!-- <Button @click="handlePush">push200条数据</Button> -->
      <Button @click="handleReset">reset</Button>
    </div>
    <ShyForm
      :labelWidth="100"
      @register="registerForm"
      @submit="handleSubmit"
      @zzz="handleCustomFn"
    >
      <template #ApiModalSelect="{ model, field }">
        <ShyApiModalSelect
          v-model:value="model[field]"
          :fieldNames="{ label: 'a', value: 'id' }"
          @modal-confirm="handleModalChange"
        />
      </template>
    </ShyForm>
    <!-- <div class="h-2000px"></div> -->
  </div>
</template>
<script lang="tsx" setup>
import type { ShyFormSchema } from '3h1-ui'
import {
  useShyForm,
  ShyApiModalSelect,
  ShyForm,
  ShyTable,
  BasicButton
} from '3h1-ui'
import { Button } from 'ant-design-vue'
import { useMessage } from '@shy-plugins/use'
import { h, onMounted } from 'vue'
import { ref } from 'vue'
import { theme } from 'ant-design-vue'
import BasicTitle from './BasicTitle.vue'
import { commentProps } from 'ant-design-vue/es/comment'
import customComp from '../components/customComp'

const { useToken } = theme
const { token } = useToken()

const handleCustomFn = (...args) => {
  console.log(args)
}

// const handlePush = () => {
//   setFieldsValue({
//     faultDate: '2021-09-01',
//     // zzz: {
//     //   Table: Array.from({ length: 1 }, (_, i) => {
//     //     return {
//     //       a: 1,
//     //       b: 2,

//     //       c: 4,
//     //       d: ''
//     //     }
//     //   })
//     // },
//     Table: Array.from({ length: 1 }, (_, i) => {
//       return {
//         a: 1,
//         b: 2,

//         c: 4,
//         d: ''
//       }
//     })
//   })
// }
const bindCol = [
  {
    title: '产品编号',
    dataIndex: 'productCode',
    width: 100,
    type: 'text'
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    width: 100,
    type: 'text'
  },

  {
    title: '单位',
    dataIndex: 'unitName',
    width: 50,
    type: 'text'
  },
  {
    title: '金额',
    dataIndex: 'price',
    width: 100,
    type: 'text'
  },
  {
    title: '数量',
    dataIndex: 'storageNum',
    width: 60,
    type: 'text'
  },
  {
    title: '单价',
    dataIndex: 'unitPrice',
    width: 100,
    type: 'text'
  },
  {
    title: '规格型号',
    dataIndex: 'modelType',
    width: 100,
    type: 'text'
  }
]

const schemas = ref<ShyFormSchema[]>([
  {
    label: '111',
    field: 'group',
    helpMessage: () => (
      <ShyTable
        isShowHeader={false}
        canResize={false}
        isShowFooter={false}
        columns={[
          {
            title: '类型',
            dataIndex: 'a',
            width: 100,
            align: 'center'
          },
          {
            title: '一类',
            dataIndex: 'b',
            width: 100,
            align: 'center'
          },
          {
            title: '二类',
            dataIndex: 'c',
            width: 100,
            align: 'center'
          },
          {
            title: '三类',
            dataIndex: 'd',
            width: 100,
            align: 'center'
          },
          {
            title: '备注',
            dataIndex: 'e',
            ellipsis: false,
            width: 350,
            customCell: (_, index) => {
              if (!index) {
                return { rowSpan: 2, style: { 'white-space': 'pre-wrap' } }
              }
              return { rowSpan: 0 }
            }
          }
        ]}
        dataSource={[
          {
            a: '标准',
            b: '300/晚',
            c: '250/晚',
            d: '180/晚',
            e: `一类：北京、上海、广州、深圳；\n二类：省会城市及天津、重庆、大连、厦门、青岛、无锡、苏州；\n三类：其他城市、县城及乡镇。\n\n高层管理人员（副总及以上）不超以上标准的1.5倍。`
          },
          {
            a: '同性别同住',
            b: '350/晚',
            c: '280/晚',
            d: '200/晚',
            e: ''
          }
        ]}
      />
    ),
    helpComponentProps: {
      overlayInnerStyle: {
        width: '800px'
      },
      color: 'var(--theme)',
      placement: 'rightBottom'
    },
    component: 'Group',
    componentProps: {
      schemas: [
        {
          label: '777',
          field: 'c-group',
          component: 'Group',
          componentProps: {
            groupType: 'Custom',
            groupInObject: false,
            CustomGroupComp: defineComponent({
              setup(_, { slots }) {
                const parentEmit = inject('parentEmit')

                return () => (
                  <div>
                    {11111}
                    {slots?.extra?.(parentEmit)}
                    {222222}
                    {slots?.default?.()}
                  </div>
                )
              }
            }),
            // deconstructLevel: 1,
            slots: {
              extra: (emit) => (
                <div onClick={() => emit('zzz', 1111)}>extra</div>
              )
            },
            schemas: [
              {
                label: '999',
                field: 'c-input',
                component: 'Input',
                colProps: { span: 24 }
              }
            ]
          },
          colProps: { span: 24 }
        }
      ]
    },
    colProps: { span: 24 }
  },
  {
    label: '999',
    field: 'c-input',
    component: 'Input',
    colProps: { span: 24 }
  }
  // {/*  */
  //   label: 'Table',
  //   field: 'table',
  //   component: 'Table',
  //   componentProps: ({ formModel }) => {
  //     console.log('111', formModel)

  //     return {
  //       dynamicShowRemove: () => true,
  //       onChange: (...args) => {
  //         // console.log(args)
  //       },
  //       columns: [
  //         {
  //           title: 'input',
  //           dataIndex: 'zzz',
  //           width: 500
  //         },
  //         {
  //           title: 'input',
  //           dataIndex: 'zzz',
  //           type: 'Switch',
  //           componentProps: {
  //             checkedChildren: '开',
  //             unCheckedChildren: '关'
  //           }
  //         },
  //         {
  //           title: 'input',
  //           dataIndex: 'zzz'
  //         },
  //         {
  //           title: 'input',
  //           dataIndex: 'zzz'
  //         },

  //         {
  //           title: '税率',
  //           dataIndex: 'taxRate',
  //           type: 'Select',
  //           defaultValue: 0,
  //           componentProps: {
  //             options: [
  //               {
  //                 value: 0,
  //                 label: '0',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 1,
  //                 label: '1',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 3,
  //                 label: '3',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 6,
  //                 label: '6',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 9,
  //                 label: '9',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 11,
  //                 label: '11',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 13,
  //                 label: '13',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               }
  //             ]
  //           }
  //         }
  //       ]
  //     }
  //   },
  //   colProps: { span: 24 }
  // }
  // {
  //   label: '111',
  //   field: 'group',
  //   component: 'Group',
  //   componentProps: ({ formModel }) => {
  //     // console.log('group', formModel)
  //     return {
  //       schemas: [

  //       ]
  //     }
  //   },
  //   colProps: { span: 24 }
  // }
  // {
  //   label: 'Table',
  //   field: 'table',
  //   component: 'Table',
  //   componentProps: ({ formModel }) => {
  //     console.log('table', formModel)

  //     return {
  //       onChange: (...args) => {
  //         console.log(args)
  //       },
  //       columns: [
  //         {
  //           title: '税率',
  //           dataIndex: 'taxRate',
  //           type: 'Select',
  //           defaultValue: 0,
  //           componentProps: {
  //             options: [
  //               {
  //                 value: 0,
  //                 label: '0',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 1,
  //                 label: '1',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 3,
  //                 label: '3',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 6,
  //                 label: '6',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 9,
  //                 label: '9',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 11,
  //                 label: '11',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               },
  //               {
  //                 value: 13,
  //                 label: '13',
  //                 colorType: 'default',
  //                 cssClass: ''
  //               }
  //             ]
  //           }
  //         }
  //       ]
  //     }
  //   },
  //   colProps: { span: 24 }
  // }
])
const { createMessage } = useMessage()
const [
  registerForm,
  { setFieldsValue, getFieldsValue, validate, updateSchema, resetFields }
] = useShyForm({
  labelWidth: 200,
  schemas: schemas as any,
  // formLabelInInput: true,
  layout: 'vertical',
  baseColProps: { span: 8 },
  onFieldValueChange: (field, value) => {
    console.log('field', field, value)
  }
  // showActionButtonGroup: true
})

const handleReset = () => {
  resetFields()
}

onMounted(() => {
  setFieldsValue({
    // activeKey: { addPurchaseCost: { zzzzz: new Date().getTime() } },
    // addPurchaseCost: { projectSupplierSaveList: [{ a: '222' }] }
    'c-input': 8888
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
