import type {
  BasicColumn,
  ShyTableProps,
  CellFormat,
  GetColumnsParams,
  TableActionType
} from '../types/table'
import type { PaginationProps } from '../types/pagination'
import type { ComputedRef } from 'vue'
import { computed, Ref, ref, reactive, toRaw, unref, watch, h } from 'vue'
import { renderEditCell } from '../components/editable'
// import { usePermission } from '@shy-plugins/use'
// import { useI18n } from '/@/hooks/web/useI18n'
import { cloneDeep, isEqual } from 'lodash-es'
import {
  formatToDate,
  isArray,
  isBoolean,
  isFunction,
  isMap,
  isNumber,
  isString
} from '@shy-plugins/utils'
import {
  ACTION_COLUMN_FLAG,
  DEFAULT_ALIGN,
  INDEX_COLUMN_FLAG,
  PAGE_SIZE,
  ACTION_COLUMN_WIDTH
} from '../const'

function handleItem(item: BasicColumn, ellipsis: boolean) {
  const { key, dataIndex, children } = item
  item.align = item.align || DEFAULT_ALIGN
  if (ellipsis) {
    if (!key) {
      item.key = dataIndex
    }
    if (!isBoolean(item.ellipsis)) {
      Object.assign(item, {
        ellipsis
      })
    }
  }
  if (children && children.length) {
    handleChildren(children, !!ellipsis)
  }
}

function handleColumnResize(
  propsRef: ComputedRef<ShyTableProps>,
  columns: BasicColumn[],
  wrapRef: Ref
) {
  const tableWidth =
    wrapRef.value?.querySelector?.('.ant-table-body')?.clientWidth - 7 ||
    wrapRef.value?.querySelector?.('.ant-table-content')?.clientWidth
  const selectWidth = propsRef.value.rowSelection ? 36 : 0
  const [sumWidth, sumLength] = columns.reduce(
    ([sumWidth, length], cur) => {
      if (typeof cur.width === 'number') {
        return [sumWidth + cur.width, ++length]
      }
      return [sumWidth, length]
    },
    [0, 0]
  )
  const length = columns.length
  const countWidth = tableWidth
    ? (tableWidth - sumWidth - selectWidth) / (length - sumLength)
    : 150
  const colWidth = countWidth < 150 ? 150 : countWidth
  columns.forEach((item) => {
    if (item.flag) return
    if (propsRef.value.resizable) {
      item.width = item.width || colWidth
      item.resizable = item.resizable === undefined ? true : item.resizable
    } else {
      if (item.resizable) {
        item.width = item.width || colWidth
      }
    }
  })
}

function handleChildren(
  children: BasicColumn[] | undefined,
  ellipsis: boolean
) {
  if (!children) return
  children.forEach((item) => {
    const { children } = item
    handleItem(item, ellipsis)
    handleChildren(children, ellipsis)
  })
}

function handleIndexColumn(
  propsRef: ComputedRef<ShyTableProps>,
  getPaginationRef: ComputedRef<boolean | PaginationProps>,
  columns: BasicColumn[]
) {
  // const { t } = useI18n()

  const { showIndexColumn, indexColumnProps, isTreeTable } = unref(propsRef)

  let pushIndexColumns = false
  if (unref(isTreeTable)) {
    return
  }
  columns.forEach(() => {
    const indIndex = columns.findIndex(
      (column) => column.flag === INDEX_COLUMN_FLAG
    )
    if (showIndexColumn) {
      pushIndexColumns = indIndex === -1
    } else if (!showIndexColumn && indIndex !== -1) {
      columns.splice(indIndex, 1)
    }
  })

  if (!pushIndexColumns) return

  const isFixedLeft = columns.some((item) => item.fixed === 'left')

  columns.unshift({
    flag: INDEX_COLUMN_FLAG,
    width: 50,
    title: '序号',
    align: 'center',
    customRender: ({ index }) => {
      const getPagination = unref(getPaginationRef)
      if (isBoolean(getPagination)) {
        return `${index + 1}`
      }
      const { current = 1, pageSize = PAGE_SIZE } = getPagination
      return h('div', { class: 'ant-table-cell-index full cursor-pointer' }, ((current < 1 ? 1 : current) - 1) * pageSize + index + 1)
    },
    ...(isFixedLeft
      ? {
          fixed: 'left'
        }
      : {}),
    ...indexColumnProps
  })
}

