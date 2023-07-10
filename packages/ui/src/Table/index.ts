// export { default as BasicTable } from './src/BasicTable.vue'
import BasicTable from './src/BasicTable.vue'
export { default as TableAction } from './src/components/TableAction.vue'
export { default as EditTableHeaderIcon } from './src/components/EditTableHeaderIcon.vue'
export { default as TableImg } from './src/components/TableImg.vue'
export { default as TableDict } from './src/components/TableDict.vue'
import type { App, Plugin } from 'vue'
import { basicPropChange } from './src/props'
import { setConstConfig } from './src/const'
import './src/style/index.less'

export * from './src/types/table'
export * from './src/types/pagination'
export * from './src/types/tableAction'
export { useTable } from './src/hooks/useTable'
export type { FormSchema, FormProps } from '../form'
export type { EditRecordRow } from './src/components/editable'

const withInstall = <T>(component: T) => {
  const comp = component as any

  comp.install = (app: App, options = {}, config = {}) => {
    basicPropChange(options)
    setConstConfig(config)
    app.component('BasicTable', component)
  }
  return component as T & Plugin
}
withInstall(BasicTable)

export { BasicTable }
