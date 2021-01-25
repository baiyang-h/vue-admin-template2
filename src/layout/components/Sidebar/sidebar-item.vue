<template>
  <template v-if="!route.hidden">
    <a-sub-menu
        v-if="isMenuItemOrSubmenu(route.children, route)"
    >
      <template #title>
        <span>
          <AppstoreOutlined />
          <span>{{ route.meta && route.meta.title }}</span>
        </span>
      </template>
      <sidebar-item
          v-for="child in route.children"
          :key="resolvePath(child.path)"
          :route="child"
          :base-path="resolvePath(child.path)"
      />
    </a-sub-menu>
    <a-menu-item v-else>
      <AppstoreOutlined />
      <span>{{ onlyOneChild.meta && onlyOneChild.meta.title }}</span>
    </a-menu-item>
  </template>
</template>

<script>
import path from 'path';
import {
  AppstoreOutlined,
} from '@ant-design/icons-vue';

export default {
  name: "SidebarItem",

  components: {
    AppstoreOutlined
  },

  props: {
    route: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },

  data() {
    //用于存储el-menu-item 的当前路由
    return {
      onlyOneChild: {},
    }
  },

  methods: {

    isMenuItemOrSubmenu(children=[], route) {
      /**@description 是否是el-submenu-item 或者 menu-Item **/
      if(route.meta && route.meta.isSubmenu) {
        return true
      } else {
        // 先进行过滤，排除掉 hidden:true 不显示的菜单
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // 如果子路由下存在多个路由，则选择最后一个，后者覆盖前面的
            this.onlyOneChild = item;
            return true
          }
        });
        // 当el-menu-item路由写法 不写children层，直接只写父层时，直接取父级
        if(!showingChildren.length) this.onlyOneChild = route;
        // 对于没有定义 isSubmenu 却又写了 children 子路由的情况时，如果子路由中不写meta，那么按照父 mata
        if(!this.onlyOneChild.meta) {
          this.onlyOneChild.meta = route.meta
        }
        return false
      }
    },

    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    }

  }
}
</script>

<style scoped>

</style>