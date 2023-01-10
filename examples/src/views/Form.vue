<template>
  <div class="m-4">
    <BasicForm
      :labelWidth="100"
      :schemas="schemas"
      :actionColOptions="{ span: 24 }"
      @submit="handleSubmit"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { CollapseContainer, BasicForm, FormSchema } from '3h1-ui'
import { useMessage } from '@shy-plugins/use'
const schemas: FormSchema[] = [
  {
    field: 'field',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8
    },
    defaultValue: '1',
    componentProps: {
      placeholder: '自定义placeholder',
      onChange: (e) => {
        console.log(e)
      }
    }
  }
]

export default defineComponent({
  components: { BasicForm, CollapseContainer },
  setup() {
    const { createMessage } = useMessage()
    return {
      schemas,
      handleSubmit: (values: any) => {
        createMessage.success('click search,values:' + JSON.stringify(values))
      }
    }
  }
})
</script>
