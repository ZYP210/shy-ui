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
  taskType: '1'
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
