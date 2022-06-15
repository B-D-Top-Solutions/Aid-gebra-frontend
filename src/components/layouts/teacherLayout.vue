<template>
  <Navigation />
  <br />
  <div class="container py-5">
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "../teacher/navigation.vue";
export default {
  name: "Teacher",
  components: {
    Navigation,
  },
};
</script>

<style scoped></style>
