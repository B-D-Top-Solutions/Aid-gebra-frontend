<template>
  <div v-if="isLoading" class="card-body">
    <div class="text-center">
      <h5 class="card-title">Loading...</h5>
    </div>
  </div>
  <div v-if="!isLoading" class="d-grid grid-gap2 grid-item-card">
    <div v-for="(lesson, index) in lessons" class="card shadow" :key="lesson._id">
      <div class="d-flex flex-column justify-content-between" style="height: 100%;">
        <h5 class="m-auto text-center p-3">{{ lesson.name }}</h5>

        <RouterLink
          class="d-flex justify-content-center text-decoration-none"
          :to="{
            name: 'student-lesson-view',
            params: { lessonId: lesson._id },
          }"
        >
        <p class="btn mt-5 bg-main text-light">Start</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios";

export default {
  name: "student-dashboard",
  components: {},
  data() {
    return {
      isLoading: true,
      lessons: null,
    };
  },
  mounted() {
    this.getLessons();
  },
  methods: {
    async getLessons() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER + import.meta.env.VITE_API_LESSON_ALL_V2
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.lessons = res.data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>
