// import type { DynamicProps } from '/#/utils'
import { error, getDynamicProps } from '@shy-plugins/utils'
import { ref, onUnmounted, unref } from 'vue'
import { TableActionType } from '/@/Table'
import { FormActionType } from '/@/Form/src/types/form'

export function useTablePlus(tableProps): any {
  const tableRef = ref(null)
  const formRef = ref(null)

  function register(instance, formInstance) {
    onUnmounted(() => {
      tableRef.value = null
      formRef.value = null
    })

    tableProps && instance.setProps(getDynamicProps(tableProps))

    tableRef.value = instance
    formRef.value = formInstance
  }

  function getTableInstance(): TableActionType {
    const table = unref(tableRef)
    if (!table) {
      error(
        'The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!'
      )
    }
    return table as TableActionType
  }

  const methods = {
    reload: () => getTableInstance().reload(),
    setProps: (props) =>
      getTableInstance().setProps({ ...tableProps, ...props }),
    setTableData: (data) => getTableInstance().setTableData(data),
    getRowSelection: () => getTableInstance().getRowSelection(),
    setEditByRow: (row) => getTableInstance().setEditByRow(row),
    getForm: () => {
      return unref(formRef) as unknown as FormActionType
    },
    cancelEditByRow: (row) => getTableInstance().cancelEditByRow(row)
  }

  return [register, methods]
}
