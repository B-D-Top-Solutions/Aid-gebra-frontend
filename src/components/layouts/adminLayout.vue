<template>
  <Navigation />
  <br />
  <div class="container py-5">
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "../admin/navigation.vue";
export default {
  name: "Admin",
  components: {
    Navigation,
  },
};
</script>

<style scoped></style>
