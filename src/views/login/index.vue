<template>
  <a-form :model="formInline" @submit="onSubmit">
    <a-form-item>
      <a-input v-model:value="formInline.username" placeholder="Username">
        <template #prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formInline.password" type="password" placeholder="Password">
        <template #prefix><LockOutlined style="color:rgba(0,0,0,.25)"/></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
          type="primary"
          html-type="submit"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import {message} from "ant-design-vue";

export default {
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const store = useStore();
    const router = useRouter()
    const route = useRoute()

    const formInline = reactive({
      username: 'admin',
      password: '123',
    })

    const rules = reactive({
      username: [
        { required: true, message: ' 请输入账户名', trigger: ['blur', 'change'] },
      ],
      password: [
        { required: true, message: ' 请输入密码', trigger: ['blur', 'change'] },
      ],
    })

    async function onSubmit() {
      try {
        await store.dispatch('user/login', formInline);
        const { redirect } = route.query
        console.log(redirect)
        router.push(redirect ? redirect : '/');
      } catch (e) {
        message.error(e)
      }
    }

    return {
      formInline,
      rules,
      onSubmit
    }
  }
}
</script>

<style scoped lang="scss">
.ant-form {
  width: 300px;
  height: 400px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  .ant-col {
    width: 100%;
  }
}
</style>
