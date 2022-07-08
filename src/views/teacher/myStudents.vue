<template>
  <div v-if="isLoading" class="card-body">
    <div class="text-center">
      <h5 class="card-title">Loading...</h5>
    </div>
  </div>
  <div v-if="!isLoading" class="container">
    <div class="row m-auto p-4">
      <h4>Most Incorrectly Answered Questions</h4>
      <QuestionBar />
    </div>
    <div class="row m-auto p-4">
      <h4>Most Incorrectly Answered Concepts</h4>
      <ConceptBar />
    </div>
    <div class="row m-auto mt-5">
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
      <p class="text-center" v-if="hasNoClass && !isLoading">
        You Have No Class
      </p>
      <div class="p-2 rounded bg-light" v-if="!isLoading && !hasNoClass">
        <table class="table">
          <thead style="border: none">
            <tr class="">
              <th class="text-maincolor">Username</th>
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
                <small>{{ `09${e.contact}` }}</small>
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
import axiosClient from "../../axios";
import store from "../../store";
import QuestionBar from "../monitoring/monitor/questionBar.vue";
import ConceptBar from "../monitoring/monitor/conceptBar.vue";

export default {
  name: "monitor-teacher-students",
  components: {
    QuestionBar,
    ConceptBar,
  },
  data() {
    return {
      isLoading: true,
      hasNoClass: true,
      isLoading: true,
      classList: [],
      list: [],
      hasPrevPage: false,
      hasNextPage: false,
      page: 1,
      search: null,
      isUpdate: false,
    };
  },
  mounted() {
    this.getTeacherClasses();
  },
  methods: {
    async getTeacherClasses() {
      const entry = await axiosClient.get(
        import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_CLASS_ALL_V2 +
          `?teacher=${store.state.user.data._id}`
      );

      const res = entry.data;
      if (res.status == false) throw res.error;

      // if teacher has no classes then end
      if (res.data.length <= 0) {
        this.hasNoClass = true;
        this.isLoading = false;
        return;
      }

      this.classList = res.data;
      this.hasNoClass = false;

      // otherwise find his students
      console.log("------------ LOAD DATA-----");
      await this.loadData();
    },
    async loadData(page = 1) {
      try {
        console.log("------------ LOADING DATA-----");

        // get the class ids in the class lists and put it in an array
        console.log(this.classList);
        const classIds = this.classList.map((e) => e._id);
        // turn array to comma separated string
        const classIdsStr = classIds.join(",");
        console.log(classIdsStr);

        let list = [];
        let params = `?page=${page}&class=${classIdsStr}&${
          this.search && "search=" + this.search
        }`;
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
        this.isLoading = false;

        this.isLoading = false;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>

<style scoped></style>
