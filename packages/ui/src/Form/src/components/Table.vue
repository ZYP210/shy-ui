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
      <template v-if="column.dataIndex === 'index'">
        <div
          v-if="isShowAction"
          class="shy-table-edit-icon-plus"
          @click="plusClickEvent"
        >
          <plus-circle-filled :style="{ color: '#006eff' }" />
        </div>
        <div v-else>序号</div>
      </template>

      <template v-else>
        <span v-if="column.required" class="table-children-required">*</span>
        <span>{{ column.title }}</span>
      </template>
    </template>

    <template #bodyCell="{ column, record, index }">
      <template v-if="column.dataIndex !== 'index'">
        <FormItem
          :required="column.required"
          :rules="column?.rules || []"
          :name="[$attrs.codeField, index, column.dataIndex]"
          :key="record['uuid']"
        >
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
      </template>

      <template v-else>
        <div class="table-children-delete-wrapper" :key="record['uuid']">
          <span v-if="isShowAction" class="table-children-delete-index">
            {{ index + 1 }}
          </span>

          <div
            v-if="isShowAction"
            class="table-children-delete-item"
            @click="rowClickEvent(record['uuid'])"
          >
            <delete-filled :style="{ color: '#fff' }" />
          </div>

          <span v-else class="table-children-delete-index">
            {{ index + 1 }}
          </span>
        </div>
      </template>
    </template>
  </Table>
</template>

<script setup lang="ts">
import {
  Table,
  Input,
  // Form,
  FormItem,
  Select,
  DatePicker,
  InputNumber
} from 'ant-design-vue'
import { ref, computed, watch } from 'vue'
import { useRuleFormItem } from '@shy-plugins/use'

const emit = defineEmits(['update:value', 'change', 'add', 'remove'])
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons-vue'
import { buildUUID } from '@shy-plugins/utils'

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
  state.value = [{ uuid: buildUUID() }, ...state.value]
  emit('add', state.value)
}

const rowClickEvent = (index) => {
  const tempState = state.value.filter((item: any) => {
    return item['uuid'] !== index
  })
  tempState.forEach((item: any) => (item['uuid'] = buildUUID()))
  state.value = [...tempState]
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
  },
  {
    deep: true
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

.table-children {
  &-required {
    color: #ff4d4f;
    margin-right: 4px;
  }

  :deep(.ant-table-cell) {
    padding: 8px !important;

    // .ant-form * {
    //   border: none !important;
    // }

    .ant-form-item-explain {
      display: none;
    }
  }

  &-delete-wrapper {
    display: flex;
    height: 100%;
    justify-content: center;

    &:hover {
      .table-children-delete-item {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .table-children-delete-index {
        display: none;
      }
    }
  }

  &-delete-item {
    background-color: red;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    display: none;
    cursor: pointer;
  }

  &-delete-index {
    user-select: none;
    display: inline-block;
  }
}
</style>
