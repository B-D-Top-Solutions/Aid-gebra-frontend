<template>
  <div class="row">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <RouterLink
          v-if="!isLoading"
          class="btn btn-primary float-end"
          :to="{
            name: 'admin-concepts-view',
            params: { conceptId: conceptId },
          }"
        >
          Back
        </RouterLink>
        <h2 class="m-auto">Lecture</h2>
        <button class="btn btn-primary" @click="saveMaterial()">Save</button>
      </div>
      <div class="card-body">
        <div class="card-text">
          <QuillEditor
            v-if="material"
            theme="snow"
            toolbar="full"
            v-model:content="material"
            contentType="html"
            placeholder="Write your lecture here"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    QuillEditor,
  },
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
    async saveMaterial() {
      try {
        const entry = await axiosClient.put(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_LECTURE_UPDATE_V2 +
            "/" +
            this.lectureId,
          {
            material: this.material,
          }
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        alert("Lecture Updated");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
