<template>
  <div class="p-16px">
    <a-button @click="handleClick"></a-button>
    <Description size="middle" title="基础示例" @register="register">
    </Description>
  </div>
</template>
<script lang="ts" setup>
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
    required: true
  },
  {
    field: 'select',
    label: '测试',
    colProps: { span: 8 }
  },
  {
    field: 'summary',
    label: '合计',
    colProps: { span: 8 }
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
    helpMessage: '这是一个'
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
