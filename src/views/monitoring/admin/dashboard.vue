<template>
  <Navigation />
  <br />
  <div class="container py-5">
    <img class="img-fluid mb-4" src="/logo.png" />
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="input-group" style="width: 300px">
        <input
          type="text"
          class="form-control"
          v-model="search"
          placeholder="What are you looking for ?"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="loadData()"
        >
          <i class="bi bi-search text-maincolor"></i>
        </button>
      </div>
    </div>
    <br />
    <div class="p-2 rounded bg-light">
      <table class="table">
        <thead style="border: none">
          <tr class="">
            <th class="text-maincolor">Code</th>
            <th class="text-maincolor">Name</th>
            <th class="text-maincolor">Teacher</th>
            <th class="text-maincolor">Students</th>
            <th class="text-maincolor" style="max-width: 150px">Status</th>
            <th class="text-maincolor" style="max-width: 150px">-</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in list" v-bind:key="e._id">
            <td>
              <small>{{ e.code }}</small>
            </td>
            <td>
              <small>{{ e.name }}</small>
            </td>
            <td>
              <small>{{ e.teacher }}</small>
            </td>
            <td>
              <small>{{ e.students }}</small>
            </td>
            <td>
              <span
                :class="`badge bg-${
                  e.status.toUpperCase() == 'ACTIVE' ? 'success' : 'danger'
                }`"
                >{{ e.status.toUpperCase() }}</span
              >
            </td>
            <td>
              <router-link
                :to="{ name: 'admin-monitoring-class', params: { id: e._id } }"
              >
                <button class="shadow-sm btn btn-sm bg-main text-light">
                  View
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="btn-group" role="group">
        <button
          type="button"
          v-if="hasPrevPage"
          @click="loadData(page - 1)"
          class="btn btn-outline-secondary"
        >
          Prev
        </button>
        <button type="button" class="btn btn-outline-secondary">
          {{ page }}
        </button>
        <button
          type="button"
          v-if="hasNextPage"
          @click="loadData(page + 1)"
          class="btn btn-outline-secondary"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navigation from "../../../components/admin/navigation.vue";
import auth from "../../../utils/authHeader";

export default {
  name: "admin-monitoring-dashboard",
  components: {
    Navigation,
  },
  data() {
    return {
      list: [],
      hasPrevPage: false,
      hasNextPage: false,
      page: 1,
      search: null,
    };
  },
  mounted() {
    auth("admin");
    this.loadData();
  },
  methods: {
    async loadData(page = 1) {
      try {
        let list = [];
        let params = `?page=${page}&${this.search && "search=" + this.search}`;
        const entry = await axios.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS_LIST +
            params
        );

        const res = entry.data;
        console.log(res);
        if (!res.status) throw res.error;

        res.data.docs.forEach((e) => {
          list.push({
            _id: e._id,
            code: e.code,
            name: e.name,
            teacher: e.teacher.fullname,
            students: e.students.length,
            status: e.status,
          });
        });

        this.list = list;
        this.page = res.data.page;
        this.hasPrevPage = res.data.hasPrevPage;
        this.hasNextPage = res.data.hasNextPage;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>
