import type {
  ShyTableProps,
  TableRowSelection,
  BasicColumn
} from '../types/table'
import { Ref, ComputedRef, ref } from 'vue'
import { computed, unref, nextTick, watch } from 'vue'
import { getViewportOffset, isBoolean } from '@shy-plugins/utils'
import { useWindowSizeFn } from '@shy-plugins/use'
import { useModalContext } from '../../../Modal'
import { onMountedOrActivated } from '@shy-plugins/use'
import { useDebounceFn } from '@vueuse/core'
import Sortable from 'sortablejs'

export function useTableScroll(
  propsRef: ComputedRef<ShyTableProps>,
  tableElRef: Ref<ComponentRef>,
  columnsRef: ComputedRef<BasicColumn[]>,
  rowSelectionRef: ComputedRef<TableRowSelection | null>,
  getDataSourceRef: ComputedRef<Recordable[]>,
  wrapRef: Ref<HTMLElement | null>,
  formRef: Ref<ComponentRef>
) {
  const tableHeightRef: Ref<Nullable<number | string>> = ref(167)
  const modalFn = useModalContext()

  // Greater than animation time 280
  const debounceRedoHeight = useDebounceFn(redoHeight, 100)

  const getCanResize = computed(() => {
    const { canResize, scroll } = unref(propsRef)
    return canResize && !(scroll || {}).y
  })

  watch(
    () => [unref(getCanResize), unref(getDataSourceRef)?.length],
    () => {
      debounceRedoHeight()
    },
    {
      flush: 'post'
    }
  )

  function redoHeight() {
    nextTick(() => {
      calcTableHeight()
    })
  }

  function setHeight(height: number) {
    tableHeightRef.value = height
    modalFn?.redoModalHeight?.()
  }

  let bodyEl: HTMLElement | null
  async function calcTableHeight() {
    const {
      canResize,
      isShowFooter,
      resizeHeightOffset,
      maxHeight,
      isCanResizeParent,
      useSearchForm
    } = unref(propsRef)
    const tableData = unref(getDataSourceRef)

    const table = unref(tableElRef)
    if (!table) return

    const tableEl: Element = table.$el
    if (!tableEl) return

    if (!bodyEl) {
      bodyEl = tableEl.querySelector('.ant-table-body')
      if (!bodyEl) return
    }

    const hasScrollBarY = bodyEl.scrollHeight > bodyEl.clientHeight
    const hasScrollBarX = bodyEl.scrollWidth > bodyEl.clientWidth

    if (hasScrollBarY) {
      tableEl.classList.contains('hide-scrollbar-y') &&
        tableEl.classList.remove('hide-scrollbar-y')
    } else {
      !tableEl.classList.contains('hide-scrollbar-y') &&
        tableEl.classList.add('hide-scrollbar-y')
    }

    if (hasScrollBarX) {
      tableEl.classList.contains('hide-scrollbar-x') &&
        tableEl.classList.remove('hide-scrollbar-x')
    } else {
      !tableEl.classList.contains('hide-scrollbar-x') &&
        tableEl.classList.add('hide-scrollbar-x')
    }

    bodyEl!.style.height = 'unset'

    if (!unref(getCanResize) || !unref(tableData)) return

    await nextTick()

    const tableHeadEl = tableEl.querySelector('.ant-table-thead ')

    if (!tableHeadEl) return

    let paddingHeight = 0

    const headerHeight = 32
    let footerHeight =
      (wrapRef.value?.querySelector('.shy-ant-table-footer') as HTMLElement)
        ?.offsetHeight ?? 0

    let tableHeaderHeight = 0
    if (tableHeadEl) {
      tableHeaderHeight = (tableHeadEl as HTMLElement).offsetHeight + 1
    }

    let bottomIncludeBody = 0
    if (unref(wrapRef) && isCanResizeParent) {
      let paginationMargin = 6
      const wrapHeight = unref(wrapRef)?.offsetHeight ?? 0

      let formHeight = isShowFooter
        ? (wrapRef.value?.querySelector('.ant-form') as HTMLElement)
            ?.offsetHeight ?? 0
        : 0

      if (isBoolean(isShowFooter) && !isShowFooter) {
        paginationMargin = 0
      }

      if (isBoolean(useSearchForm) && !useSearchForm) {
        paddingHeight = -24
      }

      const headerCellHeight =
        (tableEl.querySelector('.ant-table-title') as HTMLElement)
          ?.offsetHeight ?? 0

      bottomIncludeBody =
        wrapHeight - formHeight - headerCellHeight - paginationMargin
    } else {
      // Table height from bottom
      bottomIncludeBody = getViewportOffset(tableHeadEl).bottomIncludeBody
    }

    let height =
      bottomIncludeBody -
      (resizeHeightOffset || 0) -
      paddingHeight -
      footerHeight -
      tableHeaderHeight -
      headerHeight
    height = height > maxHeight! ? (maxHeight as number) : height
    height = canResize ? Math.floor(height) : Math.floor(height + 2)

    setHeight(height)

    bodyEl.style.height = `${height}px`
  }
  useWindowSizeFn(calcTableHeight, 280)
  onMountedOrActivated(() => {
    calcTableHeight()
    nextTick(() => {
      debounceRedoHeight()
    })

    const table = unref(tableElRef)
    if (!table) return
    const tableEl: Element = table.$el
    if (!tableEl) return
    const bodyEl = tableEl.querySelector('.ant-table-tbody') as HTMLElement
    if (!bodyEl) return
    new Sortable(bodyEl, {
      ghostClass: 'bg-gray-100',
      handle: '.ant-table-cell .ant-table-cell-index',
      draggable: '.ant-table-row'
    })
  })

  const getScrollX = computed(() => {
    let width = 0
    if (unref(rowSelectionRef)) {
      width += 60
    }

    // TODO props ?? 0;
    const NORMAL_WIDTH = 150

    const columns = unref(columnsRef).filter((item) => !item.defaultHidden)
    columns.forEach((item) => {
      width += Number.parseFloat(item.width as string) || 0
    })
    const unsetWidthColumns = columns.filter(
      (item) => !Reflect.has(item, 'width')
    )

    const len = unsetWidthColumns.length
    if (len !== 0) {
      width += len * NORMAL_WIDTH
    }

    const table = unref(tableElRef)
    const tableWidth = table?.$el?.offsetWidth ?? 0

    return tableWidth > width ? '100%' : width
  })

  const getScrollRef = computed(() => {
    const tableHeight = tableHeightRef.value as number
    const { canResize, scroll } = unref(propsRef)

    return {
      x: unref(getScrollX),
      y: canResize ? tableHeight : null,
      scrollToFirstRowOnChange: false,
      ...scroll
    }
  })

  return { getScrollRef, redoHeight }
}
