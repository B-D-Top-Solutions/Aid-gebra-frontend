<template>
  <Navigation />
  <br />
  <div class="container py-3">
    <Announcement />
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "../teacher/navigation.vue";
import Announcement from "../admin/announcements.vue";

export default {
  name: "Teacher",
  components: {
    Navigation,
    Announcement,
  },
};
</script>

<style>
  body {
    background-color: white !important;
  }
</style>
