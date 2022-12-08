import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', redirect: '/user-select' },
  {
    path: '/user-select',
    title: '人物选择器',
    component: () => import('../views/UserSelectTest.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
