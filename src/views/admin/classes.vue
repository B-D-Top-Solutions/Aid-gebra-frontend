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
          <th class="text-maincolor">Teacher</th>
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
            <button
              class="shadow-sm btn btn-sm bg-main text-light"
              @click="loadClass(e._id)"
              data-bs-toggle="modal"
              data-bs-target="#class_modal"
            >
              Modify
            </button>
            <button
              class="shadow-sm btn btn-sm bg-danger text-light"
              @click="deleteClass(e._id)"
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
              placeholder="Section..."
            />
            <label for="floatingInput">Name</label>
          </div>

          <div class="form-floating mb-3">
            <select
              v-model.trim="model.teacher"
              class="form-select"
              id="floatingSelect"
            >
              <option v-for="teacher in teacherList" :value="teacher.id">
                {{ teacher.name }}
              </option>
            </select>
            <label for="floatingSelect">Teacher</label>
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
            @click="updateClass()"
            class="btn text-light bg-main"
          >
            Save changes
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

export default {
  name: "admin-classes",
  data() {
    return {
      teacherList: [],
      model: {
        id: "",
        code: null,
        name: "",
        teacher: null,
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
    this.loadTeacherList();
  },
  methods: {
    async loadTeacherList() {
      try {
        const req = await axiosClient.get(
          import.meta.env.VITE_SERVER + import.meta.env.VITE_API_TEACHER_ALL_V2
        );

        const res = req.data;
        if (res.status == false) throw res.error;

        this.teacherList.push({
          id: 0,
          name: "None",
        });

        const list = res.data.map((e) => {
          return {
            id: e._id,
            name: e.fullname,
          };
        });

        this.teacherList = [...this.teacherList, ...list];

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },

    async loadData(page = 1) {
      try {
        let list = [];
        let params = `?page=${page}&${this.search && "search=" + this.search}`;
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS_PAGINATE_V2 +
            params
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        res.data.docs.forEach((e) => {
          list.push({
            _id: e._id,
            code: e.code,
            name: e.name,
            teacher: e.teacher?.fullname || "",
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
      this.model.code = "";
      this.model.name = "";
      this.model.teacher = "";
      this.isUpdate = false;
    },
    async loadClass(id) {
      try {
        console.log("id is --------------------" + id);
        this.clearModal();
        this.isUpdate = true;
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS_SHOW_V2 +
            "/" +
            id
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.model.id = res.data._id;
        this.model.code = res.data.code;
        this.model.name = res.data.name;
        this.model.teacher = res.data.teacher;
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
        };

        if (this.model.teacher != "0") {
          data.teacher = this.model.teacher;
        }

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
    async updateClass() {
      try {
        if (!this.isUpdate) throw "Invalid action";

        let data = {
          name: this.model.name,
        };

        if (this.model.teacher != "0") {
          data.teacher = this.model.teacher;
        }

        const entry = await axiosClient.put(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS_UPDATE_V2 +
            "/" +
            this.model.id,
          data
        );

        const res = entry.data;

        if (!res.status) throw res.error;

        alert("Class updated");
        this.loadData();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async deleteClass(id) {
      try {
        if (
          confirm(
            "Are you sure you want to delete this class? Operation can not be undone!"
          )
        ) {
          const entry = await axiosClient.delete(
            import.meta.env.VITE_SERVER +
              import.meta.env.VITE_API_CLASS_DELETE_V2 +
              "/" +
              id
          );

          const res = entry.data;
          console.log(entry);
          if (!res.status) throw res.error;

          alert("Class deleted");
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
