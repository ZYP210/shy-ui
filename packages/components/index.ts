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
  ScrollActionType,
  CollapseContainer
} from './src/Container'

import { BasicTitle, BasicHelp, BasicArrow } from './src/Basic'

import { Icon, SvgIcon, IconPicker } from './src/Icon'

import { BasicButton, PopConfirmButton } from './src/Button'

import { CodeEditor, JsonPreview } from './src/CodeEditor'

import { CountButton, CountdownInput } from './src/CountDown'
import { ClickOutSide } from './src/ClickOutSide'
import { CountTo } from './src/CountTo'
import { CropperImage, AvatarCropper } from './src/Cropper'

import { useDescription, Description } from './src/Description'
export * from './src/Description'

export * from './src/Form'
// export * from './src/Drawer'

import { PageFooter, PageWrapper } from './src/Page'
export { PageFooter, PageWrapper }

import { useDrawer, useDrawerInner, BasicDrawer } from './src/Drawer'
export { useDrawer, useDrawerInner, BasicDrawer }

import { FlowChart } from './src/FlowChart'
export { FlowChart }

import { StrengthMeter } from './src/StrengthMeter'

import {
  BasicTable,
  TableAction,
  EditTableHeaderIcon,
  TableImg,
  TableDict
} from './src/Table'
export * from './src/Table'

export * from './src/ContextMenu'

import {
  FadeTransition,
  ScaleTransition,
  SlideYTransition,
  ScrollYTransition,
  SlideYReverseTransition,
  ScrollYReverseTransition,
  SlideXTransition,
  ScrollXTransition,
  SlideXReverseTransition,
  ScrollXReverseTransition,
  ScaleRotateTransition,
  ExpandXTransition,
  ExpandTransition
} from './src/Transition'
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
  JsonPreview,
  CountButton,
  CountdownInput,
  ClickOutSide,
  CountTo,
  CropperImage,
  AvatarCropper,
  BasicArrow,
  FadeTransition,
  ScaleTransition,
  SlideYTransition,
  ScrollYTransition,
  SlideYReverseTransition,
  ScrollYReverseTransition,
  SlideXTransition,
  ScrollXTransition,
  SlideXReverseTransition,
  ScrollXReverseTransition,
  ScaleRotateTransition,
  ExpandXTransition,
  ExpandTransition,
  CollapseContainer,
  useDescription,
  Description,
  StrengthMeter
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
    app.component('CountButton', CountButton)
    app.component('CountdownInput', CountdownInput)
    app.component('ClickOutSide', ClickOutSide)
    app.component('CountTo', CountTo)
    app.component('CropperImage', CropperImage)
    app.component('AvatarCropper', AvatarCropper)
    app.component('BasicArrow', BasicArrow)
    app.component('CollapseContainer', CollapseContainer)
    app.component('Description', Description)
    app.component('BasicDrawer', BasicDrawer)
    app.component('FlowChart', FlowChart)
    app.component('FlowChart', FlowChart)
    app.component('StrengthMeter', StrengthMeter)
    app.component('PageFooter', PageFooter)
    app.component('PageWrapper', PageWrapper)
    app.component('BasicTable', BasicTable)

    app.component('TableImg', TableImg)
    app.component('TableAction', TableAction)
    app.component('EditTableHeaderIcon', EditTableHeaderIcon)
    app.component('TableDict', TableDict)
  }
}
