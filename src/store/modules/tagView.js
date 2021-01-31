const state = {
    // 所有显示的 tagView。  这里存的是一个个的对象
    visitedViews: [],
    // keep-alive 需要缓存的 tagView, 注意这里要把 meta.noCache 排除掉。  这里存的是一个个的 name 字符串
    // 缓存列表中保存的是 route.name  要对应组件内部的 name，所以 route.name要和模块组件name 一致， 因为 keep-alive 的 include就是 组件的 name
    cachedViews: []
}

const mutations = {
    // 添加单个 visitedView
    ADD_VISITED_VIEW(state, view) {
        if(state.visitedViews.some(v => v.path === view.path)) return;
        state.visitedViews.push(view)
    },
    // 添加单个 cachedView
    ADD_CACHED_VIEW(state, view) {
        if(state.cachedViews.includes(view.name)) return;
        // 如果 meta.noCache: true 不需要缓存
        if(!(view.meta && view.meta.noCache)) {
            state.cachedViews.push(view.name)
        }
    },
    // 关闭单个 visitedView
    DEL_VISITED_VIEW(state, view) {
        for(let [i, v] of state.visitedViews.entries()) {
            if(v.path === view.path) {
                state.visitedViews.splice(i, 1);
                break
            }
        }
    },

    // 关闭单个 cachedView
    DEL_CACHED_VIEW(state, view) {
        const index = state.cachedViews.indexOf(view.name);
        index > -1 && state.cachedViews.splice(index, 1);
    },
    // 关闭其他 visitedViews,     保留 默认显示的tag、当前tag
    DEL_OTHERS_VISITED_VIEWS(state, view) {
        state.visitedViews = state.visitedViews.filter(v => v.meta && v.meta.affix || v.path === view.path)
    },
    // 关闭其他 cachedViews
    DEL_OTHERS_CACHED_VIEWS(state, view) {
        state.cachedViews = state.cachedViews.filter(name => view.name === name)
    },

    // 关闭所有visitedViews，只留下默认显示的
    DEL_ALL_VISITED_VIEWS(state) {
        state.visitedViews = state.visitedViews.filter(view => view.meta && view.meta.affix)
    },
    DEL_ALL_CACHED_VIEWS(state) {
        state.cachedViews = [];
    }
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

    // 关闭 visitedView、cachedView
    delView({ dispatch, state }, view) {
        dispatch('delVisitedView', view);
        dispatch('delCachedView', view);
        return {
            visitedViews: state.visitedViews,
            cachedViews: state.cachedViews
        }
    },
    // 关闭 visitedView
    delVisitedView({ commit }, view) {
        commit('DEL_VISITED_VIEW', view);
    },
    // 关闭 cachedView
    delCachedView({ commit }, view) {
        commit('DEL_CACHED_VIEW', view);
    },

    // 关闭其他 visitedView、cachedView
    delOthersViews({ dispatch }, view) {
        dispatch('delOthersVisitedViews', view);
        dispatch('delOthersCachedViews', view);
    },
    // 关闭其他 visitedView
    delOthersVisitedViews({ commit }, view) {
        commit('DEL_OTHERS_VISITED_VIEWS', view);
    },
    // 关闭其他 cachedView
    delOthersCachedViews({ commit }, view) {
        commit('DEL_OTHERS_CACHED_VIEWS', view);
    },

    // 关闭所有 visitedView、cachedView
    delAllViews({ dispatch, state }) {
        dispatch('delAllVisitedViews');
        dispatch('delAllCachedViews');
        return {
            visitedViews: state.visitedViews,
        }
    },
    // 关闭所有 visitedView
    delAllVisitedViews({ commit }) {
        commit('DEL_ALL_VISITED_VIEWS');
    },
    // 关闭所有 cachedView
    delAllCachedViews({ commit }) {
        commit('DEL_ALL_CACHED_VIEWS');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}