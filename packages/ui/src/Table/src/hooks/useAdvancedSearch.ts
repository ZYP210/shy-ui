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

export const useAdvancedSearch = ({ getProps }) => {
  const isVisibleAdvancedSearch = ref(false)
  const schemasAdvancedSearch = computed(() => {
    return getProps.value.columns.map((column) => {
      return {
        label: column.title,
        field: column.field
      }
    })
  })

  return {
    isVisibleAdvancedSearch,
    schemasAdvancedSearch
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
