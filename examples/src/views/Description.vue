<template>
  <div class="p-4">
    <Description
      title="基础示例"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="3"
      :data="mockData"
      :schema="schema"
    />
    <Description @register="register" class="mt-4" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Alert } from 'ant-design-vue'
import { Description, DescItem, useDescription } from '3h1-ui'
const mockData: any = {
  username: 'test',
  nickName: 'VB',
  age: 123,
  phone: '15695909xxx',
  email: '190848757@qq.com',
  addr: '厦门市思明区',
  sex: '男',
  certy: '3504256199xxxxxxxxx',
  tag: 'orange'
}
const schema: DescItem[] = [
  {
    field: 'username',
    label: '用户名'
  },
  {
    field: 'nickName',
    label: '昵称',
    render: (curVal, data) => {
      return `${data.username}-${curVal}`
    }
  },
  {
    field: 'phone',
    label: '联系电话'
  },
  {
    field: 'email',
    label: '邮箱'
  },
  {
    field: 'addr',
    label: '地址'
  }
]
export default defineComponent({
  components: { Description, Alert },
  setup() {
    const [register] = useDescription({
      title: 'useDescription',
      data: mockData,
      schema: schema
    })
    return { mockData, schema, register }
  }
})
</script>
