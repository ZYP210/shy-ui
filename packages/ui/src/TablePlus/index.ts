import './style/index.less'
import 'vxe-table/lib/style.css'
import 'xe-utils'

import tablePlus from './TablePlus.vue'

export * from './hooks'
import { Plugin, App } from 'vue'

import VXETable from 'vxe-table'

type SFCWithInstall<T> = T & Plugin

function useTable(app: App) {
  app.use(VXETable as unknown as Plugin, {})
}

const withInstall = <T>(comp: T) => {
  ;(comp as SFCWithInstall<T>).install = (app: App, options) => {
    //注册组件
    app.use(useTable)
    app.component('TablePlus', comp)
  }
  return comp as SFCWithInstall<T>
}

const TablePlus = withInstall(tablePlus)
export { TablePlus }
