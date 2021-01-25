import { getToken, setToken } from '@/utils/token'
import api from '@/api';

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
    // 登录 设置token
    async login({ commit }, user) {
        try {
            const r = await api.user.request_login(user);
            if(r.success) {
                const token = r.data.token;
                commit('SET_TOKEN', token);     // 存 store
                setToken(token);                // 存 cookie
            } else {
                throw new Error(r.message);
            }
        } catch (e) {
            throw new Error(e);
        }
    },
    // 设置用户信息
    async getInfo({ commit }, token) {
        try {
            const r = await api.user.request_getInfo(token);
            if(r.success) {
                commit('SET_ROLES', r.data.roles);
                commit('SET_ADMIN', r.data);
                return r.data.roles
            } else {
                throw new Error(r.message);
            }
        } catch (e) {
            throw new Error(e);
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
