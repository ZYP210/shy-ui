import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import shyUi from '3h1-ui'
// import '3h1-ui/es/style.css'

const app = createApp(App)

app.use(Antd).use(shyUi).mount('#app')
