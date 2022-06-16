<template>
  <div class="container py-5">
    <BarShit />
    <br />
    <BarConcept />
  </div>
</template>

<script>
import axios from "axios";
import auth from "../../../utils/authHeader";

import BarShit from "../../../components/bar.shit.vue";
import BarConcept from "../../../components/barConcept.shit.vue";

export default {
  name: "admin-monitoring-test",
  components: {
    BarShit,
    BarConcept,
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
