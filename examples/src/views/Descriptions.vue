<template>
  <div class="p-16px">
    <ShyDescriptions size="middle" @register="register"> </ShyDescriptions>
  </div>
</template>
<script lang="ts" setup>
import { ShyDescriptions, useShyDescriptions } from '3h1-ui'
import BasicTitle from './BasicTitle.vue'
import { h, render } from 'vue'
import { colProps } from 'ant-design-vue/es/grid/Col'
import { commentProps } from 'ant-design-vue/es/comment'
import { formSchema } from './data'
const mockData: any = {
  isView: true,
  taskType: '1',
  modelCode: 'TP001',
  faultDiscoveryProcess: 2
}

const handleCustomFn = () => {
  console.log(111)
}

const [register, { setDescProps }] = useShyDescriptions({
  schemas: formSchema,
  isShowColon: true,
  bordered: false
})
onMounted(() => {
  setDescProps({ data: mockData, labelWidth: 110 })
})
</script>
