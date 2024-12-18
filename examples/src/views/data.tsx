import { RouterLink } from 'vue-router'
import { get } from 'lodash-es'
import { ShyTable, BasicTitle, useShyTable, BasicButton } from '3h1-ui'
import { Collapse, Button } from 'ant-design-vue'
import dayjs from 'dayjs'
import { withModifiers, h } from 'vue'

export const CollapseComp = defineComponent({
  inheritAttrs: false,
  props: {
    label: String
  },
  emits: ['expand'],
  setup(props, { slots, emit }) {
    const parentEmit = inject('parentEmit')

    const activeKey = ref(['1'])

    watch(
      () => activeKey.value,
      (val) => {
        emit('expand', !!val.length)
      }
    )

    return () => (
      <Collapse
        class={`shy-basic-descriptions-group-collapse`}
        bordered={false}
        v-model:activeKey={activeKey.value}
      >
        <Collapse.Panel
          key="1"
          v-slots={{
            header: () => (
              <BasicTitle>
                {{
                  default: () => props.label,
                  extra: () => slots?.extra?.(parentEmit)
                }}
              </BasicTitle>
            )
          }}
        >
          {slots?.default?.()}
        </Collapse.Panel>
      </Collapse>
    )
  }
})

export const projectFn = ref(() => {})
export const infoSchemas = [
  {
    label: 'abc',
    field: 'abc',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'abc',
          value: '1'
        },
        {
          label: 'def',
          value: '2'
        }
      ]
    }
  },
  {
    label: '故障详细信息',
    field: 'field3',
    component: 'Group',
    colProps: {
      span: 24
    },
    componentProps: ({ formActionType }) => {
      return {
        groupType: 'Origin',
        groupInObject: false,
        schemas: [
          {
            label: '故障详细信息',
            field: 'leftGroup',
            component: 'Group',
            colProps: {
              span: 16
            },
            componentProps: {
              groupType: 'Divider',
              groupInObject: false,
              schemas: [
                {
                  label: 'zzzyy',
                  field: 'zzz',
                  component: 'ApiSelect',
                  colProps: {
                    span: 24
                  },
                  componentProps: {
                    api: async () => {
                      const list = await new Promise((resolve) => {
                        resolve([
                          {
                            label: 'zzz',
                            value: '1'
                          },
                          {
                            label: '999',
                            value: '2'
                          }
                        ])
                      })
                      return list
                    }
                  }
                },
                {
                  field: 'callbackIds',
                  label: '',
                  component: 'Input',
                  show: false
                },
                {
                  field: 'faultDetail',
                  label: '',
                  component: 'Input',
                  ifShow: ({ model }) => !model.isView,
                  render: ({ model }) => {
                    return h(
                      'div',
                      { class: 'flex justify-end w-full', style: 'gap:8px' },
                      [
                        h(
                          Button,
                          {
                            type: 'primary',
                            class: 'flex gap-5px items-center',
                            onClick: async () => {}
                          },
                          {
                            default: () => '智能识别'
                          }
                        ),
                        h(
                          Button,
                          {
                            class: 'flex gap-5px items-center',
                            type: 'primary',
                            onClick: async () => {}
                          },
                          {
                            default: () => '智能推荐'
                          }
                        )
                      ]
                    )
                  },
                  colProps: {
                    span: 24
                  }
                },
                {
                  field: 'faultPhenomenonDescription',
                  label: '故障现象描述',
                  component: 'InputTextArea',
                  colProps: {
                    span: 24
                  },

                  componentProps: {
                    rows: 4
                  }
                },
                {
                  field: 'faultReasonAnalyze',
                  label: '故障原因分析',
                  component: 'InputTextArea',
                  colProps: {
                    span: 24
                  },
                  render: ({ model, field }) => {
                    return 222
                  },
                  componentProps: {
                    rows: 4
                  }
                },
                {
                  field: 'faultRepairContent',
                  label: '故障维修内容',
                  component: 'InputTextArea',
                  colProps: {
                    span: 24
                  },
                  render: ({ model, field }) => {
                    return 222
                  },
                  componentProps: {
                    rows: 4
                  }
                },
                {
                  field: 'faultImproveStep',
                  label: '故障改进措施',
                  component: 'InputTextArea',
                  colProps: {
                    span: 24
                  }
                }
              ]
            }
          },
          {
            label: '',
            field: 'rightGroup',
            component: 'Group',
            colProps: {
              span: 8
            },
            ifShow: ({ model }) => !model.isView,
            componentProps: ({ formModel }) => {
              return {
                groupInObject: false,
                groupType: 'Origin',
                schemas: [
                  {
                    field: 'autoFill',
                    label: '',
                    component: 'Input',
                    colProps: {
                      span: 24
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
]

// export const infoSchemas = [
//   {
//     label: '基本信息',
//     field: '',
//     component: 'Group',
//     componentProps: {
//       groupType: 'Group',
//       schemas: [
//         {
//           label: '采购合同编号',
//           field: 'purchaseCode',
//           colProps: { span: 12 }
//         },
//         {
//           label: '类型',
//           field: 'contractTypeMsg',
//           colProps: { span: 12 }
//         },
//         {
//           label: '关联项目编号',
//           field: 'projectCode',

//           colProps: { span: 12 }
//         },
//         {
//           label: '关联项目名称',
//           field: 'projectName',
//           colProps: { span: 12 }
//         },
//         {
//           label: '申请人',
//           field: 'purchaseUserName',
//           colProps: { span: 12 }
//         },
//         {
//           label: '申请部门',
//           field: 'deptName',
//           colProps: { span: 12 }
//         },
//         {
//           label: '供应商名称',
//           field: 'supplyName',
//           colProps: { span: 12 }
//         },
//         {
//           label: '供应商联系人',
//           field: 'supplyContactsNameContent',
//           colProps: { span: 12 }
//         },
//         {
//           label: '付款方式',
//           field: 'paymentType',
//           colProps: { span: 24 }
//         },
//         {
//           label: '备注',
//           field: 'remark',
//           colProps: { span: 24 }
//         }
//       ]
//     },
//     colProps: { span: 24 }
//   },
//   {
//     label: '财务信息',
//     field: '',
//     component: 'Group',
//     componentProps: {
//       groupType: 'Custom',
//       CustomGroupComp: <div></div>,
//       schemas: [
//         {
//           label: '合同总金额',
//           field: 'purchaseAmount',
//           colProps: { span: 24 }
//         }
//       ]
//     },
//     colProps: { span: 24 }
//   },
//   {
//     label: '明细信息',
//     field: '',
//     component: 'Group',
//     componentProps: {
//       groupType: 'Group',
//       schemas: [
//         {
//           label: '',
//           field: 'productList',

//           colProps: { span: 24 }
//         }
//       ]
//     },
//     colProps: { span: 24 }
//   },
//   {
//     label: '出入库记录',
//     field: '',
//     component: 'Group',
//     componentProps: {
//       groupType: 'Group',
//       schemas: [
//         {
//           label: '',
//           field: 'stockTicketList',
//           colProps: { span: 24 }
//         }
//       ]
//     },
//     colProps: { span: 24 }
//   },
//   {
//     label: '合同附件',
//     field: '',
//     component: 'Group',
//     componentProps: {
//       groupType: 'Group',
//       schemas: [
//         {
//           label: '',
//           field: 'fileIds',
//           colProps: { span: 24 }
//         }
//       ]
//     },
//     colProps: { span: 24 }
//   }
// ]
