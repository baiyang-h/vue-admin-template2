<template>
  <a-breadcrumb>
    <a-breadcrumb-item @click="()=>$router.push('/')">
      <home-outlined />
    </a-breadcrumb-item>
    <breadcrumb-item
        v-for="route in levelList"
        :key="route.path"
        :route="route"
    />
  </a-breadcrumb>
</template>

<script>
import { ref } from 'vue';
import { HomeOutlined } from '@ant-design/icons-vue';
import BreadcrumbItem from './breadcrumb-item';
import {useRoute} from "vue-router";

export default {
  name: "Breadcrumb",

  components: {
    HomeOutlined,
    BreadcrumbItem
  },

  watch: {
    $route: {
      handler: 'getBreadcrumb',
      immediate: true
    }
  },

  setup() {
    const route = useRoute()

    const levelList = ref([])

    function getBreadcrumb() {
      const matched = route.matched;
      if(route.name === 'Home') {
        levelList.value = []
      } else {
        // 根据菜单标题， 得到会显示的菜单， 如果没标题，那就是有问题的。所以路由配置的时候，如果不是 Submenu 的话，记得 子children中path: index 中写明 meta.title
        levelList.value = matched.filter(route => route.meta && route.meta.title);
      }
    }

    return {
      levelList,
      getBreadcrumb
    }

  }
}
</script>

<style scoped lang="scss">
  .ant-breadcrumb {
    display: flex;
    align-items: center;
    // >>> 好像在 sass 中不解析，需要使用 ::v-deep 代替（别名） 或 /deep/，不过/deep/浏览器处理兼容有问题
    >>> .ant-breadcrumb-link {
      cursor: pointer;
      background: orange;
    }
    ::v-deep .ant-breadcrumb-link {
      cursor: pointer;
    }
  }
</style>
