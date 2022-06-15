<template>
  <div class="row p-4">
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Pre-test</h5>
          <p class="card-text">
            Take the pretest to determine your knowledge mastery
          </p>
          <RouterLink
            v-if="isInClass"
            class="text-danger"
            :to="{
              name: 'student-pretest-view',
              params: { lessonId: lesson._id },
            }"
            >Take Test</RouterLink
          >
          <span v-if="!isInClass" class="text-danger"
            >you are not in a class, you may not take the test</span
          >
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Post test</h5>
          <p class="card-text">Test what you learned and complete the class</p>
          <RouterLink
            v-if="isInClass"
            class="text-danger"
            :to="{ name: 'index' }"
            >Take Test</RouterLink
          >
          <span v-if="!isInClass" class="text-danger"
            >you are not in a class, you may not take the test</span
          >
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="card">
      <div class="card-header p-4">
        <h2 v-if="lesson" class="m-auto">{{ lesson.name }}</h2>
      </div>
      <div v-if="concepts.length > 0" class="card-body">
        <h5 class="card-title">Concepts</h5>

        <div
          class="card my-3"
          v-for="(concept, index) in concepts"
          v-bind:key="concept._id"
        >
          <div class="card-header d-flex justify-content-between">
            <div class="">
              <h4>{{ concept.name }}</h4>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">
              Assesment:
              <RouterLink
                v-if="isInClass"
                class="text-danger"
                :to="{ name: 'index' }"
                >Take Assesment</RouterLink
              >
              <span v-if="!isInClass" class="text-danger"
                >You may only view if you dont have a class</span
              >
            </p>
            <p class="card-text">
              Lecture:
              <RouterLink
                class="text-danger"
                :to="{
                  name: 'student-lecture-view',
                  params: { conceptId: concept._id, setType: 'A' },
                }"
                >View Lecture</RouterLink
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios";
import store from "../../store";

export default {
  name: "student-class-view",
  props: ["lessonId"],
  data() {
    return {
      isInClass: false,
      lesson: null,
      concepts: [],
    };
  },
  mounted() {
    this.getClass();
    this.getLesson();
    this.getConcepts();
  },
  methods: {
    async getClass() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER + import.meta.env.VITE_API_MEV2
        );

        const res = entry.data;
        if (res.status == false) throw res.error;

        const entry2 = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_SHOW_V2 +
            `/${res.data.id}`
        );

        const res2 = entry2.data;

        if (res2.data.classId != null) {
          this.isInClass = true;
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async getConcepts() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CONCEPT_ALL_V2 +
            `?lessonId=${this.lessonId}`
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        console.log(res.data);

        this.concepts = res.data;
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
    async getLesson() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_LESSON_SHOW_V2 +
            "/" +
            this.lessonId
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.lesson = res.data;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>

<style scoped></style>
