import { ShyClassTree } from './src/ShyClassTree'
import { ShyTimeLine } from './src/ShyTimeLine'
import { ShySteps } from './src/ShySteps'
import { ShySonTable } from './src/ShySonTable'
import ShySearch from './src/search/IndexView.vue'
import ShyForm from './src/ShyForm/IndexView.vue'
import ShyTable from './src/ShyTable/IndexView.vue'

import { App } from 'vue'

export {
  ShyClassTree,
  ShyTimeLine,
  ShySteps,
  ShySonTable,
  ShySearch,
  ShyForm,
  ShyTable
}

export default {
  install(app: App) {
    app.component('s-search', ShySearch)
    app.component('s-form', ShyForm)
    app.component('s-table', ShyTable)
  }
}
