<template>
  <div class="shy-form">
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row>
        <template v-for="(item, index) in props.column || []" :key="index">
          <a-col :span="item?.span || 12">
            <a-form-item :label="item.label">
              <a-input size="middle"></a-input
            ></a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { Form } from 'ant-design-vue'
import { reactive } from 'vue'
interface Props {
  column: { label: string; span?: number }[]
}
const props = withDefaults(defineProps<Props>(), { column: () => [] })

const form = reactive({})
const rules = reactive({})
const { resetFields, validate, validateInfos } = Form.useForm(form, rules, {})

defineExpose({ resetFields })
</script>

<style scoped></style>
