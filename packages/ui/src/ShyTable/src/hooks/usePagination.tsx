import type { PaginationProps } from '../types/pagination'
import type { ShyTableProps } from '../types/table'
import { computed, unref, ref, ComputedRef, watch } from 'vue'
import { isBoolean } from '@shy-plugins/utils'
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const'



export function usePagination(refProps: ComputedRef<ShyTableProps>) {
  const configRef = ref<PaginationProps>({})
  const show = ref(true)

  watch(
    () => unref(refProps).pagination,
    (pagination) => {
      if (!isBoolean(pagination) && pagination) {
        configRef.value = {
          ...unref(configRef),
          ...(pagination ?? {})
        }
      }
    }
  )

  const getPaginationInfo = computed((): PaginationProps => {
    const { pagination } = unref(refProps)


    return {
      current: 1,
      pageSize: PAGE_SIZE,
      size: '',
      defaultPageSize: PAGE_SIZE,
      showTotal: (total) => <span>共 <span>{total}</span> 条</span>,
      showSizeChanger: true,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      showQuickJumper: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef)
    }
  })

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo)
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info
    }
  }

  function getPagination() {
    return unref(getPaginationInfo)
  }

  function getShowPagination() {
    return unref(show)
  }

  async function setShowPagination(flag: boolean) {
    show.value = flag
  }

  return {
    getPagination,
    getPaginationInfo,
    setShowPagination,
    getShowPagination,
    setPagination
  }
}
