<template>
  <div class="p-16px">
    <Description title="基础示例" @register="register"> </Description>
  </div>
</template>
<script lang="ts" setup>
import { Description, useDescription } from '3h1-ui'
import { h } from 'vue'
import { Tag } from 'ant-design-vue'
const mockData: any = {
  username: 'test',
  summary: 1111111,
  summary1: 888888,
  age: 123,
  phone: '15695909xxx',
  email: '190848757@qq.com',
  addr: '厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区',
  sex: '男',
  certy: '3504256199xxxxxxxxx',
  tag: 'orange'
}
const schema: any[] = [
  {
    field: 'username',
    label: '测试',
    colProps: { span: 8 },
    isCopy: true
  },
  {
    field: 'summary',
    label: '合计',
    colProps: { span: 8 }
  },
  {
    field: 'summary1',
    label: '合计1',
    colProps: { span: 8 }
  },
  // {
  //   field: 'nickName',
  //   label: '昵称',
  //   colProps: { span: 16 },
  //   isCopy: false,
  //   customRender: (data) => {
  //     return h(Tag, { color: 'success' }, data.phone)
  //   },
  //   ifShow: (data) => {
  //     console.log(data)
  //     return !!data.nickName
  //   }
  // },
  {
    field: 'phone',
    label: '联系电话',
    colProps: { span: 24 },
    helpMessage: '这是一个'
  },
  // {
  //   field: 'email',
  //   label: '邮箱',
  //   colProps: { span: 8 }
  // },

  {
    field: 'addr',
    label: '地址',
    colProps: { span: 24 }
  }
]
const fun = (color) => {
  return h(Tag, { style: { color } }, 222)
}
const [register, { setDescProps }] = useDescription({
  // data: mockData,
  labelWidth: 100,
  bordered: true,
  schema,
  summaryTotalFields: ['summary', 'summary1']
  // mode: 'vertical'
})

onMounted(() => {
  setDescProps({ data: mockData, labelWidth: 110 })
})
</script>
