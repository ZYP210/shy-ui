import { onMounted, ref } from 'vue'

export const useTableData = (getProps, { setPage, params }) => {
  const dataSource = ref([])
  const setTableData = (data) => {
    dataSource.value = data.map((item) => {
      item._isEdit = false
      return item
    })
  }

  const reload = async () => {
    if (getProps.value?.api) {
      console.log(params.value)
      const res = await getProps.value.api(params.value)
      setTableData(res.records)
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
    reload
  }
}
