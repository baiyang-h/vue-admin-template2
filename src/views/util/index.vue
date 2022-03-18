<template>
  <div>
    <a-row align="middle">
      <span class="h-m-r-10">{{ copyText }}</span>
      <a-button type="primary" @click="copy">复制</a-button>
    </a-row>
  </div>
</template>

<script>
import { copy } from 'libs/util'
export default {
  name: "Util",
  data() {
    return {
      copyText: '我是需要被复制的内容'
    }
  },
  methods: {
    copy() {
      copy(this.copyText).then(() => {
        this.$message.success('复制成功');
      }, () => {
        this.$message.error('复制失败');
      })
    }
  }
}
</script>