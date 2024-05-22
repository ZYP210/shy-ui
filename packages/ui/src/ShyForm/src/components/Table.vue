<template>
  <Table
    ref="tableElRef"
    :columns="getColumns"
    :scroll="{
      x: getScrollX
    }"
    :data-source="state"
    :pagination="false"
    :bordered="false"
    size="small"
    class="table-children"
    align="center"
  >
    <template #headerCell="{ column }">
      <span
        v-if="column.required || column?.rules?.length"
        class="table-children-required"
        >*</span
      >
      <span>{{ column.title }}</span>
    </template>

    <template #bodyCell="{ column, record, index, ...args }">
      <template
        v-if="
          column.dataIndex !== 'index' &&
          column.type !== 'text' &&
          column.dataIndex !== '_action'
        "
      >
        <FormItem
          :required="column.required"
          :rules="getRules({ column, record, index, ...args })"
          :name="[$attrs.codeField, index, column.dataIndex]"
          :key="record[rowKey]"
        >
          <Popover
            overlayClassName="table-children-err-popover"
            :visible="
              !!rulesRef?.[`${column.dataIndex}-${record[props.rowKey]}Info`]
                ?.show && !isScroll
            "
          >
            <template #content>
              <span class="text-red-500">
                {{
                  rulesRef[`${column.dataIndex}-${record[props.rowKey]}Info`]
                    ?.msg
                }}
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

      <template v-if="column.dataIndex === '_action'">
        <ShyTableAction :actions="getActions(record)" />
      </template>
    </template>
  </Table>
  <div class="table-children-add-btn">
    <BasicButton @click="plusClickEvent" type="dashed"> 新增 </BasicButton>
  </div>
  <div class="w-full h-[fit-content] py-8px flex justify-end items-center">
    <component :is="h('span', null, footerRender())"></component>
  </div>
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
import { ref, computed, watch, toRaw, inject, VNode, h, unref } from 'vue'
import { useRuleFormItem } from '@shy-plugins/use'

import { buildUUID, isFunction } from '@shy-plugins/utils'
import { ShyComponentMap } from '../ShyComponentMap'
import { cloneDeep, isArray, isEqual } from 'lodash-es'
import { FormActionType } from '../types/form'
import { Popover } from 'ant-design-vue'
import { reactive } from 'vue'
import { onMounted } from 'vue'
import { onUnmounted } from 'vue'
import { ShyTableAction } from '../../../ShyTable'
import { BasicButton } from '../../../Button'

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
  isShowFooter: {
    type: Boolean,
    default: () => false
  },
  footerRender: {
    type: Function as PropType<() => VNode | VNode[] | string | number>,
    default: () => ''
  },
  isShowAction: {
    type: Boolean,
    default: () => true
  },
  tableAction: {
    type: Function,
    default: (res) => {
      return []
    }
  }
})

const tableElRef = ref()

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

  const actionColumn = {
    title: '操作',
    dataIndex: '_action',
    width: 80,
    align: 'center'
  }

  return [
    indexColumn,
    ...props.columns.map((item: any) => ({
      ...item,
      type: item.type ? item.type : 'input'
    })),
    ...(props?.isShowAction ? [actionColumn] : [])
  ]
})

const getScrollX = computed(() => {
  let width = 0

  // TODO props ?? 0;
  const NORMAL_WIDTH = 150

  const columns = unref(props.columns).filter((item) => !item.defaultHidden)
  columns.forEach((item) => {
    width += Number.parseFloat(item.width as string) || 0
  })
  const unsetWidthColumns = columns.filter(
    (item) => !Reflect.has(item, 'width')
  )

  const len = unsetWidthColumns.length
  if (len !== 0) {
    width += len * NORMAL_WIDTH
  }

  const table = unref(tableElRef)
  const tableWidth = table?.$el?.offsetWidth ?? 0

  return tableWidth > width ? '100%' : width
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
  const errKey = `${column.dataIndex}-${record[props.rowKey]}Info`
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

const getActions = (record) => {
  return [
    {
      label: '删除',
      popConfirm: {
        title: '确定删除',
        confirm: rowClickEvent.bind(null, record[props.rowKey])
      }
    },
    ...props.tableAction(record)
  ]
}

watch(
  () => state.value,
  (v, old) => {
    if (!isEqual(toRaw(v), toRaw(old))) {
      state.value = toRaw(v).map((ele: any) => {
        return {
          ...ele,
          [props.rowKey]: ele[props.rowKey] || buildUUID()
        }
      })
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
  width: 100%;

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
}

.table-children-add-btn {
  display: flex;
  align-items: center;
  padding-inline: 8px;
  height: 50px;
  border-inline: 1px solid var(--gray-2);
  border-bottom: 1px solid var(--gray-2);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  ::v-deep(.ant-btn) {
    width: 100%;
  }
}
</style>
