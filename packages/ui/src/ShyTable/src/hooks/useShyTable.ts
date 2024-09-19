import type {
  ShyTableProps,
  TableActionType,
  FetchParams,
  ShyColumn
} from '../types/table'
import type { PaginationProps } from '../types/pagination'
// import type { DynamicProps } from '/#/utils'
import type { FormActionType } from '../../../ShyForm'
import type { WatchStopHandle } from 'vue'
import { getDynamicProps } from '@shy-plugins/utils'
import { ref, onUnmounted, unref, watch, toRaw } from 'vue'

import type { ComputedRef, Ref } from 'vue'

type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}

type Props = Partial<DynamicProps<ShyTableProps>>

type UseTableMethod = TableActionType & {
  getForm: () => FormActionType
}

export function useShyTable(tableProps?: Props): [
  (instance: TableActionType, formInstance: UseTableMethod) => void,
  TableActionType & {
    getForm: () => FormActionType
  }
] {
  const tableRef = ref<Nullable<TableActionType>>(null)
  const loadedRef = ref<Nullable<boolean>>(false)
  const formRef = ref<Nullable<UseTableMethod>>(null)

  let stopWatch: WatchStopHandle

  function register(instance: TableActionType, formInstance: UseTableMethod) {
    onUnmounted(() => {
      tableRef.value = null
      loadedRef.value = null
    })

    if (unref(loadedRef) && instance === unref(tableRef)) return

    tableRef.value = instance
    formRef.value = formInstance
    tableProps && instance.setProps(getDynamicProps(tableProps))
    loadedRef.value = true

    stopWatch?.()

    stopWatch = watch(
      () => tableProps,
      () => {
        tableProps && instance.setProps(getDynamicProps(tableProps))
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  function getTableInstance(): TableActionType | undefined {
    const table = unref(tableRef)
    if (!table) {
      return
    }
    return table as TableActionType
  }

  const methods: TableActionType & {
    getForm: () => FormActionType
  } = {
    reload: async (opt?: FetchParams) => {
      getTableInstance()?.clearSelectedRowKeys()
      return await getTableInstance()?.reload(opt)
    },
    setProps: (props: Partial<ShyTableProps>) => {
      getTableInstance()?.setProps(props)
    },
    redoHeight: () => {
      getTableInstance()?.redoHeight()
    },
    setSelectedRows: (rows: Recordable[]) => {
      return toRaw(getTableInstance()?.setSelectedRows(rows))
    },
    setLoading: (loading: boolean) => {
      getTableInstance()?.setLoading(loading)
    },
    getDataSource: <T = Recordable>() => {
      return getTableInstance()?.getDataSource<T>()
    },
    getRawDataSource: () => {
      return getTableInstance()!.getRawDataSource()
    },
    getColumns: ({ ignoreIndex = false }: { ignoreIndex?: boolean } = {}) => {
      const columns = getTableInstance()?.getColumns({ ignoreIndex }) || []
      return toRaw(columns)
    },
    setColumns: (columns: ShyColumn[] | string[]) => {
      getTableInstance()?.setColumns(columns)
    },
    setTableData: (values: any[]) => {
      return getTableInstance()?.setTableData(values)
    },
    setPagination: (info: Partial<PaginationProps>) => {
      return getTableInstance()?.setPagination(info)
    },
    deleteSelectRowByKey: (key: string) => {
      getTableInstance()?.deleteSelectRowByKey(key)
    },
    getSelectRowKeys: () => {
      return toRaw(getTableInstance()?.getSelectRowKeys())
    },
    getSelectRows: () => {
      return toRaw(getTableInstance()?.getSelectRows())
    },
    clearSelectedRowKeys: () => {
      getTableInstance()?.clearSelectedRowKeys()
    },
    setSelectedRowKeys: (keys: string[]) => {
      getTableInstance()?.setSelectedRowKeys(keys)
    },
    getPaginationRef: () => {
      return getTableInstance()?.getPaginationRef()
    },
    getSize: () => {
      return toRaw(getTableInstance()?.getSize())
    },
    updateTableData: (index: number, key: string, value: any) => {
      return getTableInstance()?.updateTableData(index, key, value)
    },
    deleteTableDataRecord: (rowKey: string | number | string[] | number[]) => {
      return getTableInstance()?.deleteTableDataRecord(rowKey)
    },
    insertTableDataRecord: (
      record: Recordable | Recordable[],
      index: number
    ) => {
      return getTableInstance()?.insertTableDataRecord(record, index)
    },
    updateTableDataRecord: (rowKey: string, record: Recordable) => {
      return getTableInstance()?.updateTableDataRecord(rowKey, record)
    },
    findTableDataRecord: (rowKey: string | number) => {
      return getTableInstance()?.findTableDataRecord(rowKey)
    },
    getRowSelection: () => {
      return toRaw(getTableInstance()?.getRowSelection())
    },
    getCacheColumns: () => {
      return toRaw(getTableInstance()?.getCacheColumns())
    },
    getForm: () => {
      return unref(formRef) as unknown as FormActionType
    },
    setShowPagination: async (show: boolean) => {
      getTableInstance()?.setShowPagination(show)
    },
    getShowPagination: () => {
      return toRaw(getTableInstance()?.getShowPagination())
    },
    expandAll: () => {
      getTableInstance()?.expandAll()
    },
    expandRows: (keys: string[]) => {
      getTableInstance()?.expandRows(keys)
    },
    collapseAll: () => {
      getTableInstance()?.collapseAll()
    },
    scrollTo: (pos: string) => {
      getTableInstance()?.scrollTo(pos)
    }
  }

  return [register, methods]
}
