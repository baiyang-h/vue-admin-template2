import router, { constantRoutes, appRoutes } from '@/router'

/**
 * @description                     路由是否有权限
 * @param roles: any[]              服务端返回的权限角色
 * @param route: any[]              单个菜单应用路由信息
 * @returns {boolean|*}
 */
function hasPermission(roles, route) {
    if(route.roles) {  // 返回的角色信息在 route的 roles 中，表示有权限
        return roles.some(role => route.roles.includes(role))
    } else {   // route 中不写 roles 表示都有权限
        return true
    }
}

/**
 * @description             对 appRoutes 菜单应用路由进行权限过滤，处理后只有有权限的路由，没有权限的路由过滤掉
 * @param routes:any[]      appRoutes  所有菜单应用路由
 * @param roles: any[]      服务端返回的角色信息，例如 ['admin', 'other']
 * @returns {[]}            返回过滤后有权限的路由
 */
export function filterAsyncRoutes(routes, roles) {
    const res = [];
    routes.forEach(route => {
        const tmp = { ...route };
        if(hasPermission(roles, tmp)) {
            if(tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    });
    console.log(122, res)
    return res
}

const state = {
    // 所有有访问权限的路由
    routes: [],
    // 有权限判断部分的路由
    appRoutes: []
};

const mutations = {
    SET_ROUTES(state, appRoutes) {
        // 权限路由
        state.appRoutes = appRoutes;
        // 权限路由+默认显示的路由
        state.routes = constantRoutes.concat(appRoutes);
    },

};

const actions = {
    generateRoutes({ commit }, roles) {
        let accessedRoutes;
        // 此处可进行权限判断，得到想要的路由。 超级管理员可以得到所有权限，其他登录人员相关有权限的部分可进入
        if(roles.includes('admin')) {
            accessedRoutes = appRoutes || [];
        } else {
            accessedRoutes = filterAsyncRoutes(appRoutes, roles)
        }
        commit('SET_ROUTES', accessedRoutes);

        // TODO 这句话好像有问题， 所以路由暂时先写死，后面在看 vur-router api， 4.x版本 去掉了addRoutes 这个api
        accessedRoutes.forEach(route => {
            router.addRoute(route)
        })
        console.log(accessedRoutes, router, router.getRoutes())
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}