<template>
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

    <button
      class="btn btn-light border shadow-sm"
      @click="clearModal()"
      data-bs-toggle="modal"
      data-bs-target="#class_modal"
    >
      <i class="bi bi-plus"></i>&nbsp;Create Class
    </button>
  </div>
  <br />
  <div class="p-2 rounded bg-light">
    <table class="table">
      <thead style="border: none">
        <tr class="">
          <th class="text-maincolor">Code</th>
          <th class="text-maincolor">Class</th>
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
            <RouterLink
              class="shadow-sm btn btn-sm bg-main text-light"
              :to="{ name: 'teacher-class-view', params: { classId: e._id } }"
            >
              View
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

  <div class="modal fade" id="class_modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <input type="hidden" v-model.trim="model._id" />
          <div class="form-floating mb-3">
            <input
              type="text"
              v-model.trim="model.name"
              class="form-control"
              id="floatingInput"
              placeholder="Section..."
            />
            <label for="floatingInput">Name</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            v-if="!isUpdate"
            @click="createClass()"
            class="btn text-light bg-main"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios";
import store from "../../store";

export default {
  name: "teacher-classes",
  data() {
    return {
      model: {
        _id: "",
        code: null,
        name: "",
      },
      list: [],
      hasPrevPage: false,
      hasNextPage: false,
      page: 1,
      search: null,
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
            import.meta.env.VITE_API_CLASS_PAGINATE_V2 +
            `?teacher=${store.state.user.data._id}`
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        res.data.docs.forEach((e) => {
          list.push({
            _id: e._id,
            code: e.code,
            name: e.name,
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
    clearModal() {
      this.model.name = "";
    },
    async loadClass(id) {
      try {
        this.clearModal();

        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS_SHOW_V2 +
            "/" +
            id
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.model._id = res.data._id;
        this.model.code = res.data.code;
        this.model.name = res.data.name;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async createClass() {
      try {
        if (this.isUpdate) throw "Invalid action";

        let data = {
          name: this.model.name,
          teacher: store.state.user.data._id,
        };

        const entry = await axiosClient.post(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS_CREATE_V2,
          data
        );

        const res = entry.data;

        if (!res.status) throw res.error;

        alert("Class created");
        this.clearModal();
        this.loadData();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>

<style scoped></style>
