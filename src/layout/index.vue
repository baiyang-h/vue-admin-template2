<template>
  <a-layout id="components-layout-demo-custom-trigger">

    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <sidebar :collapsed="collapsed" />
    </a-layout-sider>

    <a-layout>

      <a-layout-header>
        <div class="navigation">
          <div class="flex">
            <collapsed-icon :collapsed="collapsed" @update:collapsed="collapsed=$event" />
            <navbar />
          </div>
          <div></div>
          <div><a-button type="link" @click="leave">离开</a-button></div>
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
import {useStore} from 'vuex';
import { ref } from 'vue';
import { Sidebar, CollapsedIcon, Navbar, TagView, AppMain  } from './components';
import { Modal } from 'ant-design-vue'
import {useRouter} from "vue-router";

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
    const store = useStore();
    let collapsed = ref(false);
    const router = useRouter()

    function leave() {
      Modal.confirm({
        title: '标题',
        content: '你确定要离开吗？',
        onOk() {
          return new Promise((resolve) => {
            store.dispatch('app/leave')
            router.push({
              name: 'Login'
            })
            resolve()
          }).catch((e) => console.log(e));
        },
        onCancel() {},
      });
    }

    return {
      collapsed,
      leave
    }
  },
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
      justify-content: space-between;
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
    overflow-y: auto;
    box-sizing: border-box;
  }

}
</style>
