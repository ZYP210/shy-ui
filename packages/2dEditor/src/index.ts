console.log(1)

// import './assets/style.css'
// import 'virtual:uno.css'
// import Antd from 'ant-design-vue';
import Shy2dEditor from './views/index.vue'
import 'dayjs/locale/zh-cn'
import 'ant-design-vue/dist/antd.min.css'

import './assets/js/canvas2svg.js'
import './assets/js/echarts.min.js'
import './assets/js/icon-font.js'

// export default {
//   install(app: App) {
//     app.component('Shy2dEditor', Shy2dEditor)
//   }
// }

export { useShy2dEditor } from './hooks/useShy2dEditor.js'
export { Shy2dEditor }
