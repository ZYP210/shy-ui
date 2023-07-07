<template>
  <div :class="getClassName('wrapper')">
    <template v-if="getProps.isShowSearch">
      <div :class="getClassName('search')">
        <BasicForm
          v-bind="getFormConfig"
          @register="registerForm"
          @submit="handleSearchFormSubmit"
          @reset="handleSearchFormSubmit"
          @advanced-change="() => {}"
        >
        </BasicForm>
      </div>
    </template>
    <div v-if="getProps.isShowToolbar" :class="getClassName('toolbar')">
      <slot name="toolbar"> </slot>
    </div>
    <div :class="getClassName('body')">
      <vxe-table
        ref="tableRef"
        v-bind="getBindValues"
        :data="dataSource"
        @checkbox-all="handleCheckboxChange"
        @checkbox-change="handleCheckboxChange"
        @radio-change="handleRadioChange"
        show-overflow
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

        <template v-for="(column, index) in getColumns" :key="index">
          <vxe-column
            v-bind="column"
            :edit-render="column?.editRender || undefined"
          >
            <template #default="config">
              <slot :name="column.field" v-bind="config">
                <template v-if="config.row._isEdit && column?.isEdit">
                  <CellComponent
                    v-bind="column?.editProps || {}"
                    v-model:value="config.row[column.field]"
                  />
                </template>

                <template v-else>
                  <span
                    v-if="
                      (column?.isEdit &&
                        column?.editProps?.component === 'Select') ||
                      column?.editProps?.component === 'ApiSelect'
                    "
                  >
                    <CellComponent
                      v-bind="column?.editProps || {}"
                      v-model:value="config.row[column.field]"
                      :bordered="false"
                      :showArrow="false"
                      :open="false"
                      :popoverVisible="false"
                    />
                  </span>
                  <span v-else>
                    {{ config.row[column.field] }}
                  </span>
                </template>
              </slot>
            </template>

            <template #header>
              <slot :name="`${column.field}Header`" v-bind="{ column }">
                {{ column.title }}
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
            <div class="flex items-center justify-center">
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
          size="small"
          :total="page.total"
          v-model:current="page.current"
          v-model:page-size="page.pageSize"
          :pageSizeOptions="page.pageSizeOptions"
          show-size-changer
          show-quick-jumper
          :show-total="(total) => `共 ${total} 条数据`"
          @change="handlePageChange"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, useAttrs, computed, ref, toRaw, watchEffect } from 'vue'
import { BasicForm, useForm } from '../Form'
import { VxeColumnProps, VxeTable, VxeColumn } from 'vxe-table'
import { basicColumn, basicProps } from './props'
import { Pagination } from 'ant-design-vue'
import { usePagination } from './hooks/usePagination'
import { useTableData } from './hooks/useTableData'
import { CellComponent } from './components/editable/CellComponent'
import ButtonGroupEdit from './components/ButtonGroupEdit.vue'

const emits = defineEmits([
  'register',
  'selection-change',
  'row-ensure',
  'row-cancel'
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
      width: 150
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
  transDataAfterReload: () => {
    return (res) => res.records
  }
})
const innerProps = ref({})
const getProps = computed(() => {
  const tempProps: any = { ...props, ...innerProps.value }
  console.log('1', props)

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
  innerProps.value = props
}

const attrs = useAttrs()
const slots = useSlots()

const getBindValues = computed(() => {
  return {
    ...basicProps,
    ...attrs,
    ...getProps.value
  }
})

watchEffect(() => {
  getBindValues.value
  console.log(
    '🚀 ~ file: TablePlus.vue:263 ~ watchEffect ~ getBindValues:',
    getBindValues.value
  )
})

const getColumns: any = computed(() => {
  return getProps.value.columns.map((item) => {
    return { ...basicColumn, ...item }
  })
})

// pagination
const { page, setPage } = usePagination()

const handlePageChange = (current, pageSize) => {
  setPage({ current, pageSize })
  reload()
}

// form
const getFormConfig = computed(() => {
  return {
    ...getProps.value.formConfig,
    showAdvancedButton: true
  }
})

const [registerForm, formActions] = useForm()

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
    current: page.current,
    size: page.pageSize
  }
})

// dataSource
const { dataSource, setTableData, reload, getTableData } = useTableData(
  getProps,
  {
    setPage,
    params
  }
)

// checkbox radio
const tableRef = ref()
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

// register
const tableAction = {
  reload,
  setTableData,
  setProps,
  getRowSelection,
  setEditByRow,
  cancelEditByRow,
  getTableData,
  getTreeExpandRecords,
  setAllTreeExpand,
  clearTreeExpand,
  setTreeExpand,
  getVxeTableRef
}

emits('register', tableAction, formActions)
</script>

<style lang="less" scoped></style>
