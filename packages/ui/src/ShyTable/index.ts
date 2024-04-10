// export { default as BasicTable } from './src/BasicTable.vue'
import ShyTable from './src/ShyTable'
export { default as ShyTableAction } from './src/components/ShyTableAction'
// export { default as EditTableHeaderIcon } from './src/components/EditTableHeaderIcon.vue'
// export { default as TableImg } from './src/components/TableImg.vue'
// export { default as TableDict } from './src/components/TableDict.vue'
import type { App, Plugin } from 'vue'
import { basicPropChange } from './src/props'
import { setConstConfig } from './src/const'
export * from './src/types/table'
export * from './src/types/pagination'
export * from './src/types/tableAction'
// export { useRender } from './src/hooks/useRender'
export { useShyTable } from './src/hooks/useShyTable'
export type { FormSchema, FormProps } from '../Form'
// export type { EditRecordRow } from './src/components/editable'

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
