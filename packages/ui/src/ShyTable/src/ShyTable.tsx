import type {
  ShyTableProps,
  TableActionType,
  SizeType,
  ColumnChangeParam,
  InnerHandlers
} from './types/table'
import {
  Empty,
  Table,
  TableSummary,
  TableSummaryCell,
  TableSummaryRow
} from 'ant-design-vue'
import { computed, defineComponent, ref, toRaw, unref } from 'vue'
import { useDesign } from '@shy-plugins/use'
import { basicProps } from './props'
import './style/table.less'
import { omit } from 'lodash-es'
import { BasicForm, useForm } from '../../Form'
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
  props: basicProps,
  setup(props, { attrs, slots, emit, expose }) {
    const { prefixCls } = useDesign('basic-table')
    const getWrapperClass = computed(() => {
      return [
        prefixCls,
        attrs.class,
        {
          [`${prefixCls}-form-container`]: props.useSearchForm,
          [`${prefixCls}-table-wrapper`]: props.useTableWrapper,
          [`${prefixCls}--inset`]: props.inset
        }
      ]
    })

    const tableElRef = ref(null)
    const tableData = ref<Recordable[]>([])

    const wrapRef = ref(null)
    const formRef = ref(null)
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
        ...unref(getHeaderProps),
        scroll: unref(getScrollRef),
        loading: unref(getLoading),
        tableLayout: 'fixed',
        rowSelection: unref(getRowSelectionRef),
        rowKey: unref(getRowKey),
        // // @ts-ignore
        columns: toRaw(unref(getViewColumns)),
        pagination: toRaw(unref(getPaginationInfo)),
        dataSource,
        // footer: unref(getFooterProps),
        ...unref(getExpandOption),
        // 默认项
        showSorterTooltip: false
      }

      propsData = omit(propsData, ['class', 'onChange'])
      return propsData
    })

    const { getLoading, setLoading } = useLoading(getProps)

    const [registerForm, formActions] = useForm()

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
      // schemasAdvancedSearchString,
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
    function handleTableChange(...args: any[]) {
      onTableChange.call(undefined, ...args)
      emit('change', ...args)
      // 解决通过useTable注册onChange时不起作用的问题
      const { onChange } = unref(getProps)
      onChange && isFunction(onChange) && onChange.call(undefined, ...args)
    }

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

    expose(tableAction)

    emit('register', tableAction, formActions)

    return () => {
      const isShowForm = () => {
        return getBindValues.value.useSearchForm ? (
          <BasicForm
            ref={formRef}
            submitOnReset
            {...getFormProps.value}
            tableAction={tableAction}
            onRegister={registerForm}
            onSubmit={handleSearchInfoChange}
            onAdvancedChange={redoHeight}
          >
            {getFormSlotKeys.value.map((item) => {
              return {
                [replaceFormSlotKey(item)]: (data) => slots?.item?.(data || {})
              }
            })}
          </BasicForm>
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
        return getProps.value.showSummaryTotal ? (
          <TableSummary>
            <TableSummaryRow>
              {getColumnsSummary.value.map((item: Recordable, index) => {
                if (index === 0)
                  return (
                    <TableSummaryCell align="center" index={0}>
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

      const handleResizeColumn = (w: unknown, col: { width: unknown }) => {
        col.width = w
      }

      return (
        <div class={getWrapperClass.value}>
          {isShowForm()}
          {isShowAdvancedSearch()}
          {isShowGlobalSearch()}
          <Table
            ref={tableElRef}
            {...getBindValues.value}
            rowClassName={getRowClassName}
            onChange={handleTableChange}
            onResizeColumn={handleResizeColumn}
          >
            {{
              headerCell: (data) => <HeaderCell column={data.column} />,
              emptyText: () => (
                <div
                  class="flex justify-center items-center"
                  style={{
                    height: `${(getScrollRef.value.y as number) - 41}px`
                  }}
                >
                  <Empty />
                </div>
              ),
              bodyCell: (data) => slots?.bodyCell?.(data || {}),
              summary: isShowSummary,
              ...Object.keys(slots).reduce((pre, cur) => {
                return { ...pre, [cur]: (data) => slots?.[cur]?.(data || {}) }
              },{})
            }}
          </Table>
        </div>
      )
    }
  }
})

export default ShyTable
