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
        <div
          v-if="isShowAction"
          class="shy-table-edit-icon-plus"
          @click="plusClickEvent"
        >
          <plus-circle-filled :style="{ color: '#006eff' }" />
        </div>
        <div v-else>序号</div>
      </div>
    </template>

    <template #bodyCell="{ column, record, index }">
      <template v-if="column.dataIndex !== 'index'">
        <Form
          :model="record"
          :ref="
            (el) => {
              if (el) listFormRefs.push(el)
            }
          "
        >
          <FormItem :rules="column?.rules || []" :name="column.dataIndex">
            <Select
              v-if="column.type === 'select'"
              v-model:value="record[column.dataIndex]"
              :options="column.dicData"
              :mode="column.mode"
              :max-tag-count="column.maxTagCount"
              :max-tag-text-length="column.maxTagTextLength"
            />

            <DatePicker
              v-else-if="column.type === 'datePicker'"
              v-model:value="record[column.dataIndex]"
              valueFormat="YYYY-MM-DD HH:mm:ss"
            />
            <InputNumber
              v-else-if="column.type === 'number'"
              v-model:value="record[column.dataIndex]"
              :min="column.min"
              :max="column.max"
              :precision="column.precision ?? 2"
            />

            <Input
              v-else
              v-model:value="record[column.dataIndex]"
              :disabled="!props.isShowAction"
            />
          </FormItem>
        </Form>
      </template>

      <div v-else class="delete-wrapper">
        <span v-if="isShowAction" class="delete-index">{{ index + 1 }}</span>

        <div
          v-if="isShowAction"
          class="delete-item"
          @click="rowClickEvent(index)"
        >
          <delete-filled :style="{ color: '#fff' }" />
        </div>

        <span v-else class="">{{ index + 1 }}</span>
      </div>
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

const emit = defineEmits(['update:value', 'change', 'add', 'remove'])
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons-vue'

const listFormRefs = ref<unknown[]>([])

const props = defineProps({
  columns: {
    type: Array as PropType<Array<any>>,
    default: () => []
  },
  value: {
    type: Array,
    default: () => []
  },
  isShowAction: {
    type: Boolean,
    default: () => true
  }
})

const emitData = ref<unknown[]>([])
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
  return [indexColumn, ...props.columns]
})

const plusClickEvent = () => {
  state.value = [{}, ...state.value]
  emit('add', state.value)
}

const rowClickEvent = (index) => {
  state.value = unref(state).filter((item, i) => {
    return index !== i
  })
  emit('remove', state.value, index)
}

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
  // { immediate: true }
)

const validate = async () => {
  try {
    for (let formRef of listFormRefs.value as { validate: () => {} }[]) {
      await formRef.validate()
    }
  } catch {
    throw new Error('校验失败')
  }
}

defineExpose({ validate })
</script>

<style scoped lang="less">
.shy-table-edit-icon-plus {
  width: 30px;
  height: 30px;
  font-size: 30px;
  cursor: pointer;
  display: flex;
}

.table-children::v-deep(.ant-form-item) {
  margin-bottom: 0 !important;
}

.delete-wrapper {
  height: 100%;

  &:hover {
    .delete-item {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .delete-index {
      display: none;
    }
  }

  .delete-item {
    background-color: red;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    display: none;
    cursor: pointer;
  }

  .delete-index {
    display: inline-block;
  }
}
</style>
