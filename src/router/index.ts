import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'welcome',
    component: () => import('../views/welcome.vue'),
    children:
        [
          {
            path: '/create',
            name: 'Create',
            component: () => import('../components/welcome/Create.vue')
          },
          {
            path: '/guest',
            name: 'Guest',
            component: () => import('../components/welcome/Guest.vue')
          },
        ]
  },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/404.vue')
    },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
