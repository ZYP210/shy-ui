// import ShySearch from './src/search/IndexView.vue'
// import ShyForm from './src/ShyForm/IndexView.vue'
// import ShyTable from './src/ShyTable/IndexView.vue'
// import ShyPage from './src/ShyPage/IndexView.vue'

import ShyDialog from './src/ShyDialog/indexView.vue'
import UserSelect from './src/UserSelect/IndexView.vue'

import { BasicModal, useModal } from './src/Modal'

import {
  LazyContainer,
  ScrollContainer,
  ScrollActionType
} from './src/Container'

import { BasicTitle, BasicHelp } from './src/Basic'

import { Icon, SvgIcon, IconPicker } from './src/Icon'

import { BasicButton, PopConfirmButton } from './src/Button'

import { CodeEditor, JsonPreview } from './src/CodeEditor'

import 'ant-design-vue/dist/antd.min.css'
import './src/style/index.less'

import { App } from 'vue'

export {
  ShyDialog,
  UserSelect,
  BasicModal,
  useModal,
  LazyContainer,
  ScrollContainer,
  BasicTitle,
  BasicHelp,
  Icon,
  SvgIcon,
  IconPicker,
  BasicButton,
  PopConfirmButton,
  CodeEditor,
  JsonPreview
}
export type { ScrollActionType }

export default {
  install(app: App) {
    // app.component('s-search', ShySearch)
    // app.component('s-form', ShyForm)
    // app.component('s-table', ShyTable)
    // app.component('s-page', ShyPage)
    app.component('s-dialog', ShyDialog)
    app.component('user-select', UserSelect)
    app.component('basic-modal', BasicModal)
    app.component('LazyContainer', LazyContainer)
    app.component('ScrollContainer', ScrollContainer)
    app.component('BasicTitle', BasicTitle)
    app.component('BasicHelp', BasicHelp)
    app.component('Icon', Icon)
    app.component('SvgIcon', SvgIcon)
    app.component('IconPicker', IconPicker)
    app.component('BasicButton', BasicButton)
    app.component('PopConfirmButton', PopConfirmButton)
    app.component('CodeEditor', CodeEditor)
    app.component('JsonPreview', JsonPreview)
  }
}
