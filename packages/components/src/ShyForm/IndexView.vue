<template>
  <div class="shy-form">
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row>
        <template v-for="(item, index) in props.column || []" :key="index">
          <a-col :span="item?.span || 12">
            <a-form-item :label="item.label">
              <a-select
                @change="changeEvent"
                v-if="item?.type === 'select'"
                v-model:value="form[item.prop]"
                :options="item.dicData"
              >
              </a-select>
              <a-input
                v-else
                @change="changeEvent"
                v-model:value="form[item.prop]"
                size="middle"
              ></a-input
            ></a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {
  Form,
  Col as ACol,
  Row as ARow,
  Select as ASelect,
  Input as AInput
} from 'ant-design-vue'
import { reactive, watch, ref } from 'vue'
interface Props {
  column: {
    label: string
    span?: number
    prop: string
    type?: string
    dicData?: { label: string; value: string }[]
  }[]
  form: any
}
const props = withDefaults(defineProps<Props>(), { column: () => [], form: {} })
const emit = defineEmits(['update:form'])

const form = reactive({})
watch(
  () => props.form,
  (value) => {
    Object.keys(value).forEach((key) => {
      form[key] = value[key]
    })
  },
  { immediate: true }
)

const changeEvent = () => {
  emit('update:form', { ...form })
}
const rules = reactive({})
const { resetFields, validate, validateInfos } = Form.useForm(form, rules, {})

defineExpose({ resetFields })
</script>

<style scoped></style>
