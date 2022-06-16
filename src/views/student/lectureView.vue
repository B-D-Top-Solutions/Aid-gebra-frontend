<template>
  <div class="row">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <h2 class="m-auto">Lecture</h2>
      </div>
      <div class="card-body">
        <div class="card-text">
          <p v-html="material"></p>
        </div>
      </div>
      <div class="card-footer text-center">
        <RouterLink
          v-if="!isLoading"
          class="btn btn-primary m-5"
          :to="{
            name: 'student-assesment-view',
            params: { conceptId: conceptId },
          }"
          >Take Assesment</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios";
import store from "../../store";

export default {
  props: ["conceptId"],
  data() {
    return {
      lectureId: "",
      student: null,
      material: null,
      setType: "A",
    };
  },
  mounted() {
    this.loadSelf();
  },
  methods: {
    async loadSelf() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_SHOW_V2 +
            "/" +
            store.state.user.data._id
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.student = res.data;
        console.log(this.student);

        const lesson = this.student.lessons.find((lesson) =>
          lesson.concepts.find((concept) => concept.conceptId == this.conceptId)
        );

        if (lesson) {
          const concept = lesson.concepts.find(
            (concept) => concept.conceptId == this.conceptId
          );

          this.setType = concept.alternateLecture ? "B" : "A";
        } else {
          this.setType = "A";
        }

        await this.fetchMaterial();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async fetchMaterial() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_LECTURE_ALL_V2 +
            `?concept=${this.conceptId}&setType=${this.setType}`
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.material = res.data[0].material;
        this.lectureId = res.data[0]._id;

        this.isLoading = false;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
