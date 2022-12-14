import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', redirect: '/modal-view' },
  {
    path: '/user-select',
    title: '人物选择器',
    component: () => import('../views/UserSelectTest.vue')
  },
  {
    path: '/modal-view',
    title: '人物选择器',
    component: () => import('../views/ModalView.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
