import BasicContainer from './src/BasicContainer.vue'
import type { App, Plugin, Component } from 'vue'
import { setDefaultConfig } from './src/props'

const withInstall = <T>(component: Component) => {
  const comp = component as any
  comp.install = (app: App, config = {}) => {
    setDefaultConfig(config)
    app.component('BasicContainer', component)
  }
  return component as T & Plugin
}
withInstall(BasicContainer)

export { BasicContainer }
