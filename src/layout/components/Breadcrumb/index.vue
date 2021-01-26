<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
  name: "Breadcrumb",

  data() {
    return {
      levelList: []
    }
  },

  watch: {
    $route: {
      handler: 'getBreadcrumb',
      immediate: true
    }
  },

  methods: {
    getBreadcrumb() {
      const { path } = this.$route;
      const matched = this.$route.matched;
      // 根据菜单标题， 得到会显示的菜单， 如果没标题，那就是有问题的。所以路由配置的时候，如果不是 Submenu 的话，记得 子children中path: index 中写明 meta.title
      let levelList = matched.filter(route => route.meta && route.meta.title);
      // 对于不是home的菜单，默认第一个是home
      if(path !== '/home/index') {
        levelList.unshift({
          path: '/',
          name: 'Home',
          redirect: '/home',
          meta: { title: '首页' }
        })
      }

      console.log(path, matched, levelList)
    }
  }

  // setup() {
  //   const { ctx } = getCurrentInstance();
  //   const route = ctx.$router.currentRoute.value
  //   const matched = route.matched;
  //
  //   console.log(ctx, route)
  // }
}
</script>

<style scoped>
  .ant-breadcrumb {
    display: flex;
    align-items: center;
  }
</style>