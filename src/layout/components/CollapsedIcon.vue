<template>
  <div class="collapsed">
    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="$emit('update:collapsed', !collapsed)"/>
    <menu-fold-outlined v-else class="trigger" @click="$emit('update:collapsed', !collapsed)" />
  </div>
</template>

<script>

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

export default {

  name: "CollapsedIcon",

  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },

  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },

}
</script>

<style scoped lang="scss">
.collapsed {
  display: flex;
  align-items: center;
  .trigger {
    font-size: 18px;
    padding: 0 15px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
}
</style>