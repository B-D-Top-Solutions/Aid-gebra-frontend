<template>
  <Navigation />
  <br />
  <Announcement />
  <div class="container py-3">
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "../admin/navigation.vue";
import Announcement from "../admin/announcements.vue";

export default {
  name: "Admin",
  components: {
    Navigation,
    Announcement,
  },
};
</script>

<style scoped></style>
