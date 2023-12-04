<template>
  <Form ref="formRef" :model="form">
    <Descriptions :bordered="bordered" size="middle" :column="column">
      <template v-for="item in schema" :key="item.field">
        <DescriptionsItem
          :class="{
            'description-active': item.required,
            'description-placeholder': !item.field
          }"
          :span="item.span"
        >
          <template #label>
            <Tooltip :title="item.label" placement="topLeft">
              {{ item.label }}
            </Tooltip>
          </template>
          <FormItem
            v-if="!readonly && (item.component || item.slot)"
            :name="item.field"
            :rules="[{ required: item.required }]"
          >
            <Component
              v-if="item.component"
              :is="item.component"
              :options="handleApiOptions(item.api!, item)"
              showSearch
              :filterOption="filterOption"
              @change="handleChangeBinding($event, item)"
              v-bind="item.componentProps"
              v-model:value="form[item.field]"
            />
            <slot
              v-if="item.slot"
              :name="item.slot"
              :model="form"
              :field="item.field"
              :conf="item"
            ></slot>
          </FormItem>
          <div v-else class="descriptions-item-content">
            {{ metaFormValue(item) }}
          </div>
        </DescriptionsItem>
      </template>
    </Descriptions>
  </Form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'
import {
  Descriptions,
  DescriptionsItem,
  Form,
  FormItem,
  Tooltip
} from 'ant-design-vue'
import { reactive, computed, ref } from 'vue'
import type { ComponentType } from '../../Form/src/types/index'

type FormSchema = {
  label: string
  field: string
  api?: ((params?: object) => Promise<any[]> | []) | []
  component?: ComponentType
  componentProps?: Recordable
  bind?: string[]
  alias?: string
  formatter?: (value: any, record?: Recordable, sourceValue?: any) => any
  slot?: string
  span?: number
  required?: boolean
  metaMap?: { [key: string]: string }
  bindApiFieldMap?: string[]
}

type Props = {
  schema: FormSchema[]
  column?: number
  bordered: boolean
  labelWidth?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  schema: () => [] as FormSchema[],
  column: 3,
  bordered: () => false,
  labelWidth: () => '100px',
  readonly: () => false
})

const form = ref<{ [key: string]: any }>({})

const formRef = ref<FormInstance>()

const formSelectOption = reactive<{ [key: string]: any }>({})

const handleApiOptions = (
  api: (params?: object) => Promise<any[]>,
  item: FormSchema
) => {
  if (!api) return []
  if (formSelectOption[item.field]) return formSelectOption[item.field]
  formSelectOption[item.field] = []
  const params: { [key: string]: any } = {}
  for (const key of item.bind || []) {
    if (!form.value[key]) continue
    params[key] = form.value[key]
  }
  api({ ...params }).then((res) => {
    formSelectOption[item.field] = res
  })
  return formSelectOption[item.field]
}

const handleChangeBinding = (value, item: FormSchema) => {
  if (!item.bind) return
  const params: { [key: string]: any } = {}
  if (item.alias) params[item.alias] = value
  params[item.field] = value
  for (const key of item.bind) {
    const findSchema = props.schema.find((item) => item.field === key)
    if (!(formSelectOption[key] && findSchema?.api)) continue
    findSchema.api({ ...params }).then((res) => {
      form.value[key] = undefined
      formSelectOption[key] = res
    })
  }
}

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const isFormatter = (params: any[]) => {
  const [formatter, value, record, sourceValue] = params
  return formatter ? formatter(value, record, sourceValue) : value
}

const isBindApiFieldMap = (bindApiFieldMap: string[]) => {
  const [bindField, bindValue] = bindApiFieldMap
  const result = formSelectOption[bindField]
    ?.filter((ele) => ele.value === form.value[bindField])
    ?.map((ele) => ele[bindValue])[0]
  return result
}

const metaFormValue = (item: FormSchema) => {
  const { formatter, metaMap, api, bindApiFieldMap, field } = item
  if (!field) return ''
  if (bindApiFieldMap) {
    const result = isBindApiFieldMap(bindApiFieldMap)
    return isFormatter([formatter, result, form.value])
  }
  if (!form.value[field] && form.value[field] !== 0) return '-'
  if (api) {
    return handleApiOptions(api, item).find(
      (ele) => ele.value === form.value[field]
    )?.label
  }
  if (metaMap) {
    return isFormatter([
      formatter,
      metaMap[form.value[field]],
      form.value,
      form.value[field]
    ])
  }
  return isFormatter([formatter, form.value[field], form.value])
}

const validate = computed(() => {
  if (formRef.value) {
    return formRef.value.validate
  } else {
    return null
  }
})

const getFieldsValue = () => form.value

const resetFieldsValue = () => {
  form.value = {}
}

const setFieldValue = (params: object) => {
  form.value = { ...form.value, ...params }
}

defineExpose({
  validate: validate,
  getFieldsValue,
  setFieldValue,
  resetFieldsValue
})
</script>

<style scoped lang="less">
:deep(.ant-descriptions-item-content) {
  padding: 0 !important;
  flex: 1;
  height: 100%;
}

:deep(.ant-form-item) {
  margin: 0;
}

:deep(.ant-form-item-explain) {
  display: none;
}

:deep(.ant-descriptions-item-label) {
  --label-width: v-bind(props.labelWidth);
  justify-content: right;
  align-items: center;
  width: var(--label-width) !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #b1b1b1;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

:deep(.ant-descriptions-view) {
  // table {
  //   width: unset !important;
  // }

  tbody {
    display: block;
  }

  .ant-descriptions-row {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0 10px;
  }
}

:deep(.ant-descriptions-item-label.description-active::before) {
  content: '*';
  color: red;
}

:deep(.ant-descriptions-item.description-active) {
  .ant-descriptions-item-label::before {
    content: '*';
    color: red;
  }
}

:deep(.ant-descriptions-item-label::after) {
  content: '';
}

:deep(.ant-descriptions-item.description-placeholder) {
  .ant-descriptions-item-label::after {
    content: '';
  }
}

:deep(.ant-form-item-has-error) {
  .ant-select-selection-placeholder {
    color: #ff4d4f !important;
  }
}

:deep(.ant-descriptions.ant-descriptions-bordered) {
  .ant-descriptions-view .ant-descriptions-row {
    gap: 0;
  }

  .ant-form-item {
    div {
      border: unset !important;
    }
  }
}

:deep(.ant-descriptions-item-label.description-placeholder) {
  background-color: unset;
  border-right: unset;
}

:deep(.ant-descriptions-item) {
  flex: 1;
}

:deep(.ant-row.ant-form-item) {
  width: 100%;
  height: 100%;
}

.descriptions-item-content {
  padding: 0 8px;
}
</style>
