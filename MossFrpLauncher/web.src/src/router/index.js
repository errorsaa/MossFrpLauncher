import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/homeView.vue'),
    },
    {
      path: '/tunnel',
      name: 'tunnel',
      component: () => import('@/views/tunnelView.vue')
    },
    {
      path: '/log',
      name: 'log',
      component: () => import('@/views/logView.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/settingView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/aboutView.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/loginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/registerView.vue')
    },
    {
      path: '/reSetPassword',
      name: 'reSetPassword',
      component: () => import('@/views/reSetPasswordView.vue')
    }
  ]
})

export default router
