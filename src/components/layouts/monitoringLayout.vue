<template>
  <AdminNavigation v-if="isAdmin" />
  <TeacherNavigation v-if="isTeacher" />
  <StudentNavigation v-if="isStudent" />
  <br />
  <Announcement />
  <div class="container py-3">
    <router-view></router-view>
  </div>
</template>

<script>
import store from "../../store";
import AdminNavigation from "../admin/navigation.vue";
import TeacherNavigation from "../teacher/navigation.vue";
import StudentNavigation from "../student/navigation.vue";
import Announcement from "../admin/announcements.vue";

export default {
  name: "Monitoring",
  components: {
    AdminNavigation,
    TeacherNavigation,
    StudentNavigation,
    Announcement,
  },
  data() {
    return {
      isAdmin: store.state.user.role == "ADMIN",
      isTeacher: store.state.user.role == "TEACHER",
      isStudent: store.state.user.role == "STUDENT",
    };
  },
};
</script>

<style scoped></style>
