<template>
  <Form>
    <Row>
      <Col v-for="item of schema" :key="item.field" :span="item.col || 24">
        <FormItem
          v-if="isIfShow(item)"
          :label="item.label"
          :labelCol="{ span: 12 }"
          labelAlign="left"
        >
          <component
            :key="item.field"
            v-model:[getModelKey(item.componentProps)]="formState[item.field]"
            :is="item.component"
            v-bind="getDynamicBind(item)"
            @change="item.componentProps?.onChange?.($event, formState, schema)"
          ></component>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script lang="ts" setup>
import { Form, FormItem, Row, Col } from 'ant-design-vue'
import type { FormSchema } from '../../types/form'
import { omit } from 'lodash-es'
import { reactive, watch } from 'vue'

type Props = {
  schema: FormSchema[]
  formModel: Recordable
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:formModel'])

const getModelKey = (item: Recordable): string => {
  return item?.type ?? 'value'
}

const isIfShow = (item: FormSchema) => {
  if (typeof item.ifShow === 'function') {
    return item.ifShow(formState, props.schema)
  }
  return item.ifShow !== false
}

const getDynamicBind = (item: any) => {
  const componentProps = omit(item.componentProps, 'onChange') ?? {}
  if (item?.component?.name?.indexOf('Number') !== -1) {
    componentProps.precision = 0
  }
  return componentProps
}

const formState = reactive<any>(props.formModel)

watch(
  formState,
  (val) => {
    emit('update:formModel', val)
  },
  { deep: true }
)
</script>

<style scoped lang="less"></style>
