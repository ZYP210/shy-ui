import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  // { path: '/', redirect: '/modal-view' },
  // {
  //   path: '/user-select',
  //   title: '人物选择器',
  //   component: () => import('../views/UserSelectTest.vue')
  // },
  {
    path: '/Tinymce',
    title: 'Tinymce',
    component: () => import('../views/Tinymce.vue')
  },
  {
    path: '/Qrcode',
    title: 'Qrcode',
    component: () => import('../views/Qrcode.vue')
  },
  {
    path: '/Loading',
    title: 'Loading',
    component: () => import('../views/Loading.vue')
  },
  {
    path: '/Page',
    title: 'yemian',
    component: () => import('../views/Page.vue')
  },
  {
    path: '/modal-view',
    title: '人物选择器',
    component: () => import('../views/ModalView.vue')
  },
  {
    path: '/ScrollBar',
    title: '滚动条',
    component: () => import('../views/ScrollBar.vue')
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
  // {
  //   path: '/CodeEditor',
  //   title: 'CodeEditor',
  //   component: () => import('../views/CodeEditor.vue')
  // },
  {
    path: '/CountDown',
    title: 'CountDown',
    component: () => import('../views/CountDown.vue')
  },
  {
    path: '/CountDownInput',
    title: 'CountDownInput',
    component: () => import('../views/CountDownInput.vue')
  },
  {
    path: '/ClickOutSide',
    title: 'ClickOutSide',
    component: () => import('../views/ClickOutSide.vue')
  },
  {
    path: '/CountTo',
    title: 'CountTo',
    component: () => import('../views/CountTo.vue')
  },
  {
    path: '/Cropper',
    title: 'Cropper',
    component: () => import('../views/Cropper.vue')
  },
  // {
  //   path: '/Transition',
  //   title: 'Transition',
  //   component: () => import('../views/Transition.vue')
  // },
  {
    path: '/CollapseContainer',
    title: 'CollapseContainer',
    component: () => import('../views/CollapseContainer.vue')
  },
  {
    path: '/Description',
    title: 'Description',
    component: () => import('../views/Description.vue')
  },
  {
    path: '/Drawer',
    title: 'Drawer',
    component: () => import('../views/Drawer.vue')
  },
  // {
  //   path: '/FlowChart',
  //   title: 'FlowChart',
  //   component: () => import('../views/FlowChart.vue')
  // },
  {
    path: '/StrengthMeter',
    title: 'StrengthMeter',
    component: () => import('../views/StrengthMeter.vue')
  },
  {
    path: '/Form',
    title: 'Form',
    component: () => import('../views/Form.vue')
  },
  {
    path: '/Table',
    title: 'Form',
    component: () => import('../views/Table.vue')
  },
  {
    path: '/Tree',
    title: 'Tree',
    component: () => import('../views/Tree.vue')
  },
  {
    path: '/Gantt',
    title: 'Gantt',
    component: () => import('../views/Gantt.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
