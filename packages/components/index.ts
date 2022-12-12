// import ShySearch from './src/search/IndexView.vue'
// import ShyForm from './src/ShyForm/IndexView.vue'
// import ShyTable from './src/ShyTable/IndexView.vue'
// import ShyPage from './src/ShyPage/IndexView.vue'

import ShyDialog from './src/ShyDialog/indexView.vue'
import UserSelect from './src/UserSelect/IndexView.vue'

import a from './src/components/Modal'

import 'ant-design-vue/dist/antd.min.css'

import { App } from 'vue'

export { ShyDialog, UserSelect }

export default {
  install(app: App) {
    // app.component('s-search', ShySearch)
    // app.component('s-form', ShyForm)
    // app.component('s-table', ShyTable)
    // app.component('s-page', ShyPage)
    app.component('s-dialog', ShyDialog)
    app.component('user-select', UserSelect)
    // app.component('basic-modal', BasicModal)
  }
}
