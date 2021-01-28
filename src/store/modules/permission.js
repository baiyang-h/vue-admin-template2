import router, { constantRoutes, appRoutes } from '@/router'
import { filterAsyncRoutes, wrapFormatterMenu } from '@/libs/method'

const state = {
    // 所有有访问权限的路由
    routes: [],
    // 有权限的应用路由
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
        commit('app/SET_MENU', wrapFormatterMenu(accessedRoutes, roles), { root: true });

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