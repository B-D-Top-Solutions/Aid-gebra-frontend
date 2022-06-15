<template>
  <div class="container py-5">
    <br />
    <br class="p-2 rounded bg-light" />
    <!-- Row start -->
    <p v-if="isLoading">Loading...</p>
    <div v-if="!isLoading" class="row">
      <!-- Col 1 -->
      <div class="accordion accordion-flush" id="accordionFlush-results">
        <div
          v-for="info in student.lessons"
          class="accordion-item"
          :key="info.lessonId._id"
        >
          <h2 class="accordion-header" :id="'flush-' + info.lessonId._id">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#flush-collapse' + info.lessonId._id"
            >
              {{ info.lessonId.name }}
            </button>
          </h2>
          <div
            :id="'flush-collapse' + info.lessonId._id"
            class="accordion-collapse collapse"
          >
            <div class="accordion-body">
              <div class="row">
                Concept Progress:
                {{ countCompletedConcepts(info) * 20 }} %
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Col 1 end -->
    </div>
    <!-- Row end -->
  </div>
</template>

<script>
import axiosClient from "../../../axios";

export default {
  props: ["studentId"],
  data() {
    return {
      isLoading: true,
      student: null,
      posttestAttemps: null,
      pretestResult: null,
      completedConcepts: null,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_SHOW_V2 +
            "/" +
            this.studentId
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.student = res.data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    countCompletedConcepts(lesson) {
      let count = 0;
      lesson.concepts.forEach((concept) => {
        if (concept.isCompleted) count++;
      });
      return count;
    },
  },
};
</script>

<style scoped></style>
