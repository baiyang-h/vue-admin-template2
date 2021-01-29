<template>
  <a-sub-menu v-if="menuItem.children && menuItem.children.length">
    <template #title>
        <span>
          <AppstoreOutlined />
          <span>{{ menuItem.meta && menuItem.meta.title }}</span>
        </span>
    </template>
    <sidebar-item
        v-for="child in menuItem.children"
        :key="child.path"
        :menuItem="child"
    />
  </a-sub-menu>
  <a-menu-item v-else>
    <AppstoreOutlined />
    <span>{{ menuItem.meta && menuItem.meta.title }}</span>
  </a-menu-item>
</template>

<script>
import {
  AppstoreOutlined,
} from '@ant-design/icons-vue';

export default {
  name: "SidebarItem",

  components: {
    AppstoreOutlined
  },

  props: {
    menuItem: {
      type: Object,
      required: true
    },
  },

}
</script>

<style scoped>

</style>