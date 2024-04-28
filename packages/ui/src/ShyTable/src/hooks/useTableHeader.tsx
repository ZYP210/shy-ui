import type { ComputedRef, Slots } from 'vue'
import type { ShyTableProps, InnerHandlers } from '../types/table'
import { unref, computed } from 'vue'
import { isString, getSlot } from '@shy-plugins/utils'
import ShyTableHeader from '../components/ShyTableHeader'

export const useTableHeader = (
  propsRef: ComputedRef<ShyTableProps>,
  slots: Slots,
  handlers: InnerHandlers
) => {
  const getHeaderProps = computed((): Recordable => {
    const {
      title = null,
      isShowTitle,
      showTableSetting,
      titleHelpMessage,
      tableSetting,
      headerAlign
    } = unref(propsRef)
    const hideTitle =
      !slots?.title && !title && !slots?.toolbar && !showTableSetting
    if (hideTitle && !isString(title)) {
      return {}
    }

    const headerProps = {
      isShowTitle,
      headerAlign,
      title: title as any,
      titleHelpMessage,
      showTableSetting,
      tableSetting,
      onColumnsChange: handlers.onColumnsChange,
      onColumnsReset: handlers.onColumnsReset
    }

    return {
      title: hideTitle
        ? null
        : () => (
            <ShyTableHeader {...headerProps}>
              {{
                toolbar: () => getSlot(slots, 'toolbar'),
                title: slots?.title ? () => slots?.title?.() : null
              }}
            </ShyTableHeader>
          )
    }
  })
  return { getHeaderProps }
}
