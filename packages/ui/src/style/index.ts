import lessString from './var.less'
const keyValuePairs = lessString.match(/--\w+-\d+:\s#[a-fA-F0-9]+;/g)
const keyValueMap = {}
keyValuePairs.forEach((pair) => {
  const [key, value] = pair.split(':')
  keyValueMap[key.trim()] = value.slice(0, -1).trim()
})

export const getVarColor = (name: string) => {
  // 读区根标签css变量时候可能存在还未挂载问题
  // const rootElement = document.documentElement
  // const rootStyles = window.getComputedStyle(rootElement)
  // return rootStyles.getPropertyValue(name).trim()

  //换个写法
  return keyValueMap[name]
}
