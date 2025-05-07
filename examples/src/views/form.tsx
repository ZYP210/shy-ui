export const formSchema: any[] = [
  {
    field: 'isView',
    label: '',
    show: false,
    component: 'Input',
    defaultValue: false
  },
  {
    label: '',
    field: 'group',
    component: 'Group',
    colProps: {
      span: 24
    },
    componentProps: ({ formActionType }) => {
      return {
        groupInObject: false,
        isOpen: false,
        schemas: [
          {
            field: 'templateId',
            label: '实例模板',
            component: 'Select',
            componentProps: {
              options: [
                {
                  label: '主机',
                  value: '1'
                },
                {
                  label: '部附件',
                  value: '2'
                },
                {
                  label: '系统',
                  value: '3'
                }
              ],
              onChange(val) {
                if (val === '1') {
                  formActionType?.updateSchema?.([
                    {
                      field: 'faultLocation',
                      required: true
                    }
                  ])
                } else if (val === '2') {
                  formActionType?.updateSchema?.([
                    {
                      field: 'faultLocation',
                      required: false
                    }
                  ])
                } else if (val === '3') {
                  formActionType?.updateSchema?.([
                    {
                      field: 'faultLocation',
                      required: false
                    }
                  ])
                }
              }
            }
          },
          {
            field: 'faultLocation',
            label: '故障来源',
            component: 'Select'
          },
          {
            field: 'faultType',
            label: '故障类型',
            component: 'Select'
          },
          {
            field: 'faultLevel',
            label: '故障层级',
            component: 'Select'
          },
          {
            field: 'taskType',
            label: '任务大类',
            component: 'Select'
          },
          {
            field: 'taskCode',
            label: '任务编码',
            component: 'ApiSelect',

            colProps: {
              span: 6
            },
            ifShow: ({ model }) => !model.isView
          },
          {
            field: 'taskCodeMsg',
            label: '任务编码',
            component: 'Input',
            ifShow: ({ model }) => !!model.isView
          },
          {
            field: 'mainMachineWorkCode',
            label: '主机派工号',
            component: 'Input',
            colProps: {
              span: 6
            },
            componentProps: {
              disabled: true
            }
          },
          {
            field: 'productName',
            label: '产品名称',
            component: 'Input',
            show: false
          },
          {
            field: 'productId',
            label: '产品名称',
            component: 'Input',
            colProps: {
              span: 6
            }
          },
          {
            field: 'modelCode',
            label: '图号/型号',
            component: 'Input',
            colProps: {
              span: 6
            }
          },
          {
            field: 'partCode',
            label: '件号',
            component: 'input',
            colProps: {
              span: 6
            },
            componentProps: {
              disabled: true
            }
          },
          {
            field: 'parts',
            label: '所属分区',
            component: 'ApiSelect',
            colProps: {
              span: 6
            },
            componentProps: {
              params: {
                type: '5'
              }
            }
          },
          {
            field: 'batchCode',
            label: '批次号',
            component: 'Input',
            ifShow: ({ values }) => {
              return !(
                values?.faultLevel === 'system' && values?.taskType === '主机'
              )
            },
            colProps: {
              span: 6
            }
          },
          {
            field: 'outsourceCompanyMsg',
            label: '',
            component: 'Input',
            show: false
          },
          {
            field: 'outsourceCompany',
            label: '外委厂商',
            component: 'Input',
            ifShow: ({ values }) => {
              return !(
                values?.faultLevel === 'system' && values?.taskType === '主机'
              )
            },
            colProps: {
              span: 6
            }
          },
          {
            field: 'major',
            label: '专业',
            component: 'ApiTreeSelect',
            componentProps: {
              fieldNames: { value: 'id', label: 'careerName' }
            },
            colProps: {
              span: 6
            }
          },
          {
            field: 'custom',
            label: '客户',
            component: 'Input',
            show: false
          },
          {
            field: 'customId',
            label: '客户',
            component: 'Input',
            dynamicDisabled: ({ values }) =>
              values?.faultLevel != 'system' && values?.taskType === '主机'
                ? [{ required: true }]
                : false,
            colProps: {
              span: 6
            }
          },

          {
            field: 'planeManufactureCode',
            label: '飞机制造号',
            component: 'Input',
            dynamicDisabled: ({ values }) =>
              values?.faultLevel != 'system' && values?.taskType === '主机'
                ? [{ required: true }]
                : false,
            colProps: {
              span: 6
            }
          },
          {
            field: 'planeType',
            label: '飞机型别',
            component: 'ApiTreeSelect',
            componentProps: {
              fieldNames: { value: 'id', label: 'apmName' }
            },
            colProps: {
              span: 6
            }
          },
          {
            field: 'systemCode',
            label: '系统',
            component: 'ApiTreeSelect',
            colProps: {
              span: 6
            }
          },
          {
            field: 'flyHourTotal',
            label: '总飞行小时',
            component: 'Input',
            colProps: {
              span: 6
            }
          },
          {
            field: 'workHourTotal',
            label: '总工作小时',
            component: 'Input',
            colProps: {
              span: 6
            }
          },
          {
            field: 'takeOffAndLandTotal',
            label: '总起落次数',
            component: 'InputNumber',
            colProps: {
              span: 6
            }
          },
          {
            field: 'calendarYear',
            label: '总日历年',
            component: 'Input',
            colProps: {
              span: 6
            }
          },
          {
            field: 'life',
            label: '总寿命',
            component: 'Input',
            colProps: {
              span: 6
            }
          },
          {
            field: 'mainMachineRepairType',
            label: '主机维修类别',
            component: 'ApiTreeSelect',
            colProps: {
              span: 6
            },
            componentProps: {
              fieldNames: { value: 'id', label: 'fixLevName' }
            }
          },

          {
            field: 'componentRepairType',
            label: '部附件维修类别',
            component: 'ApiTreeSelect',
            ifShow: ({ values }) => {
              return (
                values?.faultLevel !== 'system' && values?.taskType === '部附件'
              )
            },
            colProps: {
              span: 6
            },
            componentProps: {
              fieldNames: { value: 'id', label: 'fixLevName' }
            }
          },
          {
            field: 'faultHandleUserName',
            label: '故障处理人',
            component: 'Input',
            show: false
          },
          {
            field: 'faultHandleUser',
            label: '故障处理人',
            component: 'Input',
            colProps: {
              span: 6
            }
          },
          {
            field: 'faultDiscoveryProcess',
            label: '故障发现工序',
            component: 'ApiTreeSelect',

            colProps: {
              span: 6
            },
            componentProps: {
              fieldNames: { value: 'id', label: 'processTypeName' }
            }
          },
          {
            field: 'faultJudgmentMethod',
            label: '故障判明方法',
            component: 'ApiTreeSelect',
            colProps: {
              span: 6
            },
            componentProps: {
              fieldNames: { value: 'id', label: 'proveWayName' }
            }
          },

          {
            field: 'faultHappenTime',
            label: '故障发生时机',
            component: 'Input',
            componentProps: {
              disabled: true
            },
            colProps: {
              span: 6
            }
          },
          {
            field: 'faultDate',
            label: '故障通知日期',
            component: 'DatePicker',

            componentProps: ({ formModel }) => {
              return {
                valueFormat: !!formModel?.isView
                  ? 'YYYY-MM-DD'
                  : 'YYYY-MM-DD 00:00:00'
              }
            },
            colProps: {
              span: 6
            }
          },
          {
            field: 'faultHandleDept',
            label: '故障处理单位',

            component: 'ApiTreeSelect',
            colProps: {
              span: 6
            },
            ifShow: ({ model }) => !model.isView,
            componentProps: {
              fieldNames: { value: 'id', label: 'name' }
            }
          },
          {
            field: 'faultHandleDeptMsg',
            label: '故障处理单位',
            ifShow: ({ model }) => !!model.isView
          },
          {
            field: 'faultHandleGroup',
            label: '故障处理班组',
            component: 'ApiTreeSelect',
            colProps: {
              span: 6
            },
            componentProps: {
              fieldNames: { value: 'id', label: 'name' }
            }
          },
          {
            field: 'systemEffect',
            label: '对系统的影响',
            component: 'Select',
            colProps: {
              span: 6
            }
          },
          {
            field: 'planExcludeDate',
            label: '计划排除日期',
            component: 'DatePicker',
            componentProps: ({ formModel }) => {
              return {
                valueFormat: !!formModel?.isView
                  ? 'YYYY-MM-DD'
                  : 'YYYY-MM-DD 00:00:00'
              }
            },
            colProps: {
              span: 6
            }
          },
          {
            field: 'faultExcludeDate',
            label: '故障排除日期',

            component: 'DatePicker',
            componentProps: ({ formModel }) => {
              return {
                valueFormat: !!formModel?.isView
                  ? 'YYYY-MM-DD'
                  : 'YYYY-MM-DD 00:00:00'
              }
            },
            colProps: {
              span: 6
            }
          },
          {
            field: 'productOrComponentEffect',
            label: '对产品/零组件的影响',
            component: 'Select',

            ifShow: ({ values }) => {
              return values?.faultLevel !== 'system'
            },
            colProps: {
              span: 6
            }
          },

          {
            field: 'faultNature',
            label: '故障性质',
            component: 'Select',
            componentProps: {},
            colProps: {
              span: 6
            }
          },
          {
            field: 'qualityAssessment',
            label: '质量考核情况',
            component: 'Input',
            colProps: {
              span: 6
            }
          },
          {
            field: 'faultResponsibilityDept',
            label: '故障责任单位',
            component: 'ApiTreeSelect',
            componentProps: {
              fieldNames: { value: 'id', label: 'name' }
            },
            colProps: {
              span: 6
            }
          },
          {
            field: 'faultResponsibilityGroup',
            label: '故障责任班组',
            component: 'ApiTreeSelect',
            componentProps: {
              fieldNames: { value: 'id', label: 'name' }
            },
            colProps: {
              span: 6
            }
          },
          {
            field: 'faultResponsibilityUserName',
            label: '故障责任人',
            show: false,
            component: 'Input'
          },
          {
            field: 'faultResponsibilityUser',
            label: '故障责任人',
            component: 'Input',
            colProps: {
              span: 6
            }
          },
          {
            field: 'problemZeroed',
            label: '问题归零管理',
            component: 'Input',
            colProps: {
              span: 6
            }
          },
          {
            field: 'faultTypeId',
            label: '故障所属类型',
            component: 'ApiTreeSelect',
            colProps: {
              span: 6
            },
            componentProps: {
              fieldNames: { value: 'id', label: 'faultTypeName' }
            }
          }
        ]
      }
    }
  },
  {
    field: 'faultModel',
    label: '故障模式',
    component: 'ApiTreeSelect',
    colProps: {
      span: 6
    },
    ifShow: ({ model }) => !model.isView,

    componentProps: {
      fieldNames: { value: 'id', label: 'faultCodeName' }
    }
  },
  {
    field: 'faultModelMsg',
    label: '故障模式',
    component: 'Input',
    ifShow: ({ model }) => !!model.isView
  },
  {
    field: 'faultReason',
    label: '故障原因',
    component: 'ApiTreeSelect',
    ifShow: ({ model }) => !model.isView,

    colProps: {
      span: 6
    },
    componentProps: {
      fieldNames: { value: 'id', label: 'faultCauseName' }
    }
  },
  {
    field: 'faultReasonMsg',
    label: '故障原因',
    component: 'Input',
    ifShow: ({ model }) => !!model.isView
  },
  {
    field: 'faultExcludeWay',
    label: '故障排除方式',
    component: 'ApiTreeSelect',

    ifShow: ({ model }) => !model.isView,
    colProps: {
      span: 6
    },
    componentProps: {
      fieldNames: { value: 'id', label: 'fixWayName' }
    }
  },
  {
    field: 'faultExcludeWayMsg',
    label: '故障排除方式',
    component: 'Input',
    ifShow: ({ model }) => !!model.isView
  },
  {
    label: '故障详细信息',
    field: 'field3',
    component: 'Group',
    ifShow: ({ model }) => !!model.isView,
    colProps: {
      span: 24
    },
    componentProps: {
      groupType: 'Divider',
      groupInObject: false,
      schemas: [
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
          },
          componentProps: {
            rows: 3
          }
        }
      ]
    }
  },
  {
    field: 'DataModal',
    label: '',
    component: 'Input'
  }
]
