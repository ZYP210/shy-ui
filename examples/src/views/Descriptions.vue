<template>
  <div class="p-16px">
    <ShyDescriptions size="middle" @register="register"> </ShyDescriptions>
  </div>
</template>
<script lang="tsx" setup>
import { ShyDescriptions, useShyDescriptions } from '3h1-ui'
import BasicTitle from './BasicTitle.vue'
import { h, render } from 'vue'
import { colProps } from 'ant-design-vue/es/grid/Col'
import { commentProps } from 'ant-design-vue/es/comment'
import { formSchema } from './data'
const mockData: any = {
  isView: true,
  taskType: '1',
  modelCode: 'TP001',
  faultDiscoveryProcess: 2,
  remittanceForm: 555
}

const descriptions = [
  {
    label: '用款信息',
    field: 'useFundInfo',
    component: 'Group',
    colProps: { span: 24 },
    componentProps: {
      groupType: 'Divider',
      groupInObject: false,
      schemas: [
        {
          label: '汇款形式',
          field: 'remittanceForm',
          colProps: { span: 24 },
          render: ({ transformValue, schema }) => (
            <h1>{transformValue(schema)}</h1>
          )
        },
        {
          label: 'offline',
          field: 'offline',
          component: 'Group',
          ifShow: ({ values }) => false,
          colProps: { span: 24 },
          componentProps: {
            groupType: 'Origin',
            groupInObject: false,
            schemas: [
              {
                label: '金额小写',
                field: 'amountSmall',
                component: 'InputNumber',
                colProps: { span: 12 }
              },
              {
                label: '金额大写',
                field: 'amountBig',
                component: 'Input',
                colProps: { span: 12 },
                componentProps: {
                  disabled: true
                }
              }
            ]
          }
        },
        {
          label: 'online',
          field: 'online',
          component: 'Group',
          ifShow: ({ values }) => true,
          colProps: { span: 24 },
          componentProps: {
            groupType: 'Origin',
            groupInObject: false,
            schemas: [
              {
                label: '收款人',
                field: 'payee',
                component: 'Select',
                required: true,
                colProps: { span: 12 }
              },
              {
                label: '银行',
                field: 'bankName',
                component: 'Input',
                colProps: { span: 12 }
              },
              {
                label: '账户',
                field: 'account',
                component: 'ApiSelect',
                required: true,
                colProps: { span: 12 },
                componentProps: ({ formModel }) => {
                  return {
                    params: {
                      bankName: formModel?.bankName,
                      name: formModel?.payee
                    },
                    api: (params) => {
                      if (!params?.bankName) return []
                    }
                  }
                }
              },
              {
                label: '汇款方式',
                field: 'remittanceMethod',
                component: 'Select',
                required: true,
                colProps: { span: 12 },
                componentProps: {
                  getPopupContainer: () => document.body
                }
              },
              {
                label: '金额小写',
                field: 'amountSmall',
                component: 'InputNumber',
                colProps: { span: 12 }
              },
              {
                label: '金额大写',
                field: 'amountBig',
                component: 'Input',
                colProps: { span: 12 },
                componentProps: {
                  disabled: true
                }
              },
              {
                label: '汇款事由',
                field: 'remittanceInfo',
                component: 'InputTextArea',
                colProps: { span: 24 }
              },
              {
                label: '备注',
                field: 'remark',
                component: 'InputTextArea',
                colProps: { span: 24 }
              }
            ]
          }
        },
        {
          label: '附件',
          field: 'fileIds',
          component: 'Input',
          colProps: { span: 24 }
        }
      ]
    }
  }
]

const handleCustomFn = () => {
  console.log(111)
}

const [register, { setDescProps }] = useShyDescriptions({
  schemas: descriptions,
  isShowColon: true,
  bordered: true
})
onMounted(() => {
  setDescProps({ data: mockData, labelWidth: 110 })
})
</script>
