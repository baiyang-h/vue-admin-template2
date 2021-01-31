<template>
  <router-view v-slot="{ Component }">
<!--    <transition name="fade-main" mode="out-in">-->
<!--      -->
<!--    </transition>-->
    <keep-alive :include="cachedViews">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {

  name: "AppMain",

  setup() {
    const store = useStore();

    const cachedViews = computed(() => store.getters.cachedViews)

    return {
      cachedViews
    }
  }
}
</script>
