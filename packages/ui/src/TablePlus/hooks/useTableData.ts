import { onMounted, ref } from 'vue'

export const useTableData = (getProps, { setPage, params }) => {
  const dataSource = ref([])
  const setTableData = (data) => {
    dataSource.value = data.map((item) => {
      item._isEdit = false
      return item
    })
  }

  const getTableData = () => {
    return dataSource.value
  }

  const reload = async () => {
    if (getProps.value?.api) {
      const res = await getProps.value.api(params.value)
      setTableData(getProps.value.transDataAfterReload(res))
      setPage({ total: res?.total || 0 })
    }
  }

  onMounted(async () => {
    if (getProps.value.isImmediate) {
      await reload()
    }
  })

  return {
    dataSource,
    setTableData,
    reload,
    getTableData
  }
}
