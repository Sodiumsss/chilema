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
            {
                path: '/login',
                name: 'Login',
                component: () => import('../components/welcome/Login.vue')
            },
            {
                path: '/forgetPW',
                name: 'forgetPW',
                component: () => import('../components/welcome/ForgetPW.vue')
            },
        ]

    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index.vue'),
        children:
        [
            {
                path: '/hello',
                name: 'hello',
                component: () => import('../components/index/Hello.vue')
            },
            {
                path: '/editMyself',
                name: 'editMyself',
                component: () => import('../components/index/EditMyself.vue')
            },
            {
                path: '/search',
                name: 'search',
                component: () => import('../components/index/Search.vue')
            },
            {
                path: '/contribute',
                name: 'contribute',
                component: () => import('../components/index/Contribute.vue')
            },
            {
                path: '/hollow',
                name: 'hollow',
                component: () => import('../components/index/Hollow.vue')
            },

            {
                path: '/suggest',
                name: 'suggest',
                component: () => import('../components/index/Suggest.vue')
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
