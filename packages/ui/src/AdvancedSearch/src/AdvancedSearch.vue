<template>
  <div class="shy-ui-advanced-search" ref="advancedSearchRef">
    <div class="shy-ui-advanced-search-add">
      <PlusCircleOutlined></PlusCircleOutlined>
      <div style="margin-left: 8px" @click="handleAdd">新增条件</div>
    </div>
    <Form :model="schemasCurrent" ref="formRef">
      <Row>
        <template v-for="(schema, index) in schemasCurrent" :key="index">
          <Col v-bind="schema?.colProps || { span: 24 }">
            <div class="shy-ui-advanced-search-item-wrapper">
              <FormItem
                class="shy-ui-advanced-search-item-op"
                :name="`${schema.field}-op`"
              >
                <Select
                  v-model:value="schema.field"
                  style="width: 120px"
                  :options="dicColumn"
                  @change="handleFieldChange(schema)"
                ></Select>
              </FormItem>
              <FormItem
                class="shy-ui-advanced-search-item-op"
                :name="`${schema.field}-op`"
              >
                <Select
                  v-model:value="schema.op"
                  style="width: 120px"
                  :options="getSearchType(schema?.field)"
                  :defaultValue="getSearchType(schema?.field)[0]?.value || ''"
                ></Select>
              </FormItem>
              <FormItem class="shy-ui-advanced-search-item-value">
                <template v-if="getTypeByField(schema?.field) === 'number'">
                  <template v-if="schema.op === 'bt'">
                    <div class="shy-ui-advanced-search-item-value-range">
                      <FormItem>
                        <InputNumber
                          v-model:value.number="schema[`${schema.field}-1`]"
                        />
                      </FormItem>
                      <div style="flex: 0; width: 40px; margin-right: 8px">
                        至
                      </div>
                      <FormItem>
                        <InputNumber
                          v-model:value.number="schema[`${schema.field}-2`]"
                        />
                      </FormItem>
                    </div>
                  </template>

                  <template v-else>
                    <InputNumber
                      style="width: 200px"
                      v-model:value.number="schema[schema.field]"
                    />
                  </template>
                </template>

                <template v-else-if="getTypeByField(schema?.field) === 'date'">
                  <template v-if="schema.op === 'bt'">
                    <div class="shy-ui-advanced-search-item-value-range">
                      <FormItem>
                        <DatePicker
                          v-model:value="schema[`${schema.field}-1`]"
                          value-format="YYYY-MM-DD 00:00:00"
                          format="YYYY-MM-DD"
                        />
                      </FormItem>
                      <div style="flex: 0; width: 40px; margin-right: 8px">
                        至
                      </div>
                      <FormItem>
                        <DatePicker
                          v-model:value="schema[`${schema.field}-2`]"
                          value-format="YYYY-MM-DD 23:59:59"
                          format="YYYY-MM-DD"
                        />
                      </FormItem>
                    </div>
                  </template>

                  <template v-else>
                    <DatePicker
                      v-model:value="schema[schema.field]"
                      value-format="YYYY-MM-DD HH:mm:ss"
                    ></DatePicker>
                  </template>
                </template>

                <template
                  v-else-if="getTypeByField(schema?.field) === 'select'"
                >
                  <FormItem>
                    <Select
                      v-model:value.number="schema[`${schema.field}`]"
                      v-bind="getComponentPropsByField(schema.field)"
                    />
                  </FormItem>
                </template>

                <template v-else>
                  <Input
                    v-model:value="schema[schema.field]"
                    v-if="getComponent(schema.field) === 'Input'"
                    v-bind="getComponentPropsByField(schema.field)"
                  />
                  <Select
                    v-else
                    v-model:value="schema[schema.field]"
                    v-bind="getComponentPropsByField(schema.field)"
                  ></Select>
                </template>
              </FormItem>
              <div
                v-if="schemasCurrent.length !== 1"
                style="margin-left: 8px; cursor: pointer; position: relative"
                class="shy-ui-advanced-minus-icon"
              >
                <div
                  style="
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                  "
                  class="shy-basic-minus-icon"
                  @click="handleMinus(index)"
                ></div>
                <MinusCircleTwoTone class="shy-ui-advanced-minus-icon" />
              </div>
            </div>
          </Col>
        </template>
      </Row>
    </Form>
    <!-- <div>
      <Space>
        <BasicButton type="primary" @click="handleSearch">查询</BasicButton>
        <BasicButton @click="handleReset">重置</BasicButton>
      </Space>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import {
  Row,
  Col,
  Select,
  Form,
  Space,
  FormItem,
  Input,
  FormItemRest,
  InputNumber,
  DatePicker
} from 'ant-design-vue'
import {
  searchType,
  searchTypeString,
  searchTypeNumber,
  searchTypeDate,
  searchTypeSelect
} from './data'
import { computed, reactive, ref } from 'vue'
import { PlusCircleOutlined, MinusCircleTwoTone } from '@ant-design/icons-vue'
import { BasicButton } from '../../Button/'

