<template>
  <div class="shy-ui-advanced-search" ref="advancedSearchRef">
    <BasicButton
      type="link"
      preIcon="tabler:circle-plus"
      @click="handleAdd"
      isContinuousClicks
    >
      新增条件
    </BasicButton>
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
                  @change="handleSetValNull(schema)"
                ></Select>
              </FormItem>
              <FormItem
                class="shy-ui-advanced-search-item-value"
                v-if="!['nl', 'nn'].includes(schema.op)"
              >
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
                    <ApiSelect
                      v-if="getComponent(schema.field) === 'ApiSelect'"
                      v-model:value="schema[`${schema.field}`]"
                      v-bind="getComponentPropsByField(schema.field)"
                    />
                    <Select
                      v-else
                      v-model:value="schema[`${schema.field}`]"
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
                  <ApiSelect
                    v-else-if="getComponent(schema.field) === 'ApiSelect'"
                    v-model:value="schema[`${schema.field}`]"
                    v-bind="getComponentPropsByField(schema.field)"
                  />
                  <Select
                    v-else
                    v-model:value="schema[schema.field]"
                    v-bind="getComponentPropsByField(schema.field)"
                  ></Select>
                </template>
              </FormItem>
              <BasicButton
                v-if="schemasCurrent?.length !== 1"
                type="link"
                preIcon="tabler:circle-minus"
                @click="handleMinus(index)"
                isContinuousClicks
              />
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
  FormItem,
  Input,
  InputNumber,
  DatePicker
} from 'ant-design-vue'
import {
  searchTypeString,
  searchTypeNumber,
  searchTypeDate,
  searchTypeSelect,
  stringSearchTypeSelect
} from './data'
import { computed, reactive, ref } from 'vue'
import type { schemasAdvancedSearch } from '../../ShyTable/src/types/table'
import ApiSelect from '../../ShyForm/src/components/ApiSelect.vue'
import { BasicButton } from '../../Button'

type Props = {
  schemas: schemasAdvancedSearch[]
}
const props = withDefaults(defineProps<Props>(), {
  schemas: () => [
    {
      label: '姓名',
      field: 'name',
      advancedShow: false
    },
    {
      label: '年龄',
      field: 'age',
      type: 'number'
    },
    { label: '生日', field: 'birth', type: 'date' }
  ]
})

const advancedSearchRef = ref()

const formRef = ref()

const schemasCurrent = reactive<Recordable[]>([])

//判断是否是字符串搜索
const isStringSearch = (item: any) => {
  if (!item) return false
  return item.type === 'string' && /select/i.test(item.component)
}

const dicColumn = computed(() => {
  const temp: Recordable[] = []
  props.schemas.forEach((schema) => {
    if (!schema.advancedShow) return
    const flag = schemasCurrent.find((item) => {
      return item.field === schema.field
    })

    temp.push({
      label: schema.label,
      value: schema.field,
      disabled: !!flag,
      type: schema.type,
      component: schema.component
    })
  })

  return temp
})

if (props.schemas.length !== 0) {
  const firstSchema = dicColumn.value[0]
  const op = isStringSearch(firstSchema) ? 'ct' : 'eq'
  schemasCurrent.push({ field: firstSchema?.value, op })
}

const handleAdd = () => {
  const item = dicColumn.value.find((item) => {
    return item.disabled === false
  })

  const column = props.schemas.find((schema) => {
    return schema.field === item?.value
  })

  const op = isStringSearch(column) ? 'ct' : 'eq'
  schemasCurrent.push({ field: item?.value || '', op })
}

const handleMinus = (index) => {
  schemasCurrent.splice(index, 1)
}

const handleFieldChange = (schema) => {
  Object.keys(schema).forEach((key) => {
    if (key === 'field') return
    delete schema[key]
  })

  const column = props.schemas.find((item) => {
    return item.field === schema.field
  })
  schema.op = isStringSearch(column) ? 'ct' : 'eq'
}

const handleSetValNull = (schema) => {
  if (['nl', 'nn'].includes(schema.op)) {
    schema[schema.field] = ''
  }
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
    case 'stringSelect':
      return stringSearchTypeSelect
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

  const stringSelect = isStringSearch(column)

  const type: 'number' | 'string' | 'date' | 'select' = column?.type || 'string'
  return stringSelect ? 'stringSelect' : '' || type
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
  schemasCurrent.push({ field: dicColumn.value[0]?.value })
  formRef.value.resetFields()
}

defineExpose({
  getSearchFrom,
  resetFields,
  advancedSearchRef
})
</script>
