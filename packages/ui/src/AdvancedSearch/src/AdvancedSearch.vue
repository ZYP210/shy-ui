<template>
  <div class="shy-ui-advanced-search">
    <Form :model="form" ref="formRef">
      <Row>
        <template v-for="(schema, index) in schemas" :key="index">
          <Col v-bind="schema?.colProps || { span: 24 }">
            <div class="shy-ui-advanced-search-item-wrapper">
              <FormItem
                class="shy-ui-advanced-search-item-op"
                :label="schema.label"
                :name="`${schema.field}-op`"
              >
                <Select
                  v-model:value="form[`${schema.field}-op`]"
                  style="width: 120px"
                  :options="getSearchType(schema?.type)"
                ></Select>
              </FormItem>
              <FormItem
                class="shy-ui-advanced-search-item-value"
                :name="schema.field"
              >
                <template v-if="schema?.type === 'number'">
                  <template v-if="form[`${schema.field}-op`] === 'bt'">
                    <div class="shy-ui-advanced-search-item-value-range">
                      <FormItem>
                        <InputNumber
                          v-model:value.number="form[`${schema.field}-1`]"
                        />
                      </FormItem>
                      <div style="flex: 0; width: 40px; margin-right: 8px">
                        至
                      </div>
                      <FormItem>
                        <InputNumber
                          v-model:value.number="form[`${schema.field}-2`]"
                        />
                      </FormItem>
                    </div>
                  </template>

                  <template v-else>
                    <InputNumber
                      style="width: 200px"
                      v-model:value.number="form[schema.field]"
                    />
                  </template>
                </template>

                <template v-else-if="schema?.type === 'date'">
                  <template v-if="form[`${schema.field}-op`] === 'bt'">
                    <div class="shy-ui-advanced-search-item-value-range">
                      <FormItem>
                        <DatePicker
                          v-model:value.number="form[`${schema.field}-1`]"
                        />
                      </FormItem>
                      <div style="flex: 0; width: 40px; margin-right: 8px">
                        至
                      </div>
                      <FormItem>
                        <DatePicker
                          v-model:value.number="form[`${schema.field}-2`]"
                        />
                      </FormItem>
                    </div>
                  </template>

                  <template v-else>
                    <DatePicker v-model:value="form[schema.field]"></DatePicker>
                  </template>
                </template>

                <template v-else>
                  <Input v-model:value="form[schema.field]" />
                </template>
              </FormItem>
              <div>
                <slot :name="schema.field"></slot>
              </div>
            </div>
          </Col>
        </template>
      </Row>
    </Form>
    <div>
      <Space>
        <BasicButton type="primary" @click="handleSearch">查询</BasicButton>
        <BasicButton @click="handleReset">重置</BasicButton>
      </Space>
    </div>
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
  searchTypeDate
} from './data'
import { reactive, ref } from 'vue'
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

const formRef = ref()

const getSearchType = (type: 'number' | 'string' | 'date' = 'string') => {
  switch (type) {
    case 'number':
      return searchTypeNumber
    case 'string':
      return searchTypeString
    case 'date':
      return searchTypeDate
  }
}

const handleSearch = () => {
  console.log('form', form)
}

const handleReset = () => {
  formRef.value.resetFields()
}
</script>

<style scoped></style>
