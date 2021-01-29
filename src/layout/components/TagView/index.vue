<template>
  <div class="tag-view">
    <a-tag closable>Tag 1</a-tag>
    <a-tag closable>Tag 1</a-tag>
    <a-tag closable>Tag 1</a-tag>
  </div>
</template>

<script>
import { onMounted, computed, getCurrentInstance, watch } from 'vue'
import { useStore } from 'vuex'

// 生成 tagView 数据
function generateTagView(route) {
  return {
    path: route.path,
    name: route.name,
    meta: route.meta
  }
}

export default {
  name: "TagView",

  setup() {
    const store = useStore()
    const { ctx } = getCurrentInstance()

    // 拉平的应用路由 appRoutes
    const flatAppRoutes = computed(() => store.getters.flatAppRoutes)

    // 初始化tags
    onMounted(() => {
      init()
    })

    // 监听 $route 当前路由来 添加/处理化 tagView
    watch(
        () => ctx.$router.currentRoute.value,
        (val) => {
          addView(generateTagView(val))
        }
    )

    function init() {
      // 得到是 route.cofig 中 mata.affix 为 true 的数组，即在tagViews中默认显示的 route
      const affixRoutes = filterAffixRoute(flatAppRoutes.value);
      // 初始化会显示的 tags， 此时还不涉及到缓存 keep-alive， 要点击后才会有缓存
      affixRoutes.forEach(tagRoute => {
        store.dispatch('tagView/addVisitedView', tagRoute);
      })
      // 初始化的当前路由 tag 需要添加到缓存列表中
      const route = ctx.$router.currentRoute.value
      store.dispatch('tagView/addCachedView', generateTagView(route));
    }

    // 增加标签栏的 tagView
    function addView(tagRoute) {
      store.dispatch('tagView/addView', tagRoute);
    }

    // 处理得到 tagViews 默认显示的 route，  以 meta.affix 为根据
    function filterAffixRoute(flatAppRoutes) {
      const affixRoutes = []
      flatAppRoutes.forEach(route => {
        if(route.meta && route.meta.affix) {
          affixRoutes.push(generateTagView(route))
        }
      })
      return affixRoutes
    }


  }
}
</script>

<style scoped lang="scss">
.tag-view {
  height: 34px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  padding: 5px 10px 0;
  box-sizing: border-box;
}
</style>