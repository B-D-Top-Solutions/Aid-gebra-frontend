<template>
  <div class="bd-example">
    <div class="mb-3">
      <label for="show-message" class="form-label">SHOW ANNOUNCEMENT</label>
      <select id="show-message" v-model="isShown">
        <option value="SHOW">SHOW</option>
        <option value="HIDE">HIDE</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="text-message" class="form-label">Message</label>
      <textarea
        class="form-control"
        id="text-message"
        rows="3"
        v-model="message"
      ></textarea>
    </div>
    <div class="mb-3">
      <button class="btn btn-primary" @click="updateMessage">Update</button>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios";

export default {
  data() {
    return {
      message: "",
      isShown: null,
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
    async updateMessage() {
      try {
        console.log(this.isShown);
        const response = await axiosClient.put(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_ANNOUNCEMENT_UPDATE,
          {
            message: this.message,
            status: this.isShown,
          }
        );
        const res = response.data;

        if (res.status == false) throw res.error;
        this.message = res.data.message;
        this.isShown = res.data.isShown ? "SHOW" : "HIDE";

        alert("Successfully updated");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
