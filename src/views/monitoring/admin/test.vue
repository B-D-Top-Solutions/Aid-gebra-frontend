<template>
  <div class="container py-5">
    <!-- <BarShit/> -->
  </div>
</template>

<script>
import axios from "axios";
import auth from "../../../utils/authHeader";
// import BarShit from '../../../components/bar.shit.vue'

export default {
  name: "admin-monitoring-test",
  components: {
    // BarShit
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    auth("admin");
  },
  methods: {},
};
</script>
