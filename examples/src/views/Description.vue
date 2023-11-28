<template>
  <div class="p-4 w-1600px">
    <Description title="基础示例" @register="register">
      <template #usernameValue="res">
        <a-button :style="{ width: `200px` }" type="primary">查看证照</a-button>
      </template>
    </Description>
  </div>
</template>
<script lang="ts" setup>
import { Description, DescItem, useDescription } from '3h1-ui'

const mockData: any = {
  username: 'test',
  nickName: 'VB',
  age: 123,
  phone: '15695909xxx',
  email: '190848757@qq.com',
  addr: '厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区厦门市思明区',
  sex: '男',
  certy: '3504256199xxxxxxxxx',
  tag: 'orange'
}
const schema: DescItem[] = [
  {
    label: '基本信息',
    component: 'Group'
  },
  {
    field: 'username',
    label: '',
    colProps: { span: 12 },
    isCopy: true,
    contentStyle: { marginLeft: `200px` }
  },
  {
    field: 'nickName',
    label: '昵称',
    colProps: { span: 12 },
    isCopy: true
  },
  {
    label: '用户信息',
    component: 'Divider'
  },
  {
    field: 'phone',
    label: '联系电话',
    colProps: { span: 8 }
  },
  {
    field: 'email',
    label: '邮箱',
    colProps: { span: 8 }
  },
  {
    field: 'addr',
    label: '地址',
    colProps: { span: 8 }
  }
]

const [register] = useDescription({
  data: mockData,
  schema,
  labelAlign: 'left',
  labelStyle: { width: `100px` },
  contentStyle: {}
})
</script>
