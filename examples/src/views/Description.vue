<template>
  <div class="p-16px">
    <a-button @click="handleClick">123</a-button>
    <Description size="middle" title="基础示例" @register="register">
    </Description>
  </div>
</template>
<script lang="tsx" setup>
import { Description, useDescription, ShyTable, useShyTable } from '3h1-ui'
import { h } from 'vue'
import { Tag } from 'ant-design-vue'
const mockData: any = {
  username: 'test',
  summary: '1111',
  summary1: 888888,
  age: 123,
  phone: '15695909xxx',
  email: '190848757@qq.com',
  addr: '厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区',
  sex: '男',
  certy: '3504256199xxxxxxxxx',
  tag: 'orange'
}

const handleClick = async () => {
  const res = await getFieldsValue()
}

const schema: any[] = [
  {
    field: 'username',
    label: '测试',
    colProps: { span: 8 },
    isForm: true,
    component: 'Select',
    componentProps: ({ formActionType }) => {
      console.log('[ formActionType ] >', formActionType)
      return {
        options: [
          { label: '111', value: 0 },
          { label: '222', value: 1 }
        ],
        onChange: (value) => {
          if (value === 0) {
            formActionType.updateSchemas([
              { field: 'select', required: false, isForm: false }
            ])
          } else {
            formActionType.updateSchemas([
              { field: 'select', required: true, isForm: true }
            ])
          }
        }
      }
    }
  },
  {
    field: 'select',
    label: '测试',
    colProps: { span: 8 },
    isForm: true,
    component: 'Input',
    componentProps: {},
    required: true
  },
  {
    field: 'faultModel',
    label: '故障模式',
    component: 'Input',
    required: true,
    colProps: {
      span: 4
    }
  },
  {
    field: 'faultReason',
    label: '故障原因',
    component: 'Input',
    required: true,
    colProps: {
      span: 4
    }
  },
  {
    field: 'faultExcludeWay',
    label: '故障排除方式',
    component: 'Input',
    required: true,
    colProps: {
      span: 4
    }
  },
  {
    field: 'faultHandleUser',
    label: '故障处理人1',
    component: 'Input',
    colProps: {
      span: 4
    }
  },
  {
    field: 'faultHandleUser',
    label: '故障处理人2',
    component: 'Input',
    colProps: {
      span: 4
    }
  },
  {
    field: 'faultHandleUser',
    label: '故障处理人3',
    component: 'Input',
    colProps: {
      span: 4
    }
  },
  {
    field: 'summary',
    label: '合计',
    colProps: { span: 8 },
    isForm: true,
    componentProps: { component: 'Input' }
  },
  {
    field: 'summary1',
    label: '合计1',
    colProps: { span: 24 }
  },
  {
    field: 'phone',
    label: '联系电话1111111111',
    colProps: { span: 24 },
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
            align: 'center',
          },
          {
            title: '一类',
            dataIndex: 'b',
            width: 100,
            align: 'center',
          },
          {
            title: '二类',
            dataIndex: 'c',
            width: 100,
            align: 'center',
          },
          {
            title: '三类',
            dataIndex: 'd',
            width: 100,
            align: 'center',
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
  },

  {
    field: 'addr',
    label: '地址',
    colProps: { span: 24 }
  }
]
const fun = (color) => {
  return h(Tag, { style: { color } }, 222)
}
const [register, { setDescProps, getFieldsValue }] = useDescription({
  // data: mockData,
  labelWidth: 100,
  bordered: true,
  schema
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

onMounted(() => {
  setDescProps({ data: mockData, labelWidth: 110 })
})
</script>
