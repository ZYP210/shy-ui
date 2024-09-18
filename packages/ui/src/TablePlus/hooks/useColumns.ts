import { computed } from 'vue'
import { basicColumn } from '../props'
import { deepMergeObjects } from '@shy-plugins/utils'

export const useColumns = (getProps, tableRef) => {
  // TODO 单层循环
  const getColumnsRef = computed(() => {
    return getProps.value.columns.map((column) => {
      if (column?.children) {
        column.children = column.children.map((item) => {
          return deepMergeObjects(
            { ...basicColumn, ...(getProps.value?.basicColumn || {}) },
            item
          )
        })
        return column
      } else {
        return deepMergeObjects(
          { ...basicColumn, ...(getProps.value?.basicColumn || {}) },
          column
        )
      }
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
