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
  },
  {
    path: '/scrollBar',
    title: '滚动条',
    component: () => import('../views/ModalView.vue')
  },
  {
    path: '/LazyContainer',
    title: '滚动条',
    component: () => import('../views/LazyContainer.vue')
  },
  {
    path: '/ScrollContainer',
    title: '滚动条',
    component: () => import('../views/ScrollContainer.vue')
  },
  {
    path: '/BasicTitle',
    title: 'BasicTitle',
    component: () => import('../views/BasicTitle.vue')
  },
  {
    path: '/BasicHelp',
    title: 'BasicHelp',
    component: () => import('../views/BasicHelp.vue')
  },
  {
    path: '/IconView',
    title: 'IconView',
    component: () => import('../views/IconView.vue')
  },
  {
    path: '/ButtonView',
    title: 'ButtonView',
    component: () => import('../views/ButtonView.vue')
  },
  {
    path: '/CodeEditor',
    title: 'CodeEditor',
    component: () => import('../views/CodeEditor.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
