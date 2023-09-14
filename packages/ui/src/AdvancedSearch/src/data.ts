export const searchType = [
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
]

export const searchTypeNumber = searchType.filter((item) => {
  return ['eq', 'gt', 'ge', 'lt', 'le', 'bt', 'nl', 'nn'].includes(item.value)
})
export const searchTypeString = searchType.filter((item) => {
  return ['eq', 'ct', 'sw', 'ew', 'nl', 'nn'].includes(item.value)
})
export const searchTypeDate = searchType.filter((item) => {
  return ['eq', 'gt', 'ge', 'lt', 'le', 'bt', 'nl', 'nn'].includes(item.value)
})

export const searchTypeSelect = [{ label: '等于', value: 'eq' }]
export const stringSearchTypeSelect = [{ label: '包含', value: 'ct' }]

export const getGlobalAdvancedType = (fieldList, value) => {
  const temp: { [key: string]: unknown } = {}
  fieldList.forEach((field) => {
    temp[`${field}.${field}-op`] = 'ct'
    temp[`${field}.${field}`] = value
  })
  temp.gexpr = fieldList.join('|')
  return temp
}
