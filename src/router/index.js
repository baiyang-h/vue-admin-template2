import { createRouter, createWebHistory } from 'vue-router'
import ROUTE_CONFIG from './router.config'
import { isUrl } from '@/libs/common/regexp'
import { join } from 'path'

/**
 * @description 将路由进行重新格式化，主要针对 appRoutes 应用路由，将 children 路由的 path 和 roles，根据父级补全，如 父 /home，子 index --> 子格式化为 /home/index
 * @param routes        传入的路由，如 appRoutes， item.children
 * @param parentPath    父的 path，  为了拼接完整路径
 * @param parentRoles   父的 roles   父的权限补齐子权限
 * @returns {*}         返回一个新的 routes
 */
function wrapFormatterRouter(routes, parentPath='/', parentRoles) {
  return routes.map(item => {
    let { path } = item;
    // 是否是 url 地址
    if (!isUrl(path)) {
      path = join(parentPath, path)
    }
    const result = {
      ...item,
      path,
      roles: item.roles || parentRoles,
    };

    if (item.children) {
      result.children = wrapFormatterRouter(item.children, path, item.roles);
    }
    return result;
  });
}

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
