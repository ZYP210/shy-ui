<template>
  <div ref="wrapRef" :class="getWrapperClass" style="position: relative">
    <div class="shy-page" style="padding: 0">
      <BasicForm
        ref="formRef"
        submitOnReset
        v-bind="getFormProps"
        v-if="getBindValues.useSearchForm"
        :tableAction="tableAction"
        @register="registerForm"
        @submit="handleSearchInfoChange"
        @advanced-change="redoHeight"
      >
        <template
          #[replaceFormSlotKey(item)]="data"
          v-for="item in getFormSlotKeys"
        >
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </BasicForm>
      <div class="relative">
        <TableAdvancedSearch
          v-show="isVisibleAdvancedSearch"
          :schemasAdvancedSearch="schemasAdvancedSearch"
          @ensure="handleAdvancedEnsure"
        ></TableAdvancedSearch>

        <TableGlobalSearch
          v-show="isVisibleGlobalSearch"
          :schemasAdvancedSearch="schemasAdvancedSearchString"
        />
        <Table
          ref="tableElRef"
          v-bind="getBindValues"
          :rowClassName="getRowClassName"
          v-show="getEmptyDataIsShowTable"
          @change="handleTableChange"
          @resizeColumn="handleResizeColumn"
          class="enter-x"
        >
          <template
            #[item]="data"
            v-for="item in Object.keys($slots)"
            :key="item"
          >
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
          <template #headerCell="{ column }">
            <HeaderCell :column="column" />
          </template>

          <template #emptyText>
            <div
              class="flex justify-center items-center"
              :style="{ height: `${getHeight.y as number - 41}px`, }"
            >
              <Empty />
            </div>
          </template>
          <!-- 增加对antdv3.x兼容 -->
          <template #bodyCell="data">
            <slot name="bodyCell" v-bind="data || {}"></slot>
          </template>
          <!--      <template #[`header-${column.dataIndex}`] v-for="(column, index) in columns" :key="index">-->
          <!--        <HeaderCell :column="column" />-->
          <!--      </template>-->
        </Table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type {
  BasicTableProps,
  TableActionType,
  SizeType,
  ColumnChangeParam
} from './types/table'

import {
  defineComponent,
  ref,
  computed,
  unref,
  toRaw,
  inject,
  watchEffect
} from 'vue'
import { Empty, Table } from 'ant-design-vue'
import { BasicForm, useForm } from '../../Form'
import { PageWrapperFixedHeightKey } from '../../Page'
import HeaderCell from './components/HeaderCell.vue'
import { BasicButton } from '../../Button'
import { InnerHandlers } from './types/table'
import { usePagination } from './hooks/usePagination'
import { useColumns } from './hooks/useColumns'
import { useDataSource } from './hooks/useDataSource'
import { useLoading } from './hooks/useLoading'
import { useRowSelection } from './hooks/useRowSelection'
import { useTableScroll } from './hooks/useTableScroll'
import { useTableScrollTo } from './hooks/useScrollTo'
import { useCustomRow } from './hooks/useCustomRow'
import { useTableStyle } from './hooks/useTableStyle'
import { useTableHeader } from './hooks/useTableHeader'
import { useTableExpand } from './hooks/useTableExpand'
import { createTableContext } from './hooks/useTableContext'
import { useTableFooter } from './hooks/useTableFooter'
import { useTableForm } from './hooks/useTableForm'
import { useAdvancedSearch } from './hooks/useAdvancedSearch'

import { omit } from 'lodash-es'
import { basicProps } from './props'
import { warn, isFunction } from '@shy-plugins/utils'
import type {} from 'csstype'
import TableAdvancedSearch from './components/TableAdvancedSearch.vue'
import TableGlobalSearch from './components/TableGlobalSearch.vue'
import { onMounted } from 'vue'

