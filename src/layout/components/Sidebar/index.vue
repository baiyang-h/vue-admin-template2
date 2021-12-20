<template>
  <a-menu
      theme="light"
      mode="inline"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @click="clickMenuItem"
  >
    <sidebar-item
      v-for="menuItem in menu"
      :key="menuItem.path"
      :menuItem="menuItem"
    />
  </a-menu>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch, onMounted } from "vue";
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

    const router = useRouter()
    const route = useRoute()
    const store = useStore();

    // vuex 中有权限的菜单路由
    const menu = computed(() => store.getters.menu)

    // 根 submenu 所有的 keys
    // menu 是处理过的菜单，只有菜单信息， 只要有children，并且不是空数组，那么就是 submenu
    let rootSubmenuKeys = ref(menu.value.filter(item => item.children && item.children.length).map(item => item.path));
    let selectedKeys = ref([]);     // 选中的keys
    let openKeys = ref([]);         // 展开的 submenu keys
    let preOpenKeys = ref([]);      // 前一个展开的 submenu keys

    onMounted(() => {
      // 初始 默认 selectedKeys ， 默认选中的
      selectedKeys.value = [route.path];
      // 初始化 默认 openKeys ， 默认有展开
      openKeys.value = getRouteOpenKeys()
    })

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
      router.push(e.key);
    }

    // 切换或者刷新、浏览器前进回退、tags切换，根路由变化，左侧菜单展开合拢
    function getRouteOpenKeys() {
      return route.matched.filter(_route => _route.meta && _route.meta.isSubmenu && _route.children.length).map(_route => _route.path)
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

    watch(
        () => route.path,
        (val) => {
          selectedKeys.value = [val]
        }
    )

    return {
      menu,
      rootSubmenuKeys,
      selectedKeys,
      openKeys,
      preOpenKeys,
      onOpenChange,
      clickMenuItem,
    }
  }
}
</script>

<style scoped>

</style>
