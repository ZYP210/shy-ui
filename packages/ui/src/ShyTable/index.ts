import ShyTable from './src/ShyTable'
export { default as ShyTableAction } from './src/components/ShyTableAction'
export { shyTableActionProps } from './src/components/ShyTableAction'
import type { App, Plugin } from 'vue'
import { basicPropChange } from './src/props'
import { setConstConfig } from './src/const'
export { shyTableBasicProps } from './src/props'
export * from './src/types/table'
export * from './src/types/pagination'
export * from './src/types/tableAction'
export { useShyTable } from './src/hooks/useShyTable'

const withInstall = <T>(component: T) => {
  const comp = component as any

  comp.install = (app: App, options = {}, config = {}) => {
    basicPropChange(options)
    setConstConfig(config)
    app.component('ShyTable', component)
  }
  return component as T & Plugin
}
withInstall(ShyTable)

export { ShyTable }
