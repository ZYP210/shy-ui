import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
// import 'ant-design-vue/dist/antd.min.css'

// import shyUi from '3h1-ui'
import router from './router/index'


// 注册windicss
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import '/@/design/index.less'
import 'virtual:windi-utilities.css'

// 注册本地svg
import 'virtual:svg-icons-register'

import { BasicTable, registerGlobalConfig, shyTableBasicProps, basicContainerProps } from '3h1-ui'
import { Plugin } from 'vue'
// import ShyFlowDingDing from '@shy-plugins/workflow-dingding';
// import '@shy-plugins/workflow-bpmn/es/style.css'
// import '@shy-plugins/workflow-dingding/es/style.css'
import 'ant-design-vue/dist/reset.css';
import '3h1-ui/es/style.css'
const app = createApp(App)

registerGlobalConfig({ form: { rangePickerField: [['createTime']] } })

shyTableBasicProps.headerAlign.default = 'right'
shyTableBasicProps.isShowTitle.default = false

basicContainerProps.isShowBack.default = false

app
  // .use(ShyFlowDingDing)
  .use(router)
  .use(BasicTable as unknown as Plugin, {})
  .mount('#app')
