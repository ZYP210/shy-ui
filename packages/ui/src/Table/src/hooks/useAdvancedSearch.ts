import { computed, ref } from 'vue'

export enum OperatorEnum {
  'eq' = '等于',
  'ne' = '不等于',
  'gt' = '大于',
  'ge' = '大于等于',
  'lt' = '小于',
  'le' = '小于等于',
  'bt' = '在...之间',
  'nb' = '不在...之间',
  'ct' = '包含',
  'sw' = '以...开头'
  // 'ew' = '以...结尾',
  // 'ol' = '模糊或匹配',
  // 'nk' = '反模糊匹配',
  // 'il' = '多值查询',
  // 'ni' = '多值查询',
  // 'nl' = '为空',
  // 'nn' = '不为空',
  // 'ey' = '为空',
  // 'ny' = '不为空'
}

export const useAdvancedSearch = ({ getProps, reload }) => {
  const isVisibleAdvancedSearch = ref(false)
  const schemasAdvancedSearch = computed(() => {
    return getProps.value.columns.map((column) => {
      return {
        label: column.title,
        field: column.dataIndex,
        type: column?.advancedType || 'string',
        component: column?.component || 'Input',
        componentProps: column?.componentProps || {},
        sortShow: column?.sortShow === undefined ? true : column.sortShow,
        globalShow: column?.globalShow === undefined ? true : column.globalShow,
        advancedShow:
          column?.advancedShow === undefined ? true : column.advancedShow
      }
    })
  })

  const schemasAdvancedSearchGlobal = computed(() => {
    return schemasAdvancedSearch.value.filter((item) => {
      return item.globalShow
    })
  })

  const schemasAdvancedSearchString = computed(() => {
    return schemasAdvancedSearch.value.filter((item) => {
      return item.type === 'string'
    })
  })

  const openAdvancedSearch = () => {
    isVisibleAdvancedSearch.value = true
  }
  const closeAdvancedSearch = () => {
    isVisibleAdvancedSearch.value = false
  }

  const handleAdvancedEnsure = (form) => {
    setCurSearchParams(form)
    reload({ searchInfo: form })
  }

  const globalSearchType = ref(1)
  const isVisibleGlobalSearch = ref(false)

  const openGlobalSearch = () => {
    isVisibleGlobalSearch.value = true
  }
  const closeGlobalSearch = () => {
    isVisibleGlobalSearch.value = false
  }
  const setGlobalSearchType = (value) => {
    globalSearchType.value = value
  }

  const getGlobalSearchType = () => {
    return globalSearchType.value
  }
  const curGlobalSchemas = ref([])
  const setGlobalSchemas = (value) => {
    curGlobalSchemas.value = value
  }
  const getGlobalSchemas = () => {
    return curGlobalSchemas.value
  }
  const curGlobalSearchValue = ref('')
  const setGlobalSearchValue = (value) => {
    curGlobalSearchValue.value = value
  }

  const getGlobalSearchValue = () => {
    return curGlobalSearchValue.value
  }

  const curSearchParams = ref({})

  const setCurSearchParams = (value) => {
    curSearchParams.value = value
  }
  const getCurSearchParams = () => {
    return curSearchParams.value
  }
  return {
    isVisibleAdvancedSearch,
    schemasAdvancedSearch,
    openAdvancedSearch,
    closeAdvancedSearch,
    handleAdvancedEnsure,
    setGlobalSearchType,
    getGlobalSearchType,
    openGlobalSearch,
    closeGlobalSearch,
    isVisibleGlobalSearch,
    curGlobalSearchValue,
    setGlobalSchemas,
    getGlobalSchemas,
    setGlobalSearchValue,
    getGlobalSearchValue,
    setCurSearchParams,
    getCurSearchParams,
    schemasAdvancedSearchString,
    schemasAdvancedSearchGlobal
  }
}

export const useAdvancedSearchKv = () => {
  const getKvOperator = () => {
    const kvStringOperator = []
    const kvNumberOperator = []
    const kvDateOperator = []
    Object.keys(OperatorEnum).forEach((key) => {
      if (['eq', 'ne', 'gt', 'ge', 'lt', 'le'].includes(key)) {
        kvNumberOperator.push({ label: OperatorEnum[key], value: key })
      } else if (['bt', 'nb'].includes(key)) {
        kvDateOperator.push({ label: OperatorEnum[key], value: key })
      } else {
        kvStringOperator.push({ label: OperatorEnum[key], value: key })
      }
    })

    return {
      kvDateOperator,
      kvNumberOperator,
      kvStringOperator
    }
  }
  return { getKvOperator }
}
