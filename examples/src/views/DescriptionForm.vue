<template>
  <DescriptionsForm
    :style="{ marginTop: `100px` }"
    ref="formRef"
    :schema="pageSchema"
    :bordered="true"
  />
</template>

<script lang="ts" setup>
import { DescriptionsForm } from '3h1-ui'
import { Select } from 'ant-design-vue'

const list = Array(10)
  .fill(0)
  .map((_, index) => ({
    value: index,
    label: `name${index}`
  }))

const pageSchema = [
  {
    field: 'applyDept',
    alias: 'deptId',
    label: '需求科室',
    // required: true,
    // component: Select,
    // api: () =>
    //   new Promise((resolve) => {
    //     resolve(list)
    //   }),
    // bind: ['warehouseId'],
    // componentProps: {
    //   placeholder: '请选择需求科室',
    //   style: { width: '100%' }
    // }
  },
  {
    field: 'warehouseId',
    label: '采购库房',
    required: true,
    component: Select,
    api: () => {
      return new Promise((resolve) => {
        resolve(list)
      })
    },
    componentProps: {
      placeholder: '请选择采购库房',
      style: { width: '100%' }
    }
  },
  {
    field: 'productType',
    label: '产品类型',
    required: false,
    component: Select,
    componentProps: {
      placeholder: '请选择产品类型',
      options: list,
      style: { width: '100%' },
      allowClear: true
    }
  },
  {
    field: 'goodsType',
    label: '物资属性',
    required: false,
    component: Select,
    componentProps: {
      placeholder: '请选择物资属性',
      options: list,
      allowClear: true
    }
  },
  {
    field: '',
    label: ''
  },
  {
    field: '',
    label: ''
  }
]
</script>
<style scoped lang="less"></style>
