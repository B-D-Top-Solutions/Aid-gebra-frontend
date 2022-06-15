<template>
  <div class="container py-3">
    <h2 v-if="isPretest">Student's Pretest Results</h2>
    <h2 v-if="isPosttest">Student's Post Test Results</h2>
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
            <th class="text-maincolor">Lesson</th>
            <th class="text-maincolor">Date</th>
            <th class="text-maincolor" style="max-width: 150px">-</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in list" v-bind:key="e._id">
            <td>
              <small>{{ e.name }}</small>
            </td>
            <td>
              <small>{{ e.date }}</small>
            </td>
            <td>
              <RouterLink
                v-if="isPretest"
                class="shadow-sm btn btn-sm bg-main text-light"
                :to="{
                  name: 'monitor-pretest',
                  params: { pretestId: e._id },
                }"
              >
                View Result
              </RouterLink>
              <RouterLink
                v-if="isPosttest"
                class="shadow-sm btn btn-sm bg-main text-light"
                :to="{
                  name: 'monitor-posttest',
                  params: { posttestId: e._id },
                }"
              >
                View Result
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
</template>

<script>
import axiosClient from "../../../axios";

export default {
  name: "monitor-tests",
  props: ["studentId", "type"],
  data() {
    return {
      list: [],
      hasPrevPage: false,
      hasNextPage: false,
      page: 1,
      search: null,
      isUpdate: false,
      isPretest: false,
      isPosttest: false,
      apiLink: null,
    };
  },
  mounted() {
    this.loadData();
    this.loadStudent();
  },
  methods: {
    async loadStudent() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_SHOW_V2 +
            "/" +
            this.studentId
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async loadData(page = 1) {
      try {
        switch (this.type) {
          case "pretest":
            this.isPretest = true;
            this.apiLink =
              import.meta.env.VITE_SERVER +
              import.meta.env.VITE_API_PRETEST_RESULTS_PAGINATE_V2 +
              "?student=" +
              this.studentId;
            break;
          case "posttest":
            this.isPosttest = true;
            this.apiLink =
              import.meta.env.VITE_SERVER +
              import.meta.env.VITE_API_POSTTEST_RESULTS_PAGINATE_V2 +
              "?student=" +
              this.studentId;
            break;
          default:
            throw new Error("Invalid type");
            break;
        }

        let list = [];
        const entry = await axiosClient.get(this.apiLink);

        const res = entry.data;
        if (!res.status) throw res.error;
        console.log(res);
        if (res.data.docs.length <= 0) throw "Student Has No Tests Yet";

        res.data.docs.forEach((e) => {
          const parsedDate = new Date(e.createdAt).toLocaleString();
          list.push({
            _id: e._id,
            name: e.lessonId.name,
            date: parsedDate,
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
