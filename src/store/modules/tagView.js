const state = {
    // 所有显示的 tagView。  这里存的是一个个的对象
    visitedViews: [],
    // keep-alive 需要缓存的 tagView, 注意这里要把 meta.noCache 排除掉。  这里存的是一个个的 path 字符串
    cachedViews: []
}

const mutations = {
    ADD_VISITED_VIEW(state, view) {
        if(state.visitedViews.some(v => v.path === view.path)) return;
        state.visitedViews.push(view)
    },

    // 添加 cachedView
    ADD_CACHED_VIEW(state, view) {
        if(state.cachedViews.includes(view.path)) return;
        // 如果 meta.noCache: true 不需要缓存
        if(!(view.meta && view.meta.noCache)) {
            state.cachedViews.push(view.path)
        }
    },
}

const actions = {

    // 添加 visitedView, cachedView
    addView({ dispatch }, view) {
        dispatch('addVisitedView', view)
        dispatch('addCachedView', view)
    },

    // 添加 visitedView
    addVisitedView({ commit }, view) {
        commit('ADD_VISITED_VIEW', view)
    },

    // 添加 cachedView
    addCachedView({ commit }, view) {
        commit('ADD_CACHED_VIEW', view)
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}