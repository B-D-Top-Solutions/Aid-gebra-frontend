<template>
  <div class="d-grid grid-gap2 grid-item-card">
    <RouterLink
      to="/teacher/dashboard"
      class="text-decoration-none border rounded p-3 bg-light"
    >
      <p class="border-bottom text-maincolor">Total Classrooms</p>
      <div class="text-center display-5 text-dark">10</div>
    </RouterLink>
    <RouterLink
      to="/teacher/dashboard"
      class="text-decoration-none border rounded p-3 bg-light"
    >
      <p class="border-bottom text-maincolor">Total Students</p>
      <div class="text-center display-5 text-dark">10</div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: "teacher-dashboard",
  components: {
    Navigation,
  },
};
</script>
