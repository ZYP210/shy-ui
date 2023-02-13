<template>
  <Table
    :columns="getColumns"
    :data-source="state"
    :pagination="false"
    bordered
    size="small"
    class="table-children"
    align="center"
  >
    <template #headerCell="{ column }">
      <div v-if="column.dataIndex === 'index'">
        <div class="table-plus" @click="plusClickEvent">+</div>
      </div>
    </template>

    <template #bodyCell="{ column, record }">
      <Form v-if="column.dataIndex !== 'index'">
        <FormItem>
          <Select
            v-if="column.type === 'select'"
            v-model:value="record[column.dataIndex]"
            :options="column.dicData"
          />

          <DatePicker
            v-else-if="column.type === 'datePicker'"
            v-model:value="record[column.dataIndex]"
            valueFormat="YYYY-MM-DD HH:mm:ss"
            :showTime="true"
          />
          <InputNumber
            v-else-if="column.type === 'number'"
            v-model:value="record[column.dataIndex]"
          />

          <Input v-else v-model:value="record[column.dataIndex]" />
        </FormItem>
      </Form>
    </template>
  </Table>
</template>

<script setup lang="ts">
import {
  Table,
  Input,
  Form,
  FormItem,
  Select,
  DatePicker,
  InputNumber
} from 'ant-design-vue'
import { ref, unref, computed, watch } from 'vue'
import { useRuleFormItem } from '@shy-plugins/use'

const emit = defineEmits(['update:value'])

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  value: {
    type: Array,
    default: () => []
  }
})

const emitData = ref<any[]>([])
const [state] = useRuleFormItem(props, 'value', 'change', emitData)

const getColumns = computed(() => {
  const indexColumn = {
    title: '序号',
    dataIndex: 'index',
    customRender: ({ index }: { index: number }) => {
      return `${index + 1}`
    },
    width: 50,
    align: 'center'
  }
  return [indexColumn, ...props.columns] as any
})

const plusClickEvent = () => {
  //   console.log('state', unref(state))
  state.value.push({})
}

// const getData = () => {
//   return unref(data)
// }

// const setData = (value) => {
//   data.value = value
// }

const loadKv = () => {
  const columns: any = props.columns
  let dicData = []
  columns.forEach(async (column) => {
    if (column?.api) {
      dicData = await column.api()
      column.dicData = dicData
    }
  })
}

loadKv()

watch(
  () => state.value,
  (v) => {
    emit('update:value', v)
  }
)

defineExpose({})
</script>

<style scoped lang="less">
.table-plus {
  width: 30px;
  height: 30px;
  font-size: 24px;
  color: #fff;
  background-color: @primary-color;
  border-radius: 50%;
  box-sizing: border-box;
  line-height: 30px;
  cursor: pointer;
}

.table-children::v-deep(.ant-form-item) {
  margin-bottom: 0 !important;
}
</style>
