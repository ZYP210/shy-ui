import ShySearch from './src/search/IndexView.vue'
import ShyForm from './src/ShyForm/IndexView.vue'
import ShyTable from './src/ShyTable/IndexView.vue'
import ShyPage from './src/ShyPage/IndexView.vue'
import 'ant-design-vue/dist/antd.css'

import { App } from 'vue'

export { ShySearch, ShyForm, ShyPage, ShyTable }

export default {
  install(app: App) {
    app.component('s-search', ShySearch)
    app.component('s-form', ShyForm)
    app.component('s-table', ShyTable)
    app.component('s-page', ShyPage)
  }
}
