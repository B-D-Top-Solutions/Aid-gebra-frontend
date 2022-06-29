<template>
  <!-- <RouterLink :to="{ name: 'index' }">
    <img
      class="mb-4 d-block w-100 mx-auto"
      src="/src/assets/images/logo.png"
      style="max-width: 450px"
    />
  </RouterLink> -->
  <div class="w-100 bg-light p-3 mb-4">
    <div class="d-flex justify-content-between align-items-center">
      <span>
        <RouterLink to="/login" class="text-decoration-none fw-bolder text-dark me-3">Login</RouterLink>
        <RouterLink to="/register" class="text-decoration-none fw-bolder text-dark">Sign up</RouterLink>
      </span>
      <span>
        <img
          class="d-block w-100 mx-auto"
          src="/src/assets/images/logo.png"
          style="max-width: 200px"
        />
      </span>
      <span>
        <RouterLink to="/lessons" class="text-decoration-none fw-bolder text-dark me-3">Lessons</RouterLink>
        <RouterLink to="/about" class="text-decoration-none fw-bolder text-dark">About Us</RouterLink>
      </span>
    </div>
  </div>
  <div class="container">
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
