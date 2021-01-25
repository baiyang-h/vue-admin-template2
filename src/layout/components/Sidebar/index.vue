<template>
  <a-menu
      theme="dark"
      mode="inline"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @click="clickMenuItem"
  >
    <sidebar-item
      v-for="route in appRoutes"
      :key="setBaseFullPathKey(route)"
      :route="route"
      :base-path="route.path"
    />
  </a-menu>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, watch, getCurrentInstance, onMounted } from "vue";
import SidebarItem from './sidebar-item';

export default {
  name: "Sidebar",

  components: {
    SidebarItem
  },

  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {

    const { ctx } = getCurrentInstance();
    const store = useStore();

    // vuex 中有权限的菜单路由
    const appRoutes = computed(() => store.getters.appRoutes)

    let rootSubmenuKeys = ref(appRoutes.value.map(route => route.path));   // 根 submenu 所有的 keys
    let selectedKeys = ref([]);     // 选中的keys
    let openKeys = ref([]);         // 展开的 submenu keys
    let preOpenKeys = ref([]);      // 前一个展开的 submenu keys

    onMounted(() => {
      const route = ctx.$router.currentRoute.value;
      // 初始 默认 selectedKeys ， 默认选中的
      selectedKeys.value = [route.path];
      // 初始化 默认 openKeys ， 默认有展开
      openKeys.value = route.matched.filter(_route => _route.meta && _route.meta.isSubmenu && _route.children.length).map(_route => _route.path)
    })

    // 因为 ant-design-vue 中的selectedKeys如果没封装组件直接写在 a-sub-menu和a-menu-item是会根据写的得到，但如果你封装成了一个组件，会以组件的key为根据，所以即使你组件内部的a-sub-menu和a-menu-item 也是没用的
    // -_-\\\ 一个小坑，
    function setBaseFullPathKey(route) {
      if(route.meta && route.meta.isSubmenu) {
        return route.path
      } else {
        return route.redirect ? route.redirect : route.path
      }
    }

    // 展开 submenu， 只会展开一个 submenu
    // 这里有个坑， 如果想用这个方法来 只展开一个 submenu， 那么在 <a-menu> 上定义 @openChange="onOpenChange" 并且 v-model:openKeys 改为 :openKeys
    function onOpenChange(keys) {
      const latestOpenKey = keys.find(key => openKeys.value.indexOf(key) === -1);
      if (rootSubmenuKeys.value.indexOf(latestOpenKey) === -1) {
        openKeys.value = keys;
      } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : [];
      }
    }

    // 点击 MenuItem
    function clickMenuItem(e) {
      ctx.$router.push(e.key);
    }

    // 监听 openKeys 用于保存上一次的 openKeys
    watch(
        () => openKeys.value,
        (val, oldVal) => {
          preOpenKeys.value = oldVal;
        }
    )

    // 监听 collapsed 伸缩
    watch(
        () => props.collapsed,
        (val) => {
          if(val) {
            openKeys.value = [];
          } else {
            openKeys.value = preOpenKeys.value
          }
        }
    )

    return {
      appRoutes,
      rootSubmenuKeys,
      selectedKeys,
      openKeys,
      preOpenKeys,
      setBaseFullPathKey,
      onOpenChange,
      clickMenuItem,
    }
  }
}
</script>

<style scoped>

</style>