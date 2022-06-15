<template>
  <div
    v-if="!isHidden"
    class="alert alert-info"
    role="alert"
    style="z-index: -1"
  >
    <p>Announcement: {{ message }}</p>
  </div>
</template>

<script>
import axiosClient from "../../axios";

export default {
  data() {
    return {
      message: "Hello Vue!",
      isHidden: true,
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    async getMessage() {
      try {
        const response = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_ANNOUNCEMENT_SHOW
        );
        const res = response.data;

        if (res.status == false) throw res.error;
        this.message = res.data.message;
        this.isHidden = !res.data.isShown;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
