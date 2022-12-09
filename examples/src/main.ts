import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.min.css'
import shyUi from '3h1-ui'
import router from './router/index'
// import '3h1-ui/es/style.min.css'

const app = createApp(App)

app.use(router).use(Antd).use(shyUi).mount('#app')
