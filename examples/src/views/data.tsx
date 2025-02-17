import { RouterLink } from 'vue-router'
import { get } from 'lodash-es'
import { ShyTable, BasicTitle, useShyTable, BasicButton } from '3h1-ui'
import { Collapse, Button } from 'ant-design-vue'
import dayjs from 'dayjs'
import { withModifiers, h } from 'vue'
import { ShyColumn, FormSchema, ShyTableAction } from '3h1-ui'

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
const schemas = ref<any>([])
const [registerTable, {}] = useShyTable({
  useSearchForm: true,
  formConfig: {
    labelWidth: 70,
    schemas: schemas
  }
})
export const formSchema: FormSchema[] = [
  {
    field: 'form',
    label: '',
    component: 'Group',
    colProps: {
      span: 24
    },
    componentProps: {
      groupType: 'Origin',
      groupInObject: false,
      schemas: [
        {
          field: 'form-left',
          label: '',
          component: 'Group',
          colProps: {
            span: 10
          },
          componentProps: () => {
            return {
              groupType: 'Origin',
              groupInObject: false,
              schemas: [
                {
                  label: '任务基本信息',
                  field: 'field1',
                  component: 'Group',
                  colProps: {
                    span: 24
                  },
                  componentProps: ({ formModel }) => {
                    return {
                      groupType: 'Divider',
                      groupInObject: false,
                      schemas: [
                        {
                          field: 'taskName',
                          label: '任务名称',
                          component: 'Input',
                          required: true,
                          colProps: {
                            span: 24
                          }
                        },
                        {
                          field: 'taskType',
                          label: '任务类型',
                          component: 'Select',
                          colProps: {
                            span: 24
                          },
                          componentProps: {
                            disabled: true
                          }
                        },
                        {
                          field: 'taskDirectory',
                          label: '任务目录',
                          component: 'Input',
                          defaultValue: '数据资产管理',
                          colProps: {
                            span: 24
                          },
                          componentProps: {
                            disabled: true
                          }
                        },
                        {
                          field: 'labelMode',
                          label: '标注模式',
                          required: true,
                          component: 'Select',
                          colProps: {
                            span: 24
                          },
                          componentProps: ({ formModel }) => {
                            return {
                              onChange() {
                                formModel.labelUser = undefined
                                formModel.labelOwner = undefined
                              }
                            }
                          }
                        },
                        {
                          field: 'labelUserSearchVal',
                          label: '',
                          component: 'Input',
                          show: false
                        },
                        {
                          field: 'labelUser',
                          label: '标注人员',
                          required: true,
                          component: 'ApiSelect',
                          colProps: {
                            span: 24
                          },
                          ifShow: ({ model }) => !model?.isView,
                          componentProps: ({ formModel }) => {
                            return {
                              filterOption: false,
                              getPopupContainer: () => document.body,
                              mode:
                                formModel?.labelMode == 2
                                  ? 'multiple'
                                  : undefined,
                              onChange(e) {
                                if (formModel?.labelMode == 1) {
                                  formModel.labelOwner = e
                                } else {
                                  formModel?.labelOwner &&
                                    (formModel.labelOwner = undefined)
                                }
                              },
                              params: {
                                keyWord: formModel?.labelUserSearchVal
                              },
                              onSearch: (value) => {
                                formModel.labelUserSearchVal = value
                              },
                              [!!formModel?.isView ? 'fieldNames' : '']: {
                                value: 'id',
                                label: 'nickname'
                              },
                              labelField: 'nickname',
                              valueField: 'id'
                            }
                          }
                        },

                        {
                          field: 'labelUserNames',
                          label: '标注人员',
                          required: true,
                          component: 'Input',
                          colProps: {
                            span: 24
                          },
                          ifShow: ({ model }) => !!model?.isView
                        },
                        {
                          field: 'labelOwnerSearchVal',
                          label: '',
                          component: 'Input',
                          show: false
                        },
                        {
                          field: 'labelOwner',
                          label: '标注负责人',
                          required: true,
                          component: 'ApiSelect',
                          dynamicDisabled: ({ values }) =>
                            values?.labelMode == 1,
                          colProps: {
                            span: 24
                          },
                          componentProps: {
                            filterOption: false,
                            getPopupContainer: () => document.body,
                            params: {
                              keyWord: formModel?.labelOwnerSearchVal,
                              labelUser: formModel?.labelUser
                            },
                            onSearch: (value) => {
                              formModel.labelOwnerSearchVal = value
                            },
                            [!!formModel?.isView ? 'fieldNames' : '']: {
                              value: 'id',
                              label: 'nickname'
                            },
                            labelField: 'nickname',
                            valueField: 'id'
                          }
                        },
                        {
                          field: 'deadline',
                          label: '截止时间',
                          component: 'DatePicker',
                          componentProps: {
                            style: { width: '100%' },
                            valueFormat: 'YYYY-MM-DD HH:mm:ss'
                          },
                          colProps: {
                            span: 24
                          }
                        },
                        {
                          field: 'isAiLabel',
                          label: '是否开启AI标注',
                          component: 'Switch',
                          colProps: {
                            span: 16
                          },
                          componentProps: {
                            options: [
                              {
                                label: '否',
                                value: 0
                              },
                              {
                                label: '是',
                                value: 1
                              }
                            ],
                            checkedValue: 1,
                            unCheckedValue: 0,
                            unCheckedChildren: '否',
                            checkedChildren: '是'
                          }
                        },
                        {
                          field: 'taskDescription',
                          label: '任务描述',
                          component: 'InputTextArea',
                          colProps: {
                            span: 24
                          },
                          componentProps: {
                            rows: 4
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  label: '标注内容设置',
                  field: 'field2',
                  component: 'Group',
                  ifShow: ({ model }) => !!model?.isView,
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
                          ifShow: ({ model }) => !model?.isView,
                          render: () => {
                            return (
                              <div class="w-full flex justify-between items-center px-10px">
                                <div>数据预览</div>
                                <div class="text-[var(--primary-color)]">
                                  共计{formModel?.labelSaveDTOList?.length || 0}
                                  条数据
                                </div>
                              </div>
                            )
                          }
                        },
                        {
                          field: 'labelSaveDTOList',
                          label: '',
                          component: 'Table',
                          ifShow: () => formModel?.taskType == 2,
                          colProps: {
                            span: 24
                          },
                          render: () => {
                            return (
                              <ShyTable
                                showIndexColumn={true}
                                dataSource={formModel?.labelSaveDTOList}
                                columns={[
                                  {
                                    title: '标注内容',
                                    dataIndex: 'labelTarget',
                                    align: 'center'
                                  },
                                  {
                                    title: '颜色设置',
                                    dataIndex: 'labelColor',
                                    align: 'center',
                                    width: 75,
                                    customRender: ({ text }) => (
                                      <div
                                        class="m-auto w-20px h-20px rounded-1/2"
                                        style={{ background: text }}
                                      ></div>
                                    )
                                  },
                                  {
                                    title: '',
                                    dataIndex: ' ',
                                    customRender: () => {
                                      return ' '
                                    }
                                  }
                                ]}
                                canResize={false}
                                showTableSetting={false}
                                isShowFooter={false}
                              />
                            )
                          }
                        },

                        {
                          field: 'labelSaveDTOList',
                          label: '',
                          component: 'Table',
                          ifShow: () => formModel?.taskType == 1,
                          colProps: {
                            span: 24
                          },

                          render: () => {
                            return (
                              <ShyTable
                                showIndexColumn={true}
                                dataSource={formModel?.labelSaveDTOList}
                                columns={[
                                  {
                                    title: '标注内容',
                                    dataIndex: 'labelTarget',
                                    align: 'center',
                                    width: 400
                                  },
                                  {
                                    title: '颜色设置',
                                    dataIndex: 'labelColor',
                                    align: 'center',
                                    width: 75,
                                    customRender: ({ text }) => (
                                      <div
                                        class="m-auto w-20px h-20px rounded-1/2"
                                        style={{ background: text }}
                                      ></div>
                                    )
                                  },
                                  {
                                    title: '',
                                    dataIndex: ' ',
                                    customRender: () => {
                                      return ' '
                                    }
                                  }
                                ]}
                                canResize={false}
                                showTableSetting={false}
                                isShowFooter={false}
                              />
                            )
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        },
        {
          field: 'form-right',
          label: '',
          component: 'Group',
          colProps: {
            span: 14
          },
          componentProps: {
            groupType: 'Origin',
            groupInObject: false,
            schemas: [
              {
                field: 'instanceList',
                label: '',
                show: false,
                component: 'Table'
              },
              {
                field: 'searchInfo',
                label: '',
                show: false,
                component: 'Input',
                defaultValue: {}
              },
              {
                label: '标注任务列表',
                field: 'field3',
                component: 'Group',
                colProps: {
                  span: 24
                },
                ifShow: ({ model }) => !model?.isView,
                componentProps: ({ formModel }) => {
                  return {
                    groupType: 'Divider',
                    groupInObject: false,
                    extra: () => {
                      return (
                        <div class="ml-auto text-12px">
                          勾选结果：
                          <span class="text-[var(--primary-color)]">
                            {formModel?.instanceIdList?.length || 0}
                          </span>
                          条数据
                        </div>
                      )
                    },
                    schemas: [
                      // {
                      //   field: 'tree',
                      //   label: '',
                      //   component: 'Input',
                      //   colProps: {
                      //     span: 4,
                      //   },
                      //   render: () => (
                      //     <FaultTypeTree
                      //       class="w-full h-520px"
                      //       onSelect={(bomId: string) => {
                      //         formModel.searchInfo.bomId = bomId;
                      //         reload();
                      //       }}
                      //     />
                      //   ),
                      // },
                      {
                        field: 'instanceIdList',
                        label: '',
                        component: 'Input',
                        show: false,
                        defaultValue: []
                      },
                      {
                        label: '',
                        field: 'taskList',
                        component: 'Input',
                        render: () => {
                          return (
                            <ShyTable
                              onRegister={registerTable}
                              v-slots={{
                                bodyCell: ({ column, record }) => {
                                  const router = useRouter()

                                  return (
                                    column.key === 'action' && (
                                      <ShyTableAction
                                        showCount={1}
                                        actions={[
                                          {
                                            label: '查看'
                                          }
                                        ]}
                                      />
                                    )
                                  )
                                }
                              }}
                              rowKey="id"
                              searchInfo={formModel.searchInfo}
                              showIndexColumn={true}
                              rowSelection={{
                                type: 'checkbox',
                                getCheckboxProps: (record: any) => {
                                  return {
                                    disabled:
                                      record?.isAssignLabelTask == 1 &&
                                      !formModel?.instanceList
                                        ?.map(({ id }) => id)
                                        .includes(record?.id)
                                  }
                                },
                                selectedRowKeys:
                                  formModel?.instanceIdList || [],
                                onSelect(record, selected) {
                                  if (selected) {
                                    formModel.instanceIdList.push(record.id)
                                  } else {
                                    formModel.instanceIdList =
                                      formModel.instanceIdList.filter(
                                        (id) => id !== record.id
                                      )
                                  }
                                }
                              }}
                              actionColumn={{
                                width: 80,
                                title: '操作',
                                dataIndex: 'action'
                              }}
                              columns={getColumns(formModel?.taskType)}
                              canResize={false}
                              showTableSetting={false}
                            />
                          )
                        },
                        colProps: { span: 24 }
                      }
                    ]
                  }
                }
              },
              {
                label: '标注任务列表',
                field: 'field3',
                component: 'Group',
                colProps: {
                  span: 24
                },
                ifShow: ({ model }) => !!model.isView,
                componentProps: ({ formModel }) => {
                  return {
                    groupType: 'Divider',
                    groupInObject: false,
                    schemas: [
                      // {
                      //   field: 'tree',
                      //   label: '',
                      //   component: 'Input',
                      //   colProps: {
                      //     span: 4,
                      //   },
                      //   render: () => <FaultTypeTree class="w-full h-520px" />,
                      // },
                      {
                        field: 'instanceIdList',
                        label: '',
                        component: 'Input',
                        show: false,
                        defaultValue: []
                      },
                      {
                        label: '',
                        field: 'taskList',
                        component: 'Input',
                        render: () => {
                          return (
                            <ShyTable
                              v-slots={{
                                bodyCell: ({ column, record }) => {
                                  const router = useRouter()
                                  return (
                                    column.key === 'action' && (
                                      <ShyTableAction
                                        showCount={1}
                                        actions={[
                                          {
                                            label: '查看'
                                          }
                                        ]}
                                      />
                                    )
                                  )
                                }
                              }}
                              rowKey="id"
                              dataSource={formModel?.instanceList}
                              showIndexColumn={true}
                              actionColumn={{
                                width: 80,
                                title: '操作',
                                dataIndex: 'action'
                              }}
                              columns={getColumns(formModel?.taskType)}
                              canResize={false}
                              showTableSetting={false}
                            />
                          )
                        },
                        colProps: { span: 24 }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      ]
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
const getColumns = (type: string) => {
  return [
    {
      title: '任务编码',
      dataIndex: 'taskCode'
    },
    {
      title: '故障层级',
      dataIndex: 'faultLevel'
    },
    {
      title: '故障模式',
      dataIndex: 'faultModel'
    },
    {
      title: '故障模式编码',
      dataIndex: 'taskCode'
    },
    {
      title: '数据来源',
      dataIndex: 'inputSource'
    },
    {
      title: '审核人员',
      dataIndex: 'faultHandleUser'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '标注状态',
      dataIndex: 'isAssignLabelTaskMsg'
    }
  ]
}
