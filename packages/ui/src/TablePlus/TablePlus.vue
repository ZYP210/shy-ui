<template>
  <div :class="getClassName('wrapper')" class="ant-table-form-container">
    <template v-if="getProps.isShowSearch">
      <div :class="getClassName('search')">
        <ShyForm
          v-bind="getFormConfig"
          @register="registerForm"
          @submit="handleSearchFormSubmit"
          @reset="handleSearchFormSubmit"
          @advanced-change="() => {}"
        >
          <template
            #[replaceFormSlotKey(item)]="data"
            v-for="item in getFormSlotKeys"
          >
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </ShyForm>
      </div>
    </template>
    <div v-if="getProps.isShowToolbar" :class="getClassName('toolbar')">
      <div :class="getClassName('toolbar-left')">
        <slot name="toolbar"> </slot>
      </div>
      <div :class="getClassName('toolbar-right')">
        <slot name="tableSetting"></slot>
        <!-- <TableSetting /> -->
      </div>
    </div>
    <div :class="getClassName('body')">
      <vxe-table
        ref="tableRef"
        v-bind="getBindValues"
        :data="dataSource"
        @checkbox-all="handleCheckboxChange"
        @checkbox-change="handleCheckboxChange"
        @radio-change="handleRadioChange"
        :column-config="{ resizable: true }"
      >
        <vxe-column
          fixed="left"
          v-if="
            getProps?.configRowSelection?.type === 'checkbox' &&
            getProps?.isShowRowSelection
          "
          type="checkbox"
          width="60"
          align="center"
        />
        <vxe-column
          fixed="left"
          v-if="
            getProps?.configRowSelection?.type === 'radio' &&
            getProps?.isShowRowSelection
          "
          type="radio"
          width="60"
          align="center"
        />

        <vxe-column
          v-if="getProps.isShowSeq"
          type="seq"
          width="60"
          align="center"
          title="序号"
          v-bind="getProps.columnSeq"
        />

        <template v-for="column in getColumnsRef" :key="column.field">
          <TableColGroup
            v-if="column?.groupName"
            :column="column"
            @handleSortChange="handleSortChange"
          >
            <template
              v-for="c in column.children"
              #[`${column.field}-${c.field}`]="config"
              :key="`${column.field}-${c.field}`"
            >
              <slot :name="`${column.field}-${c.field}`" v-bind="config" />
            </template>
          </TableColGroup>

          <vxe-column
            v-else
            v-bind="column"
            :edit-render="column?.editRender || undefined"
          >
            <template #default="config">
              <slot :name="column.field" v-bind="config">
                <template v-if="config.row._isEdit && column?.isEdit">
                  <template
                    v-if="column?.editComponentProps?.component === 'Switch'"
                  >
                    <CellComponent
                      :checkedValue="1"
                      :unCheckedValue="0"
                      v-bind="column?.editComponentProps || {}"
                      v-model:checked="config.row[column.field]"
                    />
                  </template>

                  <template v-else>
                    <CellComponent
                      v-bind="column?.editComponentProps || {}"
                      v-model:value="config.row[column.field]"
                    />
                  </template>
                </template>

                <template v-else>
                  <span
                    v-if="
                      (column?.isEdit &&
                        column?.editComponentProps?.component === 'Select') ||
                      column?.editComponentProps?.component === 'ApiSelect'
                    "
                  >
                    <CellComponent
                      v-bind="column?.editComponentProps || {}"
                      v-model:value="config.row[column.field]"
                      :bordered="false"
                      :showArrow="false"
                      :open="false"
                      :popoverVisible="false"
                    />
                  </span>

                  <span
                    v-else-if="
                      column?.isEdit &&
                      column?.editComponentProps?.component === 'Switch'
                    "
                  >
                    <span>{{ getSwitchShowText(column, config.row) }}</span>
                  </span>
                  <span v-else>
                    {{ config.row[column.field] }}
                  </span>
                </template>
              </slot>
            </template>

            <template #header>
              <slot :name="`${column.field}Header`" v-bind="{ column }">
                <div style="display: flex; justify-content: space-between">
                  <div>{{ column.title }}</div>
                  <IconSort
                    v-if="column?.sortable"
                    @change="(type) => handleSortChange(column.field, type)"
                  />
                </div>
              </slot>
            </template>
          </vxe-column>
        </template>

        <vxe-column
          v-if="getProps.isShowAction"
          title="操作"
          field="action"
          align="center"
          v-bind="getProps.actionColumn"
        >
          <template #default="config">
            <div class="flex items-center">
              <slot name="action" v-bind="config">
                <ButtonGroupEdit
                  v-if="getProps.isUseDefaultEditAction"
                  :row="config.row"
                  @edit-ensure="handleEditEnsure(config.row)"
                  @edit-cancel="handleEditCancel(config.row)"
                  @updateStatusEdit="
                    (isEdit) => {
                      config.row._isEdit = isEdit
                    }
                  "
                  @row-remove="handleRowRemove(config.row)"
                  :style="{ width: '100%' }"
                />
              </slot>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <template v-if="page.total !== 0 && getProps.isShowPagination">
      <div :class="getClassName('pagination')">
        <Pagination
          :total="page.total"
          v-model:current="page.current"
          v-model:page-size="page.pageSize"
          :pageSizeOptions="page.pageSizeOptions"
          show-size-changer
          :show-total="(total) => `共 ${total} 条数据`"
          @change="handlePageChange"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, useAttrs, computed, ref, toRaw, unref } from 'vue'
