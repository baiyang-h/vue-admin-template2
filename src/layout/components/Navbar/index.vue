<template>
  <div class="navbar">
    <breadcrumb />
  </div>
</template>

<script>
import Breadcrumb  from './Breadcrumb'
export default {
  name: "Navbar",

  components: {
    Breadcrumb
  }
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
}
</style>