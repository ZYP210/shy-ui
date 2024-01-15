import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.min.css'
// import shyUi from '3h1-ui'
import router from './router/index'
// import '3h1-ui/es/style.css'

// 注册windicss
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import '/@/design/index.less'
import 'virtual:windi-utilities.css'

// 注册本地svg
import 'virtual:svg-icons-register'

import { BasicTable, registerGlobalConfig } from '3h1-ui'
import { Plugin } from 'vue'

const app = createApp(App)

registerGlobalConfig({ form: { rangePickerField: [['createTime']] } })

app
  .use(router)
  .use(BasicTable as unknown as Plugin, {})
  .mount('#app')
