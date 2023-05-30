import { nextTick, reactive } from 'vue'

export const usePagination = () => {
  const page = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '30', '40']
  })

  const setPage = (pageInfo) => {
    nextTick(() => {
      Object.keys(pageInfo).forEach((key) => {
        page[key] = pageInfo[key]
      })
    })
  }

  return { page, setPage }
}
