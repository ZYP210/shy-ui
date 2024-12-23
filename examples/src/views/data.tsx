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
    label: '基本信息',
    field: 'sss',
    component: 'Divider'
  },
  {
    label: '标注内容设置',
    field: 'field2',
    component: 'Group',
    colProps: {
      span: 24
    },
    componentProps: ({ formModel }) => {
      return {
        extra: () => (
          <div class="text-[#bfbfbf] text-12px">
            注意添加标注内容即添加本次任务需要识别的文本对象，支持标注多个实体或关系对象。
          </div>
        ),
        groupType: 'Divider',
        groupInObject: false,
        schemas: [
          {
            field: 'tableTitle',
            label: '',
            component: 'Input',
            colProps: {
              span: 24
            },
            render: () => {
              return (
                <div class="w-full flex justify-between items-center px-10px">
                  <div>数据预览</div>
                  <div class="text-[var(--primary-color)]">
                    共计{formModel?.labelSaveDTOList?.length || 0}条数据
                  </div>
                </div>
              )
            }
          },
          {
            field: 'labelSaveDTOList',
            label: '',
            component: 'Table',
            ifShow: formModel.taskType == 2,
            colProps: {
              span: 24
            },
            componentProps: {
              isShowAddBtn: formModel?.taskType == 1,
              isShowAction: formModel?.taskType == 1,

              columns: [
                {
                  title: '标注内容',
                  dataIndex: 'labelTarget',
                  align: 'center',
                  width: 400
                },
                {
                  title: '颜色设置',
                  dataIndex: 'labelColor',
                  type: 'ColorPicker',
                  align: 'center',
                  width: 75
                },
                {
                  title: '',
                  dataIndex: ' ',
                  type: 'text',
                  customRender: () => {
                    return ' '
                  }
                }
              ]
            }
          },

          {
            field: 'labelSaveDTOList',
            label: '',
            component: 'Table',
            ifShow: formModel.taskType == 1,
            colProps: {
              span: 24
            },
            componentProps: {
              isShowAddBtn: formModel.taskType == 1,
              isShowAction: formModel.taskType == 1,
              columns: [
                {
                  title: '目标类型',
                  dataIndex: 'targetType',
                  align: 'center',
                  width: 400,
                  type: 'select',
                  componentProps: {}
                },
                {
                  title: '标注内容',
                  dataIndex: 'labelTarget',
                  align: 'center',
                  width: 400,
                  type: 'ApiSelect',
                  componentProps: ({ record }) => {
                    return {
                      onChange: (_, options) => {
                        if (!options) return
                        record.noumenonId = options.id
                      },
                      params: {
                        targetType: record.targetType
                      },
                      fieldNames: {
                        value: 'name',
                        label: 'name'
                      },
                      api: async (params) => {
                        if (!params?.targetType) return []
                      }
                    }
                  }
                },
                {
                  title: '颜色设置',
                  dataIndex: 'labelColor',
                  type: 'ColorPicker',
                  align: 'center',
                  width: 75,
                  defaultValue: '#2991FF'
                },
                {
                  title: '',
                  dataIndex: ' ',
                  type: 'text',
                  customRender: () => {
                    return ' '
                  }
                }
              ]
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