import { ShyForm, useShyForm } from '../ShyForm'
import { VxeColumnProps, VxeTable, VxeColumn } from 'vxe-table'
import { basicProps } from './props'
import { Pagination } from 'ant-design-vue'
import { usePagination } from './hooks/usePagination'
import { useTableData } from './hooks/useTableData'
import { CellComponent } from './components/editable/CellComponent'
import ButtonGroupEdit from './components/ButtonGroupEdit.vue'
import TableColGroup from './TableColGroup.vue'

import {
  createTableContext,
  Instance
} from '../ShyTable/src/hooks/useShyTableContext'
import { deepMergeObjects } from '@shy-plugins/utils'
import { useColumns } from './hooks/useColumns'
import { useSort } from './hooks/useSort'
import IconSort from './components/Icon/Sort.vue'
import { watchEffect } from 'vue'

const emits = defineEmits([
  'register',
  'selection-change',
  'row-ensure',
  'row-cancel',
  'row-remove'
])

type Props = {
  api?: any
  columns?: VxeColumnProps[]
  isShowSeq?: boolean
  isCompatible?: boolean
  actionColumn?: VxeColumnProps
  isShowSearch?: boolean
  isShowRowSelection?: boolean
  isShowAction?: boolean
  isShowPagination?: boolean
  isUseDefaultEditAction?: boolean
  isShowToolbar?: boolean
  isImmediate?: boolean
  configRowSelection?: any
  formConfig?: any
  searchInfo?: any
  transSearchInfoBeforeReload?: any
  isUseEdit?: boolean
  columnSeq: any
  transDataAfterReload?: any
  beforeFetch?: any
}

const prefixCls = 'shy-basic-table-plus'

const getClassName = (className) => {
  return `${prefixCls}-${className}`
}
// props
const props = withDefaults(defineProps<Props>(), {
  columns: () => [] as VxeColumnProps[],
  isShowSeq: true,
  isShowSearch: true,
  isShowAction: true,
  isShowRowSelection: true,
  isUseDefaultEditAction: false,
  isShowToolbar: true,
  isShowPagination: true,
  formConfig: {},
  isCompatible: false,
  configRowSelection: {
    type: 'checkbox'
  },
  isImmediate: true,
  searchInfo: {},
  actionColumn: () => {
    return {
      title: '操作',
      field: 'action',
      width: 150,
      fixed: 'right'
    }
  },
  columnSeq: () => {
    return {}
  },
  transSearchInfoBeforeReload: () => {
    return (form) => {
      return form
    }
  },
  beforeFetch: (params) => {
    return (params) => {
      return params
    }
  }
})
const innerProps = ref({})
const getProps = computed(() => {
  const tempProps: any = { ...props, ...innerProps.value }

  if (tempProps.isCompatible) {
    tempProps.columns.forEach((column) => {
      column.field = column.dataIndex
    })
    return tempProps
  } else {
    return tempProps
  }
})
const setProps = (props) => {
  innerProps.value = deepMergeObjects(innerProps.value, props)
}

// TODO
// const getActionColumnAlign = computed(() => {
//   return getProps?.actionColumn?.align ?? 'left'
// })

const attrs = useAttrs()
const slots = useSlots()

const getBindValues = computed(() => {
  return deepMergeObjects(basicProps, attrs, getProps.value)
})

// pagination
const { page, setPage } = usePagination()

