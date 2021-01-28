import { createRouter, createWebHistory } from 'vue-router'
import ROUTE_CONFIG from './router.config'
import { wrapFormatterRouter } from "@/libs/method";

// 首先对 app路由 进行了格式化，格式化你想的结构  ---> 至于后面的权限相关，再下一步格式化
export const appRoutes = wrapFormatterRouter(ROUTE_CONFIG.appRoutes)
export const constantRoutes = ROUTE_CONFIG.constantRoutes;

// const routes = [
//   ...constantRoutes,
//   ...appRoutes,
//   { path: '*', redirect: '/404', hidden: true }
// ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...ROUTE_CONFIG.constantRoutes, ...ROUTE_CONFIG.appRoutes]
})

export default router
