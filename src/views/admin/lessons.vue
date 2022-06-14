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
      <i class="bi bi-plus"></i>&nbsp;Create Lesson
    </button>
  </div>
  <br />
  <div class="p-2 rounded bg-light">
    <table class="table">
      <thead style="border: none">
        <tr class="">
          <th class="text-maincolor">Name</th>
          <th class="text-maincolor" style="max-width: 150px">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in list" v-bind:key="e._id">
          <td>
            <small>{{ e.name }}</small>
          </td>
          <td>
            <button
              class="shadow-sm btn btn-sm bg-main text-light mx-1"
              @click="loadLesson(e._id)"
              data-bs-toggle="modal"
              data-bs-target="#class_modal"
            >
              Modify
            </button>
            <RouterLink
              class="shadow-sm btn btn-sm bg-main text-light mx-1"
              :to="{ name: 'admin-lessons-view', params: { lessonId: e._id } }"
            >
              View
            </RouterLink>
            <button
              class="shadow-sm btn btn-sm bg-danger text-light mx-1"
              @click="deleteLesson(e._id)"
            >
              Delete
            </button>
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
          <input type="hidden" v-model.trim="model.id" />
          <div class="form-floating mb-3">
            <input
              type="text"
              v-model.trim="model.name"
              class="form-control"
              id="floatingInput"
              placeholder="Lesson name"
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
            v-if="isUpdate"
            @click="updateLesson()"
            class="btn text-light bg-main"
          >
            Save changes
          </button>
          <button
            type="button"
            v-if="!isUpdate"
            @click="createLesson()"
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

export default {
  name: "admin-classes",
  data() {
    return {
      model: {
        id: "",
        name: "",
      },
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
            import.meta.env.VITE_API_LESSON_PAGINATE_V2 +
            params
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        res.data.docs.forEach((e) => {
          list.push({
            _id: e._id,
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
      this.isUpdate = false;
    },
    async loadLesson(id) {
      try {
        this.clearModal();
        this.isUpdate = true;
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_LESSON_SHOW_V2 +
            "/" +
            id
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.model.id = res.data._id;
        this.model.name = res.data.name;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async createLesson() {
      try {
        if (this.isUpdate) throw "Invalid action";

        let data = {
          name: this.model.name,
        };

        const entry = await axiosClient.post(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_LESSON_CREATE_V2,
          data
        );

        const res = entry.data;

        if (res.status == false) throw res.error;

        alert("Lesson created");
        this.clearModal();
        this.loadData();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async updateLesson() {
      try {
        if (!this.isUpdate) throw "Invalid action";

        let data = {
          name: this.model.name,
        };

        const entry = await axiosClient.put(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_LESSON_UPDATE_V2 +
            "/" +
            this.model.id,
          data
        );

        const res = entry.data;

        if (!res.status) throw res.error;

        alert("Lesson updated");
        this.loadData();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async deleteLesson(id) {
      try {
        if (
          confirm(
            "Are you sure you want to delete this lesson? Operation can not be undone!"
          )
        ) {
          const entry = await axiosClient.delete(
            import.meta.env.VITE_SERVER +
              import.meta.env.VITE_API_LESSON_DELETE_V2 +
              "/" +
              id
          );

          const res = entry.data;
          console.log(entry);
          if (!res.status) throw res.error;

          alert("Lesson deleted");
          this.loadData();
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>

<style scoped></style>
