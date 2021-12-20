<template>
  <a-breadcrumb-item v-if="!(route.children && route.children.length)">
    <a @click="onLink(route)">{{ route.meta.title }}</a>
  </a-breadcrumb-item>
  <a-breadcrumb-item  v-else>
    <a>{{ route.meta.title }}</a>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="childRoute in route.children" :key="childRoute.path">
          <a rel="next" @click="onLink(childRoute)">{{ childRoute.meta.title }}</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-breadcrumb-item>
</template>

<script>
import { isUrl } from "@/libs/common/regexp";
import {useRouter} from "vue-router";

export default {
  name: "BreadcrumbItem",

  props: {
    route: {
      type: Object,
      default: () => ({})
    }
  },

  setup() {
    const router = useRouter()

    function onLink(route) {
      if(isUrl(route.path)) {  // 如果是网页地址
        window.open(route.path)
      } else {
        router.push(route.path)
      }
    }

    return {
      onLink
    }
  }
}
</script>

<style scoped>

</style>