export default defineComponent({
  components: {
    TableAdvancedSearch,
    Table,
    BasicForm,
    HeaderCell,
    Empty,
    BasicButton,
    TableGlobalSearch
  },
  props: basicProps,
  emits: [
    'fetch-success',
    'fetch-error',
    'selection-change',
    'register',
    'row-click',
    'row-dbClick',
    'row-contextmenu',
    'row-mouseenter',
    'row-mouseleave',
    'edit-end',
    'edit-cancel',
    'edit-row-end',
    'edit-change',
    'expanded-rows-change',
    'change',
    'columns-change'
  ],
  setup(props, { attrs, emit, slots, expose }) {
    const tableElRef = ref(null)
    const tableData = ref<Recordable[]>([])

    const wrapRef = ref(null)
    const formRef = ref(null)
    const innerPropsRef = ref<Partial<BasicTableProps>>()

    // const { prefixCls } = useDesign('basic-table')
    const prefixCls = 'shy-basic-table'

    const [registerForm, formActions] = useForm()

    const getProps = computed(() => {
      return { ...props, ...unref(innerPropsRef) } as BasicTableProps
    })

    const isFixedHeightPage = inject(PageWrapperFixedHeightKey, false)
    watchEffect(() => {
      unref(isFixedHeightPage) &&
        props.canResize &&
        warn(
          "'canResize' of BasicTable may not work in PageWrapper with 'fixedHeight' (especially in hot updates)"
        )
    })

    const { getLoading, setLoading } = useLoading(getProps)
    const {
      getPaginationInfo,
      getPagination,
      setPagination,
      setShowPagination,
      getShowPagination
    } = usePagination(getProps)

    const {
      getRowSelection,
      getRowSelectionRef,
      getSelectRows,
      setSelectedRows,
      clearSelectedRowKeys,
      getSelectRowKeys,
      deleteSelectRowByKey,
      setSelectedRowKeys
    } = useRowSelection(getProps, tableData, emit)

    const {
      handleTableChange: onTableChange,
      getDataSourceRef,
      getDataSource,
      getRawDataSource,
      setTableData,
      updateTableDataRecord,
      deleteTableDataRecord,
      insertTableDataRecord,
      findTableDataRecord,
      fetch,
      getRowKey,
      reload,
      getAutoCreateKey,
      updateTableData
    } = useDataSource(
      getProps,
      {
        tableData,
        getPaginationInfo,
        setLoading,
        setPagination,
        getFieldsValue: formActions.getFieldsValue,
        clearSelectedRowKeys,
        getCurSearchParams
      },
      emit
    )

    function handleTableChange(...args: any[]) {
      onTableChange.call(undefined, ...args)
      emit('change', ...args)
      // 解决通过useTable注册onChange时不起作用的问题
      const { onChange } = unref(getProps)
      onChange && isFunction(onChange) && onChange.call(undefined, ...args)
    }

    const {
      getViewColumns,
      getColumns,
      setCacheColumnsByField,
      setColumns,
      getColumnsRef,
      getCacheColumns
    } = useColumns(getProps, getPaginationInfo)

    const { getScrollRef, redoHeight } = useTableScroll(
      getProps,
      tableElRef,
      getColumnsRef,
      getRowSelectionRef,
      getDataSourceRef,
      wrapRef,
      formRef
    )

    const { scrollTo } = useTableScrollTo(tableElRef, getDataSourceRef)

    const { customRow } = useCustomRow(getProps, {
      setSelectedRowKeys,
      getSelectRowKeys,
      clearSelectedRowKeys,
      getAutoCreateKey,
      emit
    })

    const { getRowClassName } = useTableStyle(getProps, prefixCls)

    const { getExpandOption, expandAll, expandRows, collapseAll } =
      useTableExpand(getProps, tableData, emit)

    const handlers: InnerHandlers = {
      onColumnsChange: (data: ColumnChangeParam[]) => {
        emit('columns-change', data)
        // support useTable
        unref(getProps).onColumnsChange?.(data)
      }
    }

    const { getHeaderProps } = useTableHeader(getProps, slots, handlers)

    const { getFooterProps } = useTableFooter(
      getProps,
      getScrollRef,
      tableElRef,
      getDataSourceRef
    )

    const {
      getFormProps,
      replaceFormSlotKey,
      getFormSlotKeys,
      handleSearchInfoChange
    } = useTableForm(getProps, slots, fetch, getLoading)

    const getBindValues = computed(() => {
      const dataSource = unref(getDataSourceRef)
      let propsData: Recordable = {
        ...attrs,

        customRow,
        ...unref(getProps),
        ...unref(getHeaderProps),
        scroll: unref(getScrollRef),
        loading: unref(getLoading),
        tableLayout: 'fixed',
        rowSelection: unref(getRowSelectionRef),
        rowKey: unref(getRowKey),
        // @ts-ignore
        columns: toRaw(unref(getViewColumns)),
        pagination: toRaw(unref(getPaginationInfo)),
        dataSource,
        footer: unref(getFooterProps),
        ...unref(getExpandOption),
        // 默认项
        showSorterTooltip: false
      }
      // if (slots.expandedRowRender) {
      //   propsData = omit(propsData, 'scroll');
      // }

      propsData = omit(propsData, ['class', 'onChange'])
      return propsData
    })

    const getWrapperClass = computed(() => {
      const values = unref(getBindValues)

      return [
        prefixCls,
        attrs.class,
        {
          [`${prefixCls}-form-container`]: values.useSearchForm,
          [`${prefixCls}-table-wrapper`]: values.useTableWrapper,
          [`${prefixCls}--inset`]: values.inset
        }
      ]
    })

    const getEmptyDataIsShowTable = computed(() => {
      const { emptyDataIsShowTable, useSearchForm } = unref(getProps)
      if (emptyDataIsShowTable || !useSearchForm) {
        return true
      }
      return !!unref(getDataSourceRef).length
    })

    // 高级搜索
    const {
      schemasAdvancedSearch,
      schemasAdvancedSearchString,
      isVisibleAdvancedSearch,
      openAdvancedSearch,
      closeAdvancedSearch,
      handleAdvancedEnsure,
      openGlobalSearch,
      closeGlobalSearch,
      isVisibleGlobalSearch,
      setGlobalSearchType,
      getGlobalSearchType,
      setGlobalSchemas,
      getGlobalSchemas,
      setGlobalSearchValue,
      getGlobalSearchValue,
      setCurSearchParams,
      getCurSearchParams: getCurSearchParamsHooks
    } = useAdvancedSearch({ getProps, reload })

    function getCurSearchParams() {
      return getCurSearchParamsHooks()
    }

    function setProps(props: Partial<BasicTableProps>) {
      innerPropsRef.value = { ...unref(innerPropsRef), ...props }
    }

    const tableAction: TableActionType = {
      reload,
      getSelectRows,
      setSelectedRows,
      clearSelectedRowKeys,
      getSelectRowKeys,
      deleteSelectRowByKey,
      setPagination,
      setTableData,
      updateTableDataRecord,
      deleteTableDataRecord,
      insertTableDataRecord,
      findTableDataRecord,
      redoHeight,
      setSelectedRowKeys,
      setColumns,
      setLoading,
      getDataSource,
      getRawDataSource,
      setProps,
      getRowSelection,
      getPaginationRef: getPagination,
      getColumns,
      getCacheColumns,
      emit,
      updateTableData,
      setShowPagination,
      getShowPagination,
      setCacheColumnsByField,
      expandAll,
      expandRows,
      collapseAll,
      scrollTo,
      getSize: () => {
        return unref(getBindValues).size as SizeType
      }
    }
    createTableContext({
      ...tableAction,
      wrapRef,
      getBindValues,
      openAdvancedSearch,
      closeAdvancedSearch,
      isVisibleAdvancedSearch,
      openGlobalSearch,
      closeGlobalSearch,
      isVisibleGlobalSearch,
      setGlobalSearchType,
      getGlobalSearchType,
      setGlobalSchemas,
      getGlobalSchemas,
      setGlobalSearchValue,
      getGlobalSearchValue,
      setCurSearchParams,
      getCurSearchParams
    })

    expose(tableAction)

    emit('register', tableAction, formActions)

    const handleResizeColumn = (w: unknown, col: { width: unknown }) => {
      col.width = w
    }

    const getHeight = computed(() => {
      return unref(getScrollRef)
    })

    return {
      formRef,
      tableElRef,
      getBindValues,
      getLoading,
      registerForm,
      handleSearchInfoChange,
      getEmptyDataIsShowTable,
      handleTableChange,
      getRowClassName,
      wrapRef,
      tableAction,
      redoHeight,
      getFormProps: getFormProps as unknown,
      replaceFormSlotKey,
      getFormSlotKeys,
      getWrapperClass,
      columns: getViewColumns,
      handleResizeColumn,
      getHeight,
      schemasAdvancedSearch,
      isVisibleAdvancedSearch,
      handleAdvancedEnsure,
      isVisibleGlobalSearch,
      schemasAdvancedSearchString
    }
  }
})
</script>
