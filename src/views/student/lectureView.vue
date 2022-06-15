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
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios";

export default {
  props: ["conceptId", "setType"],
  data() {
    return {
      lectureId: "",
      material: null,
    };
  },
  mounted() {
    this.fetchMaterial();
  },
  methods: {
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
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
