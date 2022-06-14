<template>
  <Navigation />
  <br />
  <div class="container py-5">
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "../student/navigation.vue";
export default {
  name: "Student",
  components: {
    Navigation,
  },
};
</script>

<style scoped></style>
