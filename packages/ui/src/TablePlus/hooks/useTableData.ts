import { onMounted, ref } from 'vue'
import { get } from 'lodash-es'
import { isFunction } from '@shy-plugins/utils'

export const useTableData = (getProps, { setPage, params, tableRef }) => {
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
      // const res = await getProps.value.api(params.value)
      // if (res.records && res.records.length) {
      //   setTableData(getProps.value.transDataAfterReload(res))
      //   setPage({
      //     total: res?.total || 0
      //   })
      // } else if (params.value.current > 1) {

      // }
      const res = await getProps.value.api(params.value)

      const isArrayResult = Array.isArray(res)

      let resultItems: Recordable[] = isArrayResult ? res : get(res, 'records')
      const resultTotal: number = isArrayResult ? res.length : get(res, 'total')

      // 假如数据变少，导致总页数变少并小于当前选中页码，通过getPaginationRef获取到的页码是不正确的，需获取正确的页码再次执行
      if (resultTotal) {
        const currentTotalPage = Math.ceil(resultTotal / params.value.size)
        if (params.value.current > currentTotalPage) {
          await setPage({
            total: resultTotal,
            current: currentTotalPage
          })
          return await reload()
        }
      }
      if (
        getProps.value.transDataAfterReload &&
        isFunction(getProps.value.transDataAfterReload)
      ) {
        resultItems =
          (await getProps.value.transDataAfterReload(resultItems)) ||
          resultItems
      }
      setTableData(resultItems)
      setPage({
        total: resultTotal
      })
    }
  }

  const addTableData = (list = [{}]) => {
    const temp = list.map((item) => {
      item._isEdit = true
      return item
    })
    dataSource.value.unshift(...temp)
    tableRef.value.loadData(dataSource.value)
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
    getTableData,
    addTableData
  }
}
