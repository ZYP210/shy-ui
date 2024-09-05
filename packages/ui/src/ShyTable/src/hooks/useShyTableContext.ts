import type { Ref } from 'vue'
import type { schemasAdvancedSearch, ShyTableProps, TableActionType } from '../types/table'
import { provide, inject, ComputedRef } from 'vue'

const key = Symbol('basic-table')

export type Instance = TableActionType & {
  wrapRef: Ref<Nullable<HTMLElement>>
  getBindValues: ComputedRef<Recordable>
  schemasAdvancedSearch: ComputedRef<schemasAdvancedSearch[]>,
  schemasAdvancedSearchGlobal: ComputedRef<schemasAdvancedSearch[]>,
  handleAdvancedEnsure: (form: any) => void
}

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<ShyTableProps>
}

export function createTableContext(instance: Instance) {
  provide(key, instance)
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance
}