function handleActionColumn(
  propsRef: ComputedRef<ShyTableProps>,
  columns: BasicColumn[]
) {
  const { actionColumn } = unref(propsRef)
  if (!actionColumn) return

  const hasIndex = columns.findIndex(
    (column) => column.flag === ACTION_COLUMN_FLAG
  )
  if (hasIndex === -1) {
    columns.push({
      ...columns[hasIndex],
      fixed: 'right',
      width: ACTION_COLUMN_WIDTH,
      ...actionColumn,
      flag: ACTION_COLUMN_FLAG
    })
  }
}

export function useColumns(
  propsRef: ComputedRef<ShyTableProps>,
  getPaginationRef: ComputedRef<boolean | PaginationProps>,
  tableAction: ComputedRef<TableActionType>,
  wrapRef: Ref<ComponentRef>
) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<
    BasicColumn[]
  >
  let cacheColumns = unref(propsRef).columns

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef))

    handleIndexColumn(propsRef, getPaginationRef, columns)
    handleActionColumn(propsRef, columns)
    handleColumnResize(propsRef, columns, wrapRef)

    if (!columns) {
      return []
    }
    const { ellipsis } = unref(propsRef)

    columns.forEach((item) => {
      const { customRender, slots } = item

      handleItem(
        item,
        Reflect.has(item, 'ellipsis')
          ? !!item.ellipsis
          : !!ellipsis && !customRender && !slots
      )
    })
    return columns
  })

  function isIfShow(column: BasicColumn): boolean {
    const ifShow = column.ifShow

    let isIfShow = true

    if (isBoolean(ifShow)) {
      isIfShow = ifShow
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(column)
    }
    return isIfShow
  }
  // const { hasPermission } = usePermission()
  const hasPermission = (key: any) => true

  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef))

    const columns = cloneDeep(viewColumns)
    return columns
      .filter((column) => {
        return hasPermission(column.auth) && isIfShow(column)
      })
      .map((column) => {
        const isSummaryCol =
          unref(propsRef).showSummaryTotal &&
          unref(propsRef).summaryTotalFields?.includes?.(
            column.dataIndex! as string
          )
        const summaryFormat = (text) => {
          return text
            ? isNumber(+text) && !isNaN(+text)
              ? Number.parseFloat((+text).toFixed(2)).toLocaleString('en-US')
              : text
            : ''
        }

        const {
          slots,
          customRender,
          format = isSummaryCol ? summaryFormat : undefined,
          edit,
          editRow,
          flag
        } = column

        if (!slots || !slots?.title) {
          // column.slots = { title: `header-${dataIndex}`, ...(slots || {}) };
          column.customTitle = column.title as any
          Reflect.deleteProperty(column, 'title')
        }
        const isDefaultAction = [
          INDEX_COLUMN_FLAG,
          ACTION_COLUMN_FLAG
        ].includes(flag!)
        if (!customRender && format && !edit && !isDefaultAction) {
          column.customRender = ({ text, record, index }) => {
            return formatCell(text, format, record, index, tableAction.value)
          }
        }

        if (customRender) {
          column.customRender = ({ ...ages }) =>
            customRender({
              ...ages,
              ...{ tableAction: tableAction.value }
            })
        }

        // edit table
        if ((edit || editRow) && !isDefaultAction) {
          column.customRender = renderEditCell(column, tableAction.value)
        }
        if (propsRef.value.useAdvancedSearch) {
          if (column.flag === 'INDEX' || column.flag === 'ACTION') {
            column.sorter = false
          } else {
            column.sorter = column?.sorter === undefined ? true : column.sorter
          }
        }
        return reactive<BasicColumn>(column)
      })
  })

  const getColumnsSummary = computed(() => {
    if (propsRef.value.rowSelection) {
      //@ts-ignore
      return [{ flag: 'ROW_SELECTION' }, ...getViewColumns.value]
    }
    return getViewColumns.value
  })

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns
      cacheColumns = columns?.filter((item) => !item.flag) ?? []
    }
  )

  function setCacheColumnsByField(
    dataIndex: string | undefined,
    value: Partial<BasicColumn>
  ) {
    if (!dataIndex || !value) {
      return
    }
    cacheColumns.forEach((item) => {
      if (item.dataIndex === dataIndex) {
        Object.assign(item, value)
        return
      }
    })
  }
  /**
   * set columns
   * @param columnList key｜column
   */
  function setColumns(
    columnList: Partial<BasicColumn>[] | (string | string[])[]
  ) {
    const columns = cloneDeep(columnList)
    if (!isArray(columns)) return

    if (columns.length <= 0) {
      columnsRef.value = []
      return
    }

    const firstColumn = columns[0]

    const cacheKeys = cacheColumns.map((item) => item.dataIndex)

    if (!isString(firstColumn) && !isArray(firstColumn)) {
      columnsRef.value = columns as BasicColumn[]
    } else {
      const columnKeys = (columns as (string | string[])[]).map((m) =>
        m.toString()
      )
      const newColumns: BasicColumn[] = []
      cacheColumns.forEach((item) => {
        newColumns.push({
          ...item,
          defaultHidden: !columnKeys.includes(
            item.dataIndex?.toString() || (item.key as string)
          )
        })
      })
      // Sort according to another array
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return (
            columnKeys.indexOf(prev.dataIndex?.toString() as string) -
            columnKeys.indexOf(next.dataIndex?.toString() as string)
          )
        })
      }
      columnsRef.value = newColumns
    }
  }

  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction, sort } = opt || {}
    let columns = toRaw(unref(getColumnsRef))
    if (ignoreIndex) {
      columns = columns.filter((item) => item.flag !== INDEX_COLUMN_FLAG)
    }
    if (ignoreAction) {
      columns = columns.filter((item) => item.flag !== ACTION_COLUMN_FLAG)
    }

    if (sort) {
      columns = sortFixedColumn(columns)
    }

    return columns
  }
  function getCacheColumns() {
    return cacheColumns
  }

  return {
    getColumnsRef,
    getCacheColumns,
    getColumns,
    setColumns,
    getViewColumns: getViewColumns as ComputedRef<never[]>,
    setCacheColumnsByField,
    getColumnsSummary: getColumnsSummary as ComputedRef<never[]>
  }
}

