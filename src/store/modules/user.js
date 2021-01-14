import { getToken } from '@/utils/token'

const state = {
    token: getToken(),  // 先从 cookie 中查询
    roles: [],
    admin: {}
};
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_ADMIN: (state, admin) => {
        state.admin = admin
    }
};
const actions = {
    // 登录
    login({ commit }, token) {
        commit('SET_TOKEN', token)
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
