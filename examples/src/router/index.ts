import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
console.log(1, routes)

const router = createRouter({
  routes: [
    ...routes
    // {
    //   name: 'a',
    //   path: '/2dEditor',
    //   component: () => import('../views/2dEditor/2dEditor.vue')
    // }
  ],
  history: createWebHistory()
})

export default router
