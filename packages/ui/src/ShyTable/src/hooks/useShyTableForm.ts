import type { ComputedRef, Slots } from 'vue'
import type { ShyTableProps, FetchParams } from '../types/table'
import { unref, computed } from 'vue'
import type { FormProps } from '../../../ShyForm'
import { isFunction } from '@shy-plugins/utils'
import { cloneDeep } from 'lodash-es'

export function useTableForm(
  propsRef: ComputedRef<ShyTableProps>,
  slots: Slots,
  fetch: (opt?: FetchParams | undefined) => Promise<Recordable<any>[] | undefined>,
  getLoading: ComputedRef<boolean | undefined>
) {
  const getFormConfig = computed(() => {
    const { formConfig } = unref(propsRef)
    const temp = cloneDeep(formConfig) as any
    temp?.schemas.forEach((item) => {
      if (item.component === 'Input') {
        item.componentProps = {
          showCount: false,
          ...(item?.componentProps || {})
        }
      }
    })

    return temp
  })
  const getFormProps = computed((): Partial<FormProps> => {
    const { formConfig, formLayout } = unref(propsRef)
    const { submitButtonOptions } = formConfig || {}

    return {
      showAdvancedButton: true,
      ...getFormConfig.value,
      submitButtonOptions: {
        loading: unref(getLoading),
        ...submitButtonOptions
      },
      compact: true,
      layout: formLayout
    }
  })

  const getFormSlotKeys: ComputedRef<string[]> = computed(() => {
    const keys = Object.keys(slots)
    return keys
      .map((item) => (item.startsWith('form-') ? item : null))
      .filter((item) => !!item) as string[]
  })

  function replaceFormSlotKey(key: string) {
    if (!key) return ''
    return key?.replace?.(/form-/, '') ?? ''
  }

  function handleSearchInfoChange(info: Recordable) {
    const { handleSearchInfoFn } = unref(propsRef)
    if (handleSearchInfoFn && isFunction(handleSearchInfoFn)) {
      info = handleSearchInfoFn(info) || info
    }

    fetch({ searchInfo: info, page: 1 })
  }

  return {
    getFormProps,
    replaceFormSlotKey,
    getFormSlotKeys,
    handleSearchInfoChange
  }
}
