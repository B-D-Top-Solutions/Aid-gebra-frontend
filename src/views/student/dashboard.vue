<template>
  <div v-if="isLoading" class="card-body">
    <div class="text-center">
      <h5 class="card-title">Loading...</h5>
    </div>
  </div>
  <div v-if="!isLoading" class="d-grid grid-gap2 grid-item-card">
    <div v-for="(lesson, index) in lessons" class="card" :key="lesson._id">
      <div class="card-body">
        <div class="card-text">
          <RouterLink
            class="card-body"
            :to="{
              name: 'student-lesson-view',
              params: { lessonId: lesson._id },
            }"
          >
            <p class="card-title">View</p>
          </RouterLink>
          <h5 class="m-auto">{{ lesson.name }}</h5>
        </div>
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
