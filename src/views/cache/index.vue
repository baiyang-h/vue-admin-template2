<template>
  <div>
    <h3>改模块因为 keep-alive  cache:true 会被缓存</h3>
    <a-input v-model:value="value" placeholder="请输入值" />
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: "Cache",

  setup() {
    let value = ref('');

    return {
      value
    }
  }
}
</script>
