const globalConfig = {
  form: {},
  table: {}
}

export const registerGlobalConfig = (config: any) => {
  Object.keys(config).forEach((key) => {
    const value = config[key]
    globalConfig[key] = value
  })
}

export const useGlobalConfig = (key: string) => {
  const config = globalConfig[key]

  const setConfig = (value: any) => {
    globalConfig[key] = value
  }
  return { config, setConfig }
}
