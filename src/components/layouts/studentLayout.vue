<template>
  <Navigation />
  <br />
  <Announcement />
  <div class="container py-3">
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "../student/navigation.vue";
import Announcement from "../admin/announcements.vue";

export default {
  name: "Student",
  components: {
    Navigation,
    Announcement,
  },
};
</script>

<style scoped></style>
