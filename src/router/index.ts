import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
    path: '/',
    name: 'welcome',
    component: () => import('../views/Welcome.vue'),
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
        path: '/food',
        name: 'food',
        component: () => import('../views/Food.vue')
    },

    {
        path: '/index',
        name: 'Index',
        component: () => import('../views/Index.vue'),
        children:
        [
            {
                path: '/hello',
                name: 'hello',
                component: () => import('../components/index/Hello.vue')
            },

            {
                path: '/profile',
                name: 'profile',
                component: () => import('../components/index/Profile.vue')
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
                path: '/joinHollow',
                name: 'joinHollow',
                component: () => import('../components/index/joinHollow.vue')
            },

            {
                path: '/suggest',
                name: 'suggest',
                component: () => import('../components/index/Suggest.vue')
            },
        ]
    },
    {
        path: '/hollowFather',
        name: 'hollowFather',
        component: () => import('../views/HollowFather.vue'),
        children:[
            {
                path: '/threadRead',
                name: 'threadRead',
                component: () => import('../components/hollow/ThreadRead.vue')
            },
            {
                path: '/hollow',
                name: 'hollow',
                component: () => import('../components/hollow/hollowShow.vue')
            },
        ]
    },

    {
        path: '/r',
        name: 'r',
        component: () => import('../views/Redirect.vue')
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
