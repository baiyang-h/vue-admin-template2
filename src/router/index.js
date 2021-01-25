import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'

/**
 * hidden
 * cache
 */

/* Router Modules */
import tableRouter from './modules/table';
import formRouter from './modules/form'
import nestedRouter from './modules/nested';
import cacheRouter from './modules/cache'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/redirect'),
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404')
  },
]

export const appRoutes = [
  {
    path: '/home',
    redirect: '/home/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Home',
        meta: {
          title: 'Home',
        },
        component: () => import('@/views/home')
      }
    ]
  },
  {
    path: '/permission',
    redirect: '/permission/page',
    name: 'Permission',
    component: Layout,
    meta: {
      title: 'Permission',
      icon: 'el-icon-menu',
      roles: ['admin', 'other'],
      isSubmenu: true
    },
    children: [
      {
        path: 'page',
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
        },
        component: () => import('@/views/permission/page'),
      },
      {
        path: 'role',
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['admin']
        },
        component: () => import('@/views/permission/role'),
      }
    ]
  },
  tableRouter,
  formRouter,
  nestedRouter,
  cacheRouter
]

// const routes = [
//   ...constantRoutes,
//   ...appRoutes,
//   { path: '*', redirect: '/404', hidden: true }
// ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...constantRoutes, ...appRoutes]
})

export default router
