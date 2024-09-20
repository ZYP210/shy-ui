import type {
  ShyTableProps,
  TableRowSelection,
  ShyColumn
} from '../types/table'
import { Ref, ComputedRef, ref, onUnmounted, render } from 'vue'
import { computed, unref, nextTick, watch } from 'vue'
import { getViewportOffset, isBoolean } from '@shy-plugins/utils'
import { useDesign, useWindowSizeFn } from '@shy-plugins/use'
import { useModalContext } from '../../../Modal'
import { onMountedOrActivated } from '@shy-plugins/use'
import { useDebounceFn } from '@vueuse/core'
import Sortable from 'sortablejs'
import { BasicButton } from '../../../Button'
import { SCROLL_WIDTH } from '../const'

export function useTableScroll(
  propsRef: ComputedRef<ShyTableProps>,
  tableElRef: Ref<ComponentRef>,
  columnsRef: ComputedRef<ShyColumn[]>,
  rowSelectionRef: ComputedRef<TableRowSelection | null>,
  getDataSourceRef: ComputedRef<Recordable[]>,
  wrapRef: Ref<HTMLElement | null>
) {
  const { prefixCls } = useDesign('ant-table-more-wrapper')

  const tableHeightRef: Ref<Nullable<number>> = ref(400)
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

  function handleShowMore() {
    const allRow = bodyEl?.querySelectorAll('.ant-table-row')
    let allRowHeight = 0
    allRow?.forEach((row) => {
      allRowHeight += row.clientHeight
    })
    const averageHeight = allRowHeight / (allRow?.length ?? 0)

    if (
      (tableHeightRef.value ?? 0) <= allRowHeight &&
      (tableHeightRef.value ?? 0) + averageHeight * 10 > allRowHeight
    ) {
      tableHeightRef.value = allRowHeight
    } else {
      tableHeightRef.value = (tableHeightRef.value ?? 0) + averageHeight * 10
    }

    setTimeout(() => {
      calcTableHeight()
    }, 1000)
  }

  function showAll() {
    const allRow = bodyEl?.querySelectorAll('.ant-table-row')
    let allRowHeight = 0
    allRow?.forEach((row) => {
      allRowHeight += row.clientHeight
    })

    tableHeightRef.value = allRowHeight

    setTimeout(() => {
      calcTableHeight()
    }, 1000)
  }

  function setHeight(height: number) {
    tableHeightRef.value = height
    modalFn?.redoModalHeight?.()
  }

  let bodyEl: HTMLElement | null
  async function calcTableHeight() {
    const {
      isShowFooter,
      resizeHeightOffset,
      maxHeight,
      isCanResizeParent,
      useSearchForm,
      tableSetting,
      useInfo
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

    const tableBodyEl = tableEl.querySelector('.ant-table-body') as HTMLElement

    const hasScrollBarY = bodyEl.scrollHeight > bodyEl.clientHeight
    const hasScrollBarX = bodyEl.scrollWidth > bodyEl.clientWidth + SCROLL_WIDTH

    if (hasScrollBarY) {
      !tableEl.classList.contains('no-hide-scrollbar-y') &&
        tableEl.classList.add('no-hide-scrollbar-y')
      tableEl.classList.remove('hide-scrollbar-y')

      tableSetting?.showMore &&
        render(
          <div class={prefixCls}>
            <BasicButton
              type="link"
              preIcon="tabler:layout-navbar-expand"
              onClick={handleShowMore}
            >
              展开更多
            </BasicButton>
          </div>,
          tableBodyEl
        )
    } else {
      !tableEl.classList.contains('hide-scrollbar-y') &&
        tableEl.classList.add('hide-scrollbar-y')
      tableEl.classList.remove('no-hide-scrollbar-y')

      tableSetting?.showMore && render(null, tableBodyEl)
    }

    if (hasScrollBarX) {
      !tableEl.classList.contains('no-hide-scrollbar-x') &&
        tableEl.classList.add('no-hide-scrollbar-x')
      tableEl.classList.remove('hide-scrollbar-x')
    } else {
      !tableEl.classList.contains('hide-scrollbar-x') &&
        tableEl.classList.add('hide-scrollbar-x')
      tableEl.classList.remove('no-hide-scrollbar-x')
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

    let infoHeight = 0
    if (useInfo) {
      infoHeight = 37
    }

    let height =
      bottomIncludeBody -
      (resizeHeightOffset || 0) -
      paddingHeight -
      footerHeight -
      tableHeaderHeight -
      headerHeight -
      infoHeight -
      2
    height = Math.floor(height > maxHeight! ? (maxHeight as number) : height)

    setHeight(height)

    bodyEl.style.height = `${height}px`
  }
  useWindowSizeFn<void>(calcTableHeight, 500)
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

    window.addEventListener('resize', calcTableHeight)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', calcTableHeight)
  })

  const getScrollX = computed(() => {
    let width = 0
    if (unref(rowSelectionRef)) {
      width += 36
    }

    // TODO props ?? 0;
    const NORMAL_WIDTH = 150

    const columns = unref(columnsRef).filter((item) => !item.defaultHidden)
    columns.forEach((item) => {
      width += Number.parseFloat(item.width + '') || 0
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
    const { scroll, canResize } = unref(propsRef)
    const tableHeight =
      (tableHeightRef.value as number) + (canResize ? 0 : SCROLL_WIDTH)

    return {
      x: unref(getScrollX),
      y: tableHeight,
      scrollToFirstRowOnChange: false,
      ...scroll
    }
  })

  return { getScrollRef, redoHeight, showAll }
}