const props = defineProps({
  schemas: {
    default: () => [
      {
        label: '姓名',
        field: 'name'
      },
      {
        label: '年龄',
        field: 'age',
        type: 'number'
      },
      { label: '生日', field: 'birth', type: 'date' }
    ]
  }
})

const form = reactive({})

const advancedSearchRef = ref()

const formRef = ref()

const schemasCurrent = reactive([])
if (props.schemas.length !== 0)
  schemasCurrent.push({ field: props.schemas[0].field, op: 'eq' })

const dicColumn = computed(() => {
  const temp = []
  props.schemas.forEach((schama) => {
    const flag = schemasCurrent.find((item) => {
      return item.field === schama.field
    })

    temp.push({
      label: schama.label,
      value: schama.field,
      disabled: !!flag
    })
  })
  return temp
})

const handleAdd = () => {
  const item = dicColumn.value.find((item) => {
    return item.disabled === false
  })
  schemasCurrent.push({ field: item?.value || '', op: 'eq' })
}

const handleMinus = (index) => {
  schemasCurrent.splice(index, 1)
}

const handleFieldChange = (schema) => {
  Object.keys(schema).forEach((key) => {
    if (key === 'field') return
    delete schema[key]
  })
  schema.op = 'eq'
}

const getSearchType = (field: string) => {
  const type = getTypeByField(field)
  switch (type) {
    case 'number':
      return searchTypeNumber
    case 'string':
      return searchTypeString
    case 'date':
      return searchTypeDate
    case 'select':
      return searchTypeSelect
  }
}

const getComponent = (field: string) => {
  const column = props.schemas.find((schema) => {
    return schema.field === field
  })
  return column?.component || 'Input'
}

const getTypeByField = (field: string) => {
  const column = props.schemas.find((schema) => {
    return schema.field === field
  })
  const type: 'number' | 'string' | 'date' | 'select' = column?.type || 'string'
  return type
}
const getComponentPropsByField = (field: string) => {
  const column = props.schemas.find((schema) => {
    return schema.field === field
  })
  return column?.componentProps || {}
}

// 按钮事件
// const handleSearch = () => {
//   console.log('form', form)
// }

// const handleReset = () => {
//   formRef.value.resetFields()
// }

const getSearchFrom = () => {
  let form = {}
  schemasCurrent.forEach((item) => {
    let temp = {}
    if (item.op === 'bt') {
      temp = {
        [`${item.field}-1`]: item[`${item.field}-1`],
        [`${item.field}-2`]: item[`${item.field}-2`],
        [`${item.field}-op`]: item.op
      }
    } else {
      temp = {
        [item.field]: item[item.field],
        [`${item.field}-op`]: item.op
      }
    }

    form = { ...form, ...temp }
  })
  return form
}

const resetFields = () => {
  schemasCurrent.splice(0, schemasCurrent.length)
  schemasCurrent.push({ field: props.schemas[0].field })
  formRef.value.resetFields()
}

defineExpose({
  getSearchFrom,
  resetFields,
  advancedSearchRef
})
</script>

<style scoped></style>
