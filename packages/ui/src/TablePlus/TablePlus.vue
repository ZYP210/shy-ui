<template>
  <div :class="getClassName('wrapper')">
    <div v-if="getProps.isShowSearch" :class="getClassName('search')">
      <BasicForm
        @register="registerForm"
        @submit="handleSearchFormSubmit"
        @reset="handleSearchFormSubmit"
      ></BasicForm>
    </div>
    <div :class="getClassName('toolbar')">
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
      >
        <vxe-column
          v-if="getProps.configRowSelection.type === 'checkbox'"
          type="checkbox"
          width="60"
          align="center"
        />
        <vxe-column v-else type="radio" width="60" align="center" />

        <vxe-column
          type="seq"
          width="60"
          align="center"
          title="序号"
        ></vxe-column>
        <template v-for="(column, index) in getColumns" :key="index">
          <vxe-column v-bind="column">
            <template #default="config">
              <slot :name="column.field" v-bind="config">{{
                config.row[column.field]
              }}</slot>
            </template>
          </vxe-column>
        </template>

        <vxe-column
          title="操作"
          field="action"
          align="center"
          v-bind="getProps.actionColumn"
        >
          <slot name="action"></slot>
        </vxe-column>
      </vxe-table>
    </div>
    <template v-if="page.total !== 0">
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
import 'vxe-table/lib/style.css'
import { useSlots, useAttrs, computed, ref, watch, unref, toRaw } from 'vue'
import { BasicForm, useForm } from '../Form'
import { VxeTable, VxeColumn, VxeColumnProps } from 'vxe-table'
import { basicColumn, basicFormConfig, basicProps } from './props'
import { Pagination } from 'ant-design-vue'
import { usePagination } from './hooks/usePagination'

const emits = defineEmits(['register', 'selection-change'])

interface Props {
  api?: any
  columns: VxeColumnProps[]
  isSeq?: boolean
  isCompatible?: boolean
  actionColumn?: VxeColumnProps
  isShowSearch?: boolean
  isShowRowSelection?: boolean
  isShowAction: boolean
  configRowSelection: any
  formConfig?: any
}

const prefixCls = 'shy-basic-table-plus'

const getClassName = (className) => {
  return `${prefixCls}-${className}`
}

// props

const props = withDefaults(defineProps<Props>(), {
  columns: () => [] as VxeColumnProps[],
  isSeq: true,
  isShowSearch: true,
  isShowAction: true,
  formConfig: {},
  isCompatible: false,
  configRowSelection: {
    type: 'checkbox'
  },
  actionColumn: () => {
    return {
      title: '操作',
      field: 'action',
      width: 60
    }
  }
})
const innerProps = ref({})
const getProps = computed(() => {
  const tempProps = { ...props, ...innerProps.value }
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
    ...getProps
  }
})

const getColumns = computed(() => {
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
    ...props.formConfig,
    showAdvancedButton: true
  }
})

const [registerForm] = useForm({
  ...basicFormConfig,
  ...getFormConfig.value
})

const searchInfo = ref({})
const formSearch = ref({})
// 查询点击事件
const handleSearchFormSubmit = (form) => {
  formSearch.value = form
  reload()
}

const params = computed(() => {
  return {
    ...searchInfo.value,
    ...formSearch.value,
    current: page.current,
    size: page.pageSize
  }
})

// dataSource

const dataSource = ref([])
const setTableData = (data) => {
  dataSource.value = data
}
const reload = async () => {
  if (getProps.value?.api) {
    const res = await getProps.value.api(params.value)
    setTableData(res.records)
    setPage({ total: res?.total || 0 })
  }
}

watch(getProps, () => {
  reload()
})

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

// register
const tableAction = {
  reload,
  setTableData,
  setProps,
  getRowSelection
}

emits('register', tableAction, {})
</script>
<style lang="less" scoped></style>
