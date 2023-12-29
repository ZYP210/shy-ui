import './assets/style.css'
import 'virtual:uno.css'
import 'reset-css'
// import Antd from 'ant-design-vue';
import Shy2dEditor from './views/index.vue'
import type { App } from 'vue'
import 'dayjs/locale/zh-cn'
import 'ant-design-vue/dist/antd.min.css'

import './assets/js/canvas2svg.js'
import './assets/js/echarts.min.js'
import './assets/js/icon-font.js'

// ['/js/icon-font.js', '/js/echarts.min.js', '/js/canvas2svg.js'].forEach(
//   (item) => {
//     const script = document.createElement('script');
//     script.src = item;
//     // 将 <script> 标签添加到页面中
//     document.body.appendChild(script);
//   },
// );

export default {
  install(app: App) {
    app.component('Shy2dEditor', Shy2dEditor)
  }
}

export { useShy2dEditor } from './hooks/useShy2dEditor.js'
