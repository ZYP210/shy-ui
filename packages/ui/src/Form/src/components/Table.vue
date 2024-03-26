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
        <span
          v-if="column.required || column?.rules?.length"
          class="table-children-required"
          >*</span
        >
        <span>{{ column.title }}</span>
      </template>
    </template>

    <template #bodyCell="{ column, record, index, ...args }">
      <template v-if="column.dataIndex !== 'index' && column.type !== 'text'">
        <FormItem
          :required="column.required"
          :rules="column?.rules || []"
          :name="[$attrs.codeField, index, column.dataIndex]"
          :key="record[rowKey]"
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
            v-else-if="column.type === 'input'"
            v-model:value="record[column.dataIndex]"
            :disabled="!props.isShowAction"
          />
          <component
            v-else
            allowClear
            :getPopupContainer="getPopupContainer"
            :style="{ width: '100%' }"
            v-bind="
              isFunction(column.componentProps)
                ? column.componentProps({ record, column, index, ...args })
                : column.componentProps
            "
            v-model:value="record[column.dataIndex]"
            :is="componentMap.get(column.type)"
          />
        </FormItem>
      </template>

      <template v-else-if="column.dataIndex === 'index'">
        <div class="table-children-delete-wrapper" :key="record[rowKey]">
          <span v-if="isShowAction" class="table-children-delete-index">
            {{ index + 1 }}
          </span>

          <div
            v-if="isShowAction"
            class="table-children-delete-item"
            @click="rowClickEvent(record[rowKey])"
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
  FormItem,
  Select,
  DatePicker,
  InputNumber
} from 'ant-design-vue'
import { ref, computed, watch, toRaw } from 'vue'
import { useRuleFormItem } from '@shy-plugins/use'
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons-vue'
import { buildUUID, isFunction } from '@shy-plugins/utils'
import { componentMap } from '../componentMap'
import { isEqual } from 'lodash-es'

const emit = defineEmits(['update:value', 'change', 'add', 'remove'])

const listFormRefs = ref<unknown[]>([])

const props = defineProps({
  rowKey: {
    type: String,
    default: () => 'uuid'
  },
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
  return [
    indexColumn,
    ...props.columns.map((item: any) => ({
      ...item,
      type: item.type ? item.type : 'input'
    }))
  ]
})

const plusClickEvent = () => {
  state.value = [{ [props.rowKey]: buildUUID() }, ...toRaw(state.value)]
  emit('add', state.value)
}

const rowClickEvent = (index) => {
  const tempState = state.value.filter((item: any) => {
    return item[props.rowKey] !== index
  })
  tempState.forEach((item: any) => (item[props.rowKey] = buildUUID()))
  state.value = [...tempState]
  emit('remove', state.value, index)
}

const getPopupContainer = () => document.body

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
  (v, old) => {
    if (!isEqual(toRaw(v), toRaw(old))) {
      emit(
        'update:value',
        toRaw(v).map((ele: any) => {
          return {
            ...ele,
            [props.rowKey]: ele[props.rowKey] || buildUUID()
          }
        })
      )
    }
  },
  {
    deep: true,
  }
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
