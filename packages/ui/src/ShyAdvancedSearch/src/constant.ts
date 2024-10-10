export const ALL_OPERATOR_OPTION = Object.freeze([
  {
    label: '等于',
    value: 'eq'
  },
  {
    label: '不等于',
    value: 'ne'
  },
  {
    label: '大于',
    value: 'gt'
  },
  {
    label: '大于等于',
    value: 'ge'
  },
  {
    label: '小于',
    value: 'lt'
  },
  {
    label: '小于等于',
    value: 'le'
  },
  {
    label: '在...之间',
    value: 'bt'
  },
  {
    label: '不在...之间',
    value: 'nb'
  },
  {
    label: '包含',
    value: 'ct'
  },
  {
    label: '以...开头',
    value: 'sw'
  },
  {
    label: '以...结尾',
    value: 'ew'
  },
  {
    label: '模糊或匹配',
    value: 'ol'
  },
  {
    label: '反模糊匹配',
    value: 'nk'
  },
  {
    label: '多值查询',
    value: 'ni'
  },
  {
    label: '为空',
    value: 'nl'
  },
  {
    label: '不为空',
    value: 'nn'
  }
])

export const NUMBER_OPERATOR_OPTIONS = ALL_OPERATOR_OPTION.filter((item) =>
  ['eq', 'gt', 'ge', 'lt', 'le', 'bt', 'nl', 'nn'].includes(item.value)
)

export const STRING_OPERATOR_OPTIONS = ALL_OPERATOR_OPTION.filter((item) =>
  ['eq', 'ct', 'sw', 'ew', 'nl', 'nn'].includes(item.value)
)

export const DATE_OPERATOR_OPTIONS = ALL_OPERATOR_OPTION.filter((item) =>
  ['eq', 'gt', 'ge', 'lt', 'le', 'bt', 'nl', 'nn'].includes(item.value)
)

export const EQUAL_OPERATOR_OPTIONS = ALL_OPERATOR_OPTION.filter((item) =>
  ['eq'].includes(item.value)
)

export const CONTAIN_OPERATOR_OPTIONS = ALL_OPERATOR_OPTION.filter((item) =>
  ['ct'].includes(item.value)
)
