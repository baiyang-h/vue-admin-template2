import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import ROUTE_CONFIG from './router.config'
import { wrapFormatterRouter } from "@/libs/method";

// 首先对 app路由 进行了格式化，格式化你想的结构  ---> 至于后面的权限相关，再下一步格式化
export const constantRoutes = ROUTE_CONFIG.constantRoutes;
export const appRoutes = wrapFormatterRouter(ROUTE_CONFIG.appRoutes)

// const routes = [
//   ...constantRoutes,
//   ...appRoutes,
//   { path: '*', redirect: '/404' }
// ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,   // 至于 appRoutes 需要经过权限验证，再通过 router.addRoute 添加进去
})

export default router
