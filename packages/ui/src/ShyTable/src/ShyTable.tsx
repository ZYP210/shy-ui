import type {
  ShyTableProps,
  TableActionType,
  SizeType,
  ColumnChangeParam,
  InnerHandlers,
} from './types/table'
import {
  Empty,
  Table,
  TableSummary,
  TableSummaryCell,
  TableSummaryRow
} from 'ant-design-vue'
import { computed, defineComponent, nextTick, ref, toRaw, unref } from 'vue'
import { useDesign } from '@shy-plugins/use'
import { shyTableBasicProps } from './props'
import { omit } from 'lodash-es'
import { ShyForm, useShyForm } from '../../ShyForm'
import { useGlobalConfig } from '../../../config/index'
import { useTableForm } from './hooks/useShyTableForm'
import { useLoading } from './hooks/useLoading'
import { usePagination } from './hooks/usePagination'
import { useRowSelection } from './hooks/useRowSelection'
import { useDataSource } from './hooks/useDataSource'
import { createTableContext } from './hooks/useShyTableContext'
import { useAdvancedSearch } from './hooks/useAdvancedSearch'
import { useCustomRow } from './hooks/useCustomRow'
import { useTableStyle } from './hooks/useTableStyle'
import { useTableExpand } from './hooks/useTableExpand'
import { useTableHeader } from './hooks/useTableHeader'
import { useColumns } from './hooks/useColumns'
import { useTableScroll } from './hooks/useTableScroll'
import { useTableScrollTo } from './hooks/useScrollTo'
import TableAdvancedSearch from './components/TableAdvancedSearch.vue'
import TableGlobalSearch from './components/TableGlobalSearch.vue'
import HeaderCell from './components/HeaderCell.vue'
import { isFunction } from '@vueuse/core'
import ShyTableFooter from './components/ShyTableFooter'
import './style/table.less'

