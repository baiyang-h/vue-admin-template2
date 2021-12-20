import router, { constantRoutes } from "@/router"
import {removeToken} from "libs/token";
const state = {
    // 所有有权限会展示的菜单
    menu: []
}

const mutations = {
    SET_MENU(state, menu) {
        state.menu = menu
    }
}

const actions = {
    // 账号退出、切换
    leave({ commit }) {
        // 清空 store 上的状态
        commit('SET_MENU', [])
        commit('permission/SET_ROUTES', [], { root: true })
        commit('tagView/DEL_ALL_CACHED_VIEWS', null, { root: true })
        commit('tagView/DEL_ALL_VISITED_VIEWS', null, { root: true })
        commit('user/SET_TOKEN', undefined, { root: true })
        commit('user/SET_ROLES', [], { root: true })
        commit('user/SET_ADMIN', {}, { root: true })
        // 删除Cookie中的token
        removeToken()
        // 移除所有路由配置
        const old_routes = router.getRoutes()
        // // 获取所有路由信息
        old_routes.forEach(item => {
            const name = item.name; //获取路由名词
            router.removeRoute(name); //移除路由
        })
        // // 生成新的路由栈
        constantRoutes.forEach((route) => {
            router.addRoute(route);
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
