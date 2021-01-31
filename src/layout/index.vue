<template>
  <a-layout id="components-layout-demo-custom-trigger">

    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <sidebar :collapsed="collapsed" />
    </a-layout-sider>

    <a-layout>

      <a-layout-header>
        <div class="navigation">
          <collapsed-icon :collapsed="collapsed" @update:collapsed="collapsed=$event" />
          <navbar />
        </div>
        <tag-view />
      </a-layout-header>

      <a-layout-content>
        <app-main />
      </a-layout-content>

    </a-layout>

  </a-layout>
</template>

<script>
import { ref } from 'vue';
import { Sidebar, CollapsedIcon, Navbar, TagView, AppMain  } from './components';

export default {

  name: 'Layout',

  components: {
    Sidebar,
    CollapsedIcon,
    Navbar,
    TagView,
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

  .ant-layout-header {
    background: #fff;
    padding: 0;
    height: 84px;
    line-height: normal;
    .navigation {
      height: 50px;
      line-height: 50px;
      display: flex;
    }
  }

  .ant-layout-sider {
    background: #fff;
    overflow-y: auto;
  }

  .ant-layout-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }

}
</style>
