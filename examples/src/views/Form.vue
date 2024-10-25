<template>
  <div class="p-16px w-full overflow-auto">
    <div class="flex gap-8px">
      <Button @click="handleGetForm">获取form</Button>
      <!-- <Button @click="handlePush">push200条数据</Button> -->
      <Button @click="handleReset">reset</Button>
    </div>
    <ShyForm :labelWidth="100" @register="registerForm" @submit="handleSubmit">
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
<script lang="ts" setup>
import type { ShyFormSchema } from '3h1-ui'
import { useShyForm, ShyApiModalSelect, ShyForm, BasicButton } from '3h1-ui'
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
    label: '',
    field: 'activeKey',
    component: 'Group',
    defaultValue: '1',
    componentProps: ({ formModel }) => {
      return {
        groupType: 'Custom',
        CustomGroupComp: customComp,
        groupInObject: false,
        schemas: [
          {
            label: '',
            field: 'saleAmountChange',
            component: 'Group',
            componentProps: {
              groupType: 'Origin',
              schemas: [
                {
                  label: '原销售预测总金额(元)',
                  field: 'oldAmount',
                  component: 'InputNumber',
                  colProps: { span: 8 }
                },
                {
                  label: '变更后销售预测总金额(元)',
                  field: 'changeAmount',
                  component: 'InputNumber',
                  colProps: { span: 8 }
                },
                {
                  label: '销售清单',
                  field: 'projectSaleSaveList',
                  component: 'Table',
                  componentProps: {
                    columns: []
                  },
                  colProps: { span: 24 }
                },
                {
                  label: '变更说明',
                  field: 'changeExplain',
                  component: 'InputTextArea',
                  colProps: { span: 24 }
                }
              ]
            },
            colProps: { span: 24 }
          },
          {
            label: '是否追加采购成本',
            field: 'isAddPurchaseCost',
            defaultValue: 1,
            component: 'Switch',
            componentProps: {
              checkedChildren: '是',
              unCheckedChildren: '否',
              checkedValue: 1,
              unCheckedValue: 0
            },
            colProps: { span: 24 }
          },
          {
            label: '',
            field: 'addPurchaseCost',
            component: 'Group',
            componentProps: {
              groupType: 'Origin',
              schemas: [
                {
                  label: '原采购预测总金额(元)',
                  field: 'addBudgetAmount',
                  component: 'InputNumber',
                  colProps: { span: 8 }
                },
                {
                  label: '追加后采购预测总金额(元)',
                  field: 'addResultAmount',
                  component: 'InputNumber',
                  colProps: { span: 8 }
                },
                {
                  label: '采购清单',
                  field: 'projectSupplierSaveList',
                  component: 'Table',
                  componentProps: ({ formModel }) => {
                    console.log(formModel)
                    return {
                      columns: [
                        {
                          title: '111',
                          dataIndex: 'a'
                        }
                      ]
                    }
                  },
                  colProps: { span: 24 }
                },
                {
                  label: '追加说明',
                  field: 'addExplain',
                  component: 'InputTextArea',
                  colProps: { span: 24 }
                },
                {
                  label: '追加说明',
                  field: 'zzzzz',
                  component: 'DatePicker',
                  componentProps: {
                    valueFormat: 'YYYY-MM-DD'
                  },
                  colProps: { span: 24 }
                }
              ]
            },
            colProps: { span: 24 }
          }
        ]
      }
    },
    colProps: { span: 24 }
  }
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
    // console.log('field', field, value)
  }
  // showActionButtonGroup: true
})

const handleReset = () => {
  resetFields()
}

onMounted(() => {
  setFieldsValue({
    // activeKey: { addPurchaseCost: { zzzzz: new Date().getTime() } },
    addPurchaseCost: { projectSupplierSaveList: [{ a: '222' }] }
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
