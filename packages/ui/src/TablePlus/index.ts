import './style/index.less'
import 'vxe-table/lib/style.css'
import 'xe-utils'

import TablePlus from './TablePlus.vue'

export * from './hooks'
import { Plugin, App } from 'vue'

type SFCWithInstall<T> = T & Plugin

const withInstall = <T>(comp: T) => {
  ;(comp as SFCWithInstall<T>).install = (app: App, options) => {
    //注册组件
    app.component('TablePlus', comp)
  }
  return comp as SFCWithInstall<T>
}
withInstall(TablePlus)

export { TablePlus }