const handlePageChange = (current, pageSize) => {
  setPage({ current, pageSize })
  reload()
}
// sort
const { formSearchSort, formSortStatus } = useSort()
const handleSortChange = (field, type) => {
  formSortStatus[field] = type
  reload()
}

// form
const getFormConfig = computed(() => {
  return {
    ...getProps.value.formConfig,
    showActionButtonGroup: true,
    // rowProps: { gutter: 20 },
    layout: 'horizontal',
    formLabelInInput: true,
    tableAction: tableAction,
    autoAdvancedLine: 1,
    compact: true
  }
})

const getFormSlotKeys = computed(() => {
  const keys = Object.keys(slots)
  return keys
    .map((item) => (item.startsWith('form-') ? item : null))
    .filter((item) => !!item) as string[]
})

function replaceFormSlotKey(key: string) {
  if (!key) return ''
  return key?.replace?.(/form-/, '') ?? ''
}

const [registerForm, formActions] = useShyForm()

const formSearch = ref({})
// 查询点击事件
const handleSearchFormSubmit = (form) => {
  formSearch.value = getProps.value.transSearchInfoBeforeReload(form)
  reload()
}

const params = computed(() => {
  return {
    ...getProps.value.searchInfo,
    ...formSearch.value,
    ...formSearchSort.value,
    current: page.current,
    size: page.pageSize
  }
})

// dataSource
const tableRef = ref()
const { dataSource, setTableData, reload, getTableData, addTableData } =
  useTableData(getProps, {
    setPage,
    params,
    tableRef
  })

const getSwitchShowText = (column: any, row: any) => {
  const {
    unCheckedChildren = '否',
    unCheckedValue = 0,
    checkedChildren = '是',
    checkedValue = 1
  } = column?.editComponentProps || {}

  if (row[column.field] == checkedValue) {
    return checkedChildren
  } else if (row[column.field] == unCheckedValue) {
    return unCheckedChildren
  } else {
    return ''
  }
}

// checkbox radio
const handleCheckboxChange = () => {
  const records = tableRef.value.getCheckboxRecords()
  emits('selection-change', records)
}

const handleRadioChange = () => {
  const records = tableRef.value.getRadioRecord()
  emits('selection-change', records)
}

const getRowSelection = () => {
  if (getProps.value.configRowSelection.type === 'checkbox') {
    return toRaw(tableRef.value.getCheckboxRecords())
  } else {
    return toRaw(tableRef.value.getRadioRecord())
  }
}

const setEditByRow = (row) => {
  row._isEdit = true
}

const cancelEditByRow = (row) => {
  row._isEdit = false
}

const handleEditEnsure = (row) => {
  emits('row-ensure', row)
}
const handleEditCancel = (row) => {
  emits('row-cancel', row)
}

const handleRowRemove = (row) => {
  emits('row-remove', row)
}

const getTreeExpandRecords = () => {
  return toRaw(tableRef.value.getTreeExpandRecords())
}

const setAllTreeExpand = () => {
  return toRaw(tableRef.value.setAllTreeExpand(true))
}

const clearTreeExpand = () => {
  return toRaw(tableRef.value.clearTreeExpand())
}

const setTreeExpand = (rows, checked) => {
  return toRaw(tableRef.value.setTreeExpand(rows, checked))
}

const getVxeTableRef = () => {
  return tableRef.value
}

const setSelectRowByKeys = (keys, checked) => {
  const rows: any = []
  keys.forEach((key) => {
    const row = tableRef.value.getRowById(key)
    rows.push(row)
  })
  tableRef.value.setCheckboxRow(rows, checked)
}

const {
  getColumnsRef,
  getColumns,
  hideColumn,
  showColumn,
  resetColumn,
  refreshColumn
} = useColumns(getProps, tableRef)

watchEffect(() => {
  // console.log('getColumnsRef', getColumnsRef.value)
})

// register
const tableAction: Instance = {
  reload,
  setTableData,
  setProps,
  getProps,
  getBindValues,
  getRowSelection,
  setEditByRow,
  cancelEditByRow,
  getTableData,
  getTreeExpandRecords,
  setAllTreeExpand,
  clearTreeExpand,
  setTreeExpand,
  getVxeTableRef,
  setSelectRowByKeys,
  getSize: () => {
    return unref(getBindValues).size
  },
  getColumns,
  hideColumn,
  showColumn,
  resetColumn,
  refreshColumn,
  addTableData
} as Instance

createTableContext({ ...tableAction })

emits('register', tableAction, formActions)
</script>

<style lang="less" scoped></style>