const ShyTable = defineComponent({
  name: 'ShyTable',
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
  props: shyTableBasicProps,
  setup(props, { attrs, slots, emit, expose }) {
    const { prefixCls } = useDesign('ant-table')
    const getWrapperClass = computed(() => {
      return [
        prefixCls,
        attrs.class,
        {
          [`${prefixCls}-form-container`]: props.useSearchForm,
          [`${prefixCls}-wrapper`]: props.useTableWrapper,
          [`${prefixCls}--inset`]: props.inset
        }
      ]
    })

    const tableElRef = ref(null)
    const tableData = ref<Recordable[]>([])

    const wrapRef = ref()
    const formRef = ref()
    const innerPropsRef = ref<Partial<ShyTableProps>>()

    const { config } = useGlobalConfig('table')
    const getProps = computed(() => {
      return { ...props, ...config, ...unref(innerPropsRef) } as ShyTableProps
    })
    const getBindValues = computed(() => {
      const dataSource = unref(getDataSourceRef)
      let propsData: Recordable = {
        ...attrs,
        customRow,
        ...unref(getProps),
        scroll: unref(getScrollRef),
        loading: unref(getLoading),
        tableLayout: 'fixed',
        rowSelection: unref(getRowSelectionRef),
        rowKey: unref(getRowKey),
        columns: toRaw(unref(getViewColumns)),
        dataSource,
        ...unref(getExpandOption),
        // 默认项
        showSorterTooltip: false
      }

      propsData = omit(propsData, ['class', 'onChange', 'title'])
      return propsData
    })

    const { getLoading, setLoading } = useLoading(getProps)

    const [registerForm, formActions] = useShyForm()

    const setProps = (props: Partial<ShyTableProps>) => {
      innerPropsRef.value = { ...unref(innerPropsRef), ...props }
    }

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
      updateTableData,
      summaryTotalData
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

    const {
      schemasAdvancedSearch,
      schemasAdvancedSearchGlobal,
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

    const tableActionRef = computed(() => tableAction)
    const {
      getViewColumns,
      getColumns,
      setCacheColumnsByField,
      setColumns,
      getColumnsRef,
      getCacheColumns,
      getColumnsSummary
    } = useColumns(getProps, getPaginationInfo, tableActionRef, wrapRef)
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

    const { getExpandOption, expandAll, expandRows, collapseAll } =
      useTableExpand(getProps, tableData, emit)

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
      scrollTo: scrollTo,
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

    const {
      getFormProps,
      replaceFormSlotKey,
      getFormSlotKeys,
      handleSearchInfoChange
    } = useTableForm(getProps, slots, fetch, getLoading)

    const { customRow } = useCustomRow(getProps, {
      setSelectedRowKeys,
      getSelectRowKeys,
      clearSelectedRowKeys,
      getAutoCreateKey,
      emit
    })

    const { getRowClassName } = useTableStyle(getProps, prefixCls)

    const handlers: InnerHandlers = {
      onColumnsChange: (data: ColumnChangeParam[]) => {
        emit('columns-change', data)
        // support useTable
        unref(getProps).onColumnsChange?.(data)
      }
    }

    const { getHeaderProps } = useTableHeader(getProps, slots, handlers)

    function getCurSearchParams() {
      return getCurSearchParamsHooks()
    }

    function handleTableChange(
      ...args: [
        any,
        any,
        any,
        any
      ]
    ) {
      onTableChange.call(undefined, ...args)
      emit('change', ...args)
      // 解决通过useTable注册onChange时不起作用的问题
      const { onChange } = unref(getProps)
      onChange && isFunction(onChange) && onChange.call(undefined, ...args)
    }

    function handlePageChange(pagination) {
      setPagination(pagination)
      nextTick(() => {
        reload()
      })
    }

    expose(tableAction)

    emit('register', tableAction, formActions)

    return () => {
      const isShowForm = () => {
        return getBindValues.value.useSearchForm ? (
          <ShyForm
            ref={formRef}
            {...getFormProps.value}
            tableAction={tableAction}
            onRegister={registerForm}
            onSubmit={handleSearchInfoChange}
            onAdvancedChange={redoHeight}
            submitOnReset
            showActionButtonGroup
          >
            {getFormSlotKeys.value.map((item) => {
              return {
                [replaceFormSlotKey(item)]: (data) => slots?.item?.(data || {})
              }
            })}
          </ShyForm>
        ) : null
      }

      const isShowAdvancedSearch = () => {
        return isVisibleAdvancedSearch.value ? (
          <TableAdvancedSearch
            schemasAdvancedSearch={schemasAdvancedSearch.value}
            onEnsure={handleAdvancedEnsure}
          />
        ) : null
      }

      const isShowGlobalSearch = () => {
        return isVisibleGlobalSearch.value ? (
          <TableGlobalSearch
            schemasAdvancedSearch={schemasAdvancedSearchGlobal.value}
          />
        ) : null
      }

      const isShowSummary = () => {
        return getDataSourceRef.value?.length && getProps.value?.showSummaryTotal ? (
          <TableSummary>
            <TableSummaryRow>
              {getColumnsSummary.value.map((item: Recordable, index) => {
                if (index === 0)
                  return (
                    <TableSummaryCell
                      class={`${prefixCls}-summary-cell-first`}
                      align="center"
                      index={0}
                    >
                      总计
                    </TableSummaryCell>
                  )
                return (
                  <TableSummaryCell index={index}>
                    {summaryTotalData.value[item.dataIndex]}
                  </TableSummaryCell>
                )
              })}
            </TableSummaryRow>
          </TableSummary>
        ) : null
      }

      const isShowHeader = () => {
        return getBindValues.value.isShowHeader ? getHeaderProps.value : {}
      }

      const isShowFooter = () => {
        return getBindValues.value.isShowFooter ? (
          <ShyTableFooter
            isShowFooterSettings={getBindValues.value.isShowFooterSettings}
            isShowPagination={getBindValues.value.isShowPagination}
            pagination={getPaginationInfo.value}
            onPageChange={handlePageChange}
          >
            {{
              default: (data) => {
                return slots?.footer?.(data) || null
              }
            }}
          </ShyTableFooter>
        ) : null
      }

      const handleResizeColumn = (w: number, col) => {
        col.width = w
      }

      const getAfterIgnoreSlots = (slots: Recordable) => {
        const ignoreKeys = ['footer']

        return Object.keys(slots)
          .filter((key) => !ignoreKeys.includes(key))
          .reduce((pre, cur) => {
            return { ...pre, [cur]: (data) => slots?.[cur]?.(data || {}) }
          }, {})
      }

      const emptyText = () => {
        return (
          <div class="flex justify-center items-center">
            <Empty />
          </div>
        )
      }

      return (
        <div ref={wrapRef} class={getWrapperClass.value}>
          {isShowForm()}
          {isShowAdvancedSearch()}
          {isShowGlobalSearch()}
          <Table
            ref={tableElRef}
            {...getBindValues.value}
            {...isShowHeader()}
            rowClassName={getRowClassName}
            onChange={handleTableChange}
            onResizeColumn={handleResizeColumn}
            pagination={false}
          >
            {{
              headerCell: (data) => <HeaderCell column={data.column} />,
              emptyText,
              bodyCell: (data) => slots?.bodyCell?.(data || {}),
              summary: isShowSummary,
              ...getAfterIgnoreSlots(slots)
            }}
          </Table>
          {isShowFooter()}
        </div>
      )
    }
  }
})

export default ShyTable
