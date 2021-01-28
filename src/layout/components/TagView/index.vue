<template>
  <div class="tag-view">
    <a-tag closable>Tag 1</a-tag>
    <a-tag closable>Tag 1</a-tag>
    <a-tag closable>Tag 1</a-tag>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: "TagView",

  setup() {
    const store = useStore()
    const appRoutes = store.getters.appRoutes

    // 初始化tags
    onMounted(() => {
      init()
    })

    function init() {
      const affixTags = filterAffixTags(appRoutes);
    }

    function filterAffixTags() {

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