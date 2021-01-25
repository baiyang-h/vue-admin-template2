<template>
  <router-view v-slot="{ Component }">
<!--    <transition name="fade-main" mode="out-in">-->
<!--      -->
<!--    </transition>-->
    <keep-alive :include="['Cache']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { getCurrentInstance, computed } from 'vue';
export default {

  name: "AppMain",

  setup() {

    const { ctx } = getCurrentInstance();

    const key = computed(() => {
      console.log(ctx.$router.currentRoute.value.path)
      return ctx.$router.currentRoute.value.path
    })

    return {
      key
    }
  }
}
</script>
