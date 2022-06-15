<template>
  <div class="d-grid grid-gap2 grid-item-card">
    <div v-for="(lesson, index) in lessons" class="card" :key="lesson._id">
      <RouterLink
        class="card-body"
        :to="{ name: 'student-lesson-view', params: { lessonId: lesson._id } }"
      >
        <h5 class="card-title">{{ lesson.name }}</h5>
      </RouterLink>
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
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>
