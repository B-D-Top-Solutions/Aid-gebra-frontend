<template>
  <div class="d-grid grid-gap2 grid-item-card">
    <RouterLink
      :to="{ name: 'admin-users' }"
      class="text-decoration-none border rounded p-3 bg-light"
    >
      <p class="border-bottom text-maincolor">Total Admins</p>
      <div class="text-center display-5 text-dark">{{ totalAdmins }}</div>
    </RouterLink>
    <RouterLink
      :to="{ name: 'admin-teachers' }"
      class="text-decoration-none border rounded p-3 bg-light"
    >
      <p class="border-bottom text-maincolor">Total Teachers</p>
      <div class="text-center display-5 text-dark">{{ totalTeachers }}</div>
    </RouterLink>
    <RouterLink
      :to="{ name: 'admin-students' }"
      class="text-decoration-none border rounded p-3 bg-light"
    >
      <p class="border-bottom text-maincolor">Total Students</p>
      <div class="text-center display-5 text-dark">{{ totalStudents }}</div>
    </RouterLink>
  </div>
</template>

<script>
import axiosClient from "../../axios";

export default {
  name: "admin-dashboard",
  components: {},
  data() {
    return {
      totalAdmins: 0,
      totalTeachers: 0,
      totalStudents: 0,
    };
  },
  mounted() {
    this.countAdmins();
    this.countTeachers();
    this.countStudents();
  },
  methods: {
    async countAdmins() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER + import.meta.env.VITE_API_ADMIN_ALL_V2
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.totalAdmins = res.data.length;
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
    async countTeachers() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER + import.meta.env.VITE_API_TEACHER_ALL_V2
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.totalTeachers = res.data.length;
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
    async countStudents() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER + import.meta.env.VITE_API_STUDENT_ALL_V2
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.totalStudents = res.data.length;
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
  },
};
</script>
