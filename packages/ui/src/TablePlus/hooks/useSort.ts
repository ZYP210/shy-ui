import { computed, reactive } from 'vue'

export const useSort = () => {
  const formSortStatus = reactive({})

  const formSearchSort = computed(() => {
    const ascsList = []
    const descsList = []
    Object.keys(formSortStatus).forEach((key) => {
      if (formSortStatus[key] === 1) {
        ascsList.push(key)
      }
      if (formSortStatus[key] === 2) {
        descsList.push(key)
      }
    })
    const temp = {}
    if (ascsList.length !== 0) temp['ascs'] = ascsList.join(',')
    if (descsList.length !== 0) temp['descs'] = descsList.join(',')
    return temp
  })

  return { formSearchSort, formSortStatus }
}
