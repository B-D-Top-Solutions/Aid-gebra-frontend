<template>
  <div class="container">
    <div class="row m-auto p-4">
      <h4>Most Incorrecty Answered Questions</h4>
      <bar />
    </div>
    <div class="row m-auto">
      <div class="col-12">
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
      </div>
      <br />
      <div class="p-2 rounded bg-light">
        <table class="table">
          <thead style="border: none">
            <tr class="">
              <th class="text-maincolor">Fullname</th>
              <th class="text-maincolor">Email</th>
              <th class="text-maincolor">Contact</th>
              <th class="text-maincolor" style="max-width: 150px">Status</th>
              <th class="text-maincolor" style="max-width: 150px">-</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in list" v-bind:key="e._id">
              <td>
                <small>{{ e.fullname }}</small>
              </td>
              <td>
                <small>{{ e.email }}</small>
              </td>
              <td>
                <small>{{ e.contact }}</small>
              </td>
              <td>
                <span
                  :class="`badge bg-${
                    e.status.toUpperCase() == 'ACTIVE' ? 'success' : 'danger'
                  }`"
                  >{{ e.status.toUpperCase() }}</span
                >
              </td>
              <td class="d-flex justify-content-around">
                <RouterLink
                  class="shadow-sm btn btn-sm bg-primary text-light"
                  :to="{
                    name: 'monitor-progress',
                    params: { studentId: e._id },
                  }"
                >
                  View Progress
                </RouterLink>
                <RouterLink
                  class="shadow-sm btn btn-sm bg-success text-light"
                  :to="{
                    name: 'monitor-tests',
                    params: { studentId: e._id, type: 'pretest' },
                  }"
                >
                  Pre-tests
                </RouterLink>
                <RouterLink
                  class="shadow-sm btn btn-sm bg-main text-light"
                  :to="{
                    name: 'monitor-tests',
                    params: { studentId: e._id, type: 'posttest' },
                    type: 'posttest',
                  }"
                >
                  Post tests
                </RouterLink>
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
  </div>
</template>

<script>
import axiosClient from "../../../axios";
import bar from "./bar.vue";
export default {
  name: "monitor-students",
  components: {
    bar,
  },
  data() {
    return {
      list: [],
      hasPrevPage: false,
      hasNextPage: false,
      page: 1,
      search: null,
      isUpdate: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData(page = 1) {
      try {
        let list = [];
        let params = `?page=${page}&${this.search && "search=" + this.search}`;
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_PAGINATE_V2 +
            params
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        res.data.docs.forEach((e) => {
          list.push({
            _id: e._id,
            email: e.email,
            fullname: e.fullname,
            contact: e.contact,
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

<style scoped></style>
