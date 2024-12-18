<template>
  <div class="p-16px">
    <ShyDescriptions
      size="middle"
      title="基础示例"
      @register="register"
      @zzz="handleCustomFn"
    >
    </ShyDescriptions>
  </div>
</template>
<script lang="ts" setup>
import { ShyDescriptions, useShyDescriptions } from '3h1-ui'
import BasicTitle from './BasicTitle.vue'
import { h, render } from 'vue'
import { colProps } from 'ant-design-vue/es/grid/Col'
import { commentProps } from 'ant-design-vue/es/comment'
import { infoSchemas } from './data'
const mockData: any = {
  faultPhenomenonDescription: '3333',
  abc: '1',
  zzz: '2',
  zyp: new Date().getTime(),
  username: 'test',
  summary: '1111',
  summary1: 888888,
  age: 123,
  phone: '15695909xxx',
  email: '190848757@qq.com',
  addr: '1',
  sex: '男',
  certy: '2',
  tag: 'orange',
  faultDiscoveryProcess: '3333'
}

const handleCustomFn = () => {
  console.log(111)
}

const [register, { setDescProps }] = useShyDescriptions({
  schemas: infoSchemas,
  isShowColon: true,
  bordered: true
})
onMounted(() => {
  setDescProps({ data: mockData, labelWidth: 110 })
})
</script>
