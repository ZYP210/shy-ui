import { computed } from 'vue'
import { basicColumn } from '../props'
import { deepMergeObjects } from '@shy-plugins/utils'

export const useColumns = (getProps, tableRef) => {
  const getColumnsRef = computed(() => {
    return getProps.value.columns.map((column) => {
      return deepMergeObjects(basicColumn, column)
    })
  })

  const getColumns = () => {
    return getColumnsRef.value
  }

  const hideColumn = (fields) => {
    fields.forEach((field) => {
      tableRef.value.hideColumn(field)
    })
  }

  const showColumn = (fields) => {
    fields.forEach((field) => {
      tableRef.value.showColumn(field)
    })
  }

  const resetColumn = () => {
    tableRef.value.resetColumn()
  }

  const refreshColumn = () => {
    tableRef.value.refreshColumn()
  }

  return {
    getColumnsRef,
    hideColumn,
    showColumn,
    resetColumn,
    getColumns,
    refreshColumn
  }
}