function sortFixedColumn(columns: BasicColumn[]) {
  const fixedLeftColumns: BasicColumn[] = []
  const fixedRightColumns: BasicColumn[] = []
  const defColumns: BasicColumn[] = []
  for (const column of columns) {
    if (column.fixed === 'left') {
      fixedLeftColumns.push(column)
      continue
    }
    if (column.fixed === 'right') {
      fixedRightColumns.push(column)
      continue
    }
    defColumns.push(column)
  }
  return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter(
    (item) => !item.defaultHidden
  )
}

// format cell
export function formatCell(
  text: string,
  format: CellFormat,
  record: Recordable,
  index: number,
  tableAction: TableActionType
) {
  if (!format) {
    return text
  }

  // custom function
  if (isFunction(format)) {
    return format(text, record, index, tableAction)
  }

  try {
    // date type
    const DATE_FORMAT_PREFIX = 'date|'
    if (isString(format) && format.startsWith(DATE_FORMAT_PREFIX) && text) {
      const dateFormat = format.replace(DATE_FORMAT_PREFIX, '')

      if (!dateFormat) {
        return text
      }
      return formatToDate(text, dateFormat)
    }

    // Map
    if (isMap(format)) {
      return format.get(text)
    }
  } catch (error) {
    return text
  }
}
