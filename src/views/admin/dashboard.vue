<template>
  <div class="d-grid grid-gap2 grid-item-card">
    <RouterLink
      to="/admin/dashboard"
      class="text-decoration-none border rounded p-3 bg-light"
    >
      <p class="border-bottom text-maincolor">Total Classrooms</p>
      <div class="text-center display-5 text-dark">10</div>
    </RouterLink>
    <RouterLink
      to="/admin/dashboard"
      class="text-decoration-none border rounded p-3 bg-light"
    >
      <p class="border-bottom text-maincolor">Total Teachers</p>
      <div class="text-center display-5 text-dark">10</div>
    </RouterLink>
    <RouterLink
      to="/admin/dashboard"
      class="text-decoration-none border rounded p-3 bg-light"
    >
      <p class="border-bottom text-maincolor">Total Students</p>
      <div class="text-center display-5 text-dark">10</div>
    </RouterLink>
  </div>
</template>

<script>
import Navigation from "../../components/admin/navigation.vue";

export default {
  name: "Dashboard",
  components: {
    Navigation,
  },
};
</script>
