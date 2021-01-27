<template>
  <a-layout id="components-layout-demo-custom-trigger">

<!--    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>-->
<!--      <div class="logo" />-->
<!--      <sidebar :collapsed="collapsed" />-->
<!--    </a-layout-sider>-->

    <a-layout>

      <a-layout-header>
<!--        <collapsed-icon :collapsed="collapsed" @update:collapsed="collapsed=$event" />-->
        <breadcrumb />
      </a-layout-header>

      <a-layout-content>
<!--        <app-main />-->
      </a-layout-content>

    </a-layout>

  </a-layout>
</template>

<script>
import { ref } from 'vue';
import { Sidebar, CollapsedIcon, Breadcrumb, AppMain,  } from './components';

export default {

  name: 'Layout',

  components: {
    Sidebar,
    CollapsedIcon,
    Breadcrumb,
    AppMain,
  },

  setup() {

    let collapsed = ref(false);

    return {
      collapsed,
    }
  }

};
</script>

<style scoped lang="scss">
#components-layout-demo-custom-trigger {
  height: 100%;

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .ant-layout-header {
    display: flex;
    background: #fff;
    padding: 0;
  }

  .ant-layout-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }

}
</style>
