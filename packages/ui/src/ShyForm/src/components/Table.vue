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
          :rules="getRules({ column, record, index, ...args })"
          :name="[$attrs.codeField, index, column.dataIndex]"
          :key="record[rowKey]"
        >
          <Popover
            overlayClassName="table-children-err-popover"
            :visible="
              !!rulesRef?.[`${column.dataIndex}-${record.uuid}Info`]?.show &&
              !isScroll
            "
          >
            <template #content>
              <span class="text-red-500">
                {{ rulesRef[`${column.dataIndex}-${record.uuid}Info`]?.msg }}
              </span>
            </template>
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
              :is="ShyComponentMap.get(column.type)"
            />
          </Popover>
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
import { ref, computed, watch, toRaw, inject } from 'vue'
import { useRuleFormItem } from '@shy-plugins/use'
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons-vue'
import { buildUUID, isFunction } from '@shy-plugins/utils'
import { ShyComponentMap } from '../ShyComponentMap'
import { cloneDeep, isArray, isEqual } from 'lodash-es'
import { FormActionType } from '../types/form'
import { Popover } from 'ant-design-vue'
import { reactive } from 'vue'
import { onMounted } from 'vue'
import { onUnmounted } from 'vue'

const formActionType: FormActionType = inject('formActionType')!
const emit = defineEmits(['update:value', 'change', 'add', 'remove'])

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

const rulesRef = reactive({})
const getRules = ({ column, record, index, ...args }) => {
  const errKey = `${column.dataIndex}-${record.uuid}Info`
  if (!column.required) return []
  if (rulesRef[errKey]?.rules) return rulesRef[errKey]?.rules
  rulesRef[errKey] = {
    rules: [],
    show: false,
    msg: ''
  }
  if (!column.rules && column.required) {
    rulesRef[errKey].rules = [
      {
        required: true,
        validator: (rule, value) => {
          const prefix = column.type.toLocaleLowerCase().includes('input')
            ? '请输入'
            : '请选择'
          const errMsg = `${prefix}${column.title}`
          if (value) {
            rulesRef[errKey].show = false
            return Promise.resolve()
          }
          rulesRef[errKey].show = true
          rulesRef[errKey].msg = errMsg
          return Promise.reject(errMsg)
        }
      }
    ]
    return rulesRef[errKey].rules
  }
  if (!isArray(column.rules)) return column.rules
  rulesRef[errKey].rules = cloneDeep(column.rules)
  rulesRef[errKey].rules.forEach((item) => {
    if (!item.validator || !isFunction(item.validator)) return
    const validator = item.validator
    item.validator = async (rule, value) => {
      try {
        rulesRef[errKey].show = false
        return await validator(
          rule,
          value,
          { column, record, ...args },
          formActionType
        )
      } catch (error) {
        rulesRef[errKey].show = true
        rulesRef[errKey].msg = error
        return Promise.reject(error)
      }
    }
  })
  return rulesRef[errKey].rules
}

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
    deep: true
  }
)

const isScroll = ref(false)
const timer = ref<NodeJS.Timeout>()
onMounted(() => {
  window.addEventListener(
    'scroll',
    (e) => {
      clearTimeout(timer.value)
      timer.value = setTimeout(() => {
        isScroll.value = false
      }, 500)
      if (isScroll.value) return
      isScroll.value = true
    },
    true
  )
})
onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
})

// 冗余代码
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
const listFormRefs = ref<unknown[]>([])
const validate = async () => {
  try {
    for (let formRef of listFormRefs.value as { validate: () => {} }[]) {
      await formRef.validate()
    }
  } catch {
    throw new Error('校验失败')
  }
}
loadKv()
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
