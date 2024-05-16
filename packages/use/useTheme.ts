export const getVarColor = (name: string) => {
  const rootElement = document.documentElement
  const rootStyles = window.getComputedStyle(rootElement)
  return rootStyles.getPropertyValue(name).trim()
}
