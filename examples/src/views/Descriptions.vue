<template>
  <div class="p-16px">
    <ShyDescriptions size="middle" title="基础示例" @register="register">
    </ShyDescriptions>
  </div>
</template>
<script lang="ts" setup>
import { ShyDescriptions, useShyDescriptions } from '3h1-ui'
import BasicTitle from './BasicTitle.vue'

import { h, render } from 'vue'
import { Tag } from 'ant-design-vue'
import { colProps } from 'ant-design-vue/es/grid/Col'
import { commentProps } from 'ant-design-vue/es/comment'
const mockData: any = {
  username: 'test',
  summary: '1111',
  summary1: 888888,
  age: 123,
  phone: '15695909xxx',
  email: '190848757@qq.com',
  addr: '1',
  sex: '男',
  certy: '2',
  tag: 'orange'
}

const schemas = [
  {
    field: 'faultLocation',
    label: '故障地点',
    component: 'Select',
    ifShow: false,
    required: true,
    render: () => h(Tag, { color: 'blue' }, '自定义'),
    helpMessage: '故障地点',
    componentProps: {
      // options: getDictOptions(DICT_TYPE.FAULT_LOCATION)
    }
  },
  {
    field: 'faultType',
    label: '故障类型',
    component: 'Select',
    required: true,
    componentProps: {
      // options: getDictOptions(DICT_TYPE.FAULT_TYPE)
    }
  },
  {
    field: 'faultLevel',
    label: '故障层级',
    component: 'Select',
    required: true,
    componentProps: {
      // options: getDictOptions(DICT_TYPE.BIZ_FAULT_LEVEL)
    }
  },
  {
    field: 'taskType',
    label: '任务大类',
    component: 'Select',
    required: true,
    componentProps: {
      // options: getDictOptions(DICT_TYPE.TASK_TYPE)
    }
  },
  {
    label: 'field1',
    field: 'field1',
    component: 'Group',
    colProps: {
      span: 24
    },
    componentProps: {
      groupType: 'Group',
      groupInObject: false,
      isOpen: false,
      schemas: [
        {
          field: 'taskCode',
          label: '任务编码',
          component: 'Input',
          required: true,
          colProps: {
            span: 6
          }
        },
        {
          field: 'mainMachineWorkCode',
          label: '主机派工号',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'productName',
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
          required: true,
          colProps: {
            span: 6
          }
        },
        {
          field: 'partCode',
          label: '件号',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'batchCode',
          label: '批次号',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'outsourceCompany',
          label: '外委厂商',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'custom',
          label: '客户',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'major',
          label: '专业',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'planeManufactureCode',
          label: '飞机制造号',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'planeType',
          label: '飞机型别',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'systemCode',
          label: '系统',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'flyHourTotal',
          label: '总飞行小时',
          component: 'InputNumber',
          colProps: {
            span: 6
          }
        },
        {
          field: 'workHourTotal',
          label: '总工作小时',
          component: 'InputNumber',
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
          field: 'zzz',
          label: '翻修问隔期',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'mainMachineRepairType',
          label: '主机维修类别',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'componentRepairType',
          label: '部附件维修类别',
          component: 'Input',
          colProps: {
            span: 6
          }
        }
      ]
    }
  },
  {
    field: 'faultModel',
    label: '故障模式',
    component: 'Input',
    required: true,
    colProps: {
      span: 6
    }
  },
  {
    field: 'faultReason',
    label: '故障原因',
    component: 'Input',
    required: true,
    colProps: {
      span: 6
    }
  },
  {
    field: 'faultExcludeWay',
    label: '故障排除方式',
    component: 'Input',
    required: true,
    colProps: {
      span: 6
    }
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
    label: 'field2',
    field: 'field2',
    component: 'Group',
    colProps: {
      span: 24
    },
    componentProps: {
      groupType: 'Group',
      groupInObject: false,
      isOpen: false,
      schemas: [
        {
          field: 'faultDiscoveryProcess',
          label: '故障发现工序',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'faultHappenTime',
          label: '故障发生时机',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'faultDate',
          label: '故障通知日期',
          component: 'DatePicker',
          colProps: {
            span: 6
          }
        },
        {
          field: 'faultHandleDept',
          label: '故障处理单位',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'faultHandleGroup',
          label: '故障处理班组',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'systemEffect',
          label: '对系统的影响',
          component: 'Input',
          colProps: {
            span: 6
          }
        },
        {
          field: 'planExcludeDate',
          label: '计划排除日期',
          component: 'DatePicker',
          colProps: {
            span: 6
          }
        },
        {
          field: 'faultExcludeDate',
          label: '故障排除日期',
          component: 'DatePicker',
          colProps: {
            span: 6
          }
        },
        {
          field: 'productOrComponentEffect',
          label: '对产品/零组件的影响',
          component: 'Input',
          colProps: {
            span: 6
          },
          labelStyle: { width: '250px' }
        },
        {
          field: 'systemEffect',
          label: '对系统的影响',
          component: 'Input',
          colProps: {
            span: 6
          }
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
    componentProps: {
      groupType: 'Divider',
      groupInObject: false,
      schemas: [
        {
          label: '',
          field: 'leftGroup',
          component: 'Group',
          colProps: {
            span: 16
          },
          componentProps: {
            groupType: 'Origin',
            groupInObject: false,
            schemas: [
              {
                field: 'zzz',
                label: '222',
                component: 'Input',
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
          componentProps: {
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
      ]
    }
  }
]

const [register] = useShyDescriptions({
  data: mockData,
  schemas,
  isShowColon: true,
  labelWidth: 120,
  baseColProps: {
    span: 6
  },
  bordered: true
})
onMounted(() => {
  // setDescProps({ data: mockData, labelWidth: 110 })
})
</script>
