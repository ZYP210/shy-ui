import type { ComputedRef, Slots } from 'vue'
import type { BasicTableProps, FetchParams } from '../types/table'
import { unref, computed } from 'vue'
import type { FormProps } from '../../../Form'
import { isFunction } from '@shy-plugins/utils'

function deepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj // 如果是基本类型或 null，则直接返回
  }

  let copy

  if (Array.isArray(obj)) {
    copy = []
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i])
    }
  } else {
    copy = {}
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepCopy(obj[key])
      }
    }
  }

  return copy
}

export function useTableForm(
  propsRef: ComputedRef<BasicTableProps>,
  slots: Slots,
  fetch: (opt?: FetchParams | undefined) => Promise<void>,
  getLoading: ComputedRef<boolean | undefined>
) {
  const getFormConfig = computed(() => {
    const { formConfig } = unref(propsRef)
    const temp = deepCopy(formConfig)
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
    const { formConfig } = unref(propsRef)
    const { submitButtonOptions } = formConfig || {}

    return {
      showAdvancedButton: true,
      rowProps: { gutter: 20 },
      ...getFormConfig.value,
      submitButtonOptions: {
        loading: unref(getLoading),
        ...submitButtonOptions
      },
      compact: true
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
    return key?.replace?.(/form\-/, '') ?? ''
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
