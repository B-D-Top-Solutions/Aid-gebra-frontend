<template>
  <div class="container py-5">
    <RouterLink :to="{ name: 'index' }">
      <img
        class="mb-4 d-block w-100 mx-auto"
        src="/src/assets/images/logo.png"
        style="max-width: 450px"
      />
    </RouterLink>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Auth",
  components: {},
};
</script>

<style lang="scss" scoped></style>
