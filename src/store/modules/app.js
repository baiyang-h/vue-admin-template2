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

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}