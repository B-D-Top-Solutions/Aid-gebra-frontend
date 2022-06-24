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
      data-bs-target="#user_modal"
    >
      <i class="bi bi-plus"></i>&nbsp;Create Teacher
    </button>
  </div>
  <br />
  <div class="table-responsive p-2 rounded bg-light">
    <table class="table">
      <thead style="border: none">
        <tr class="">
          <th class="text-maincolor">Email</th>
          <th class="text-maincolor">Username</th>
          <th class="text-maincolor">First Name</th>
          <th class="text-maincolor">Middle Name</th>
          <th class="text-maincolor">Last Name</th>
          <th class="text-maincolor">Contact</th>
          <th class="text-maincolor" style="max-width: 150px">Status</th>
          <th class="text-maincolor" style="max-width: 150px">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in list" v-bind:key="e._id">
          <td>
            <small>{{ e.email }}</small>
          </td>
          <td>
            <small>{{ e.fullname }}</small>
          </td>
          <td>
            <small>{{ e.firstname }}</small>
          </td>
          <td>
            <small>{{ e.middlename }}</small>
          </td>
          <td>
            <small>{{ e.lastname }}</small>
          </td>
          <td>
            <small>{{ "09" + e.contact }}</small>
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
            <button
              class="shadow-sm btn btn-sm bg-main text-light"
              @click="loadUser(e._id)"
              data-bs-toggle="modal"
              data-bs-target="#user_modal"
            >
              Modify
            </button>
            <button
              class="shadow-sm btn btn-sm bg-danger text-light"
              @click="deleteUser(e._id)"
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

  <form
    class="modal fade"
    id="user_modal"
    tabindex="-1"
    aria-hidden="true"
    @submit="submitForm"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <input type="hidden" v-model.trim="model.id" />
          <div class="form-floating mb-3">
            <input
              type="email"
              v-model.trim="model.email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              v-model.trim="model.fullname"
              class="form-control"
              id="floatingInput1"
              placeholder="Username"
            />
            <label for="floatingInput1">Username</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              v-model.trim="model.firstname"
              class="form-control"
              placeholder="First Name"
              id="floating-firstname"
            />
            <label for="floating-firstname">First Name</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              v-model.trim="model.middlename"
              class="form-control"
              placeholder="Middle Name"
              id="floating-middlename"
            />
            <label for="floating-middlename">Middle Name(Optional)</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              v-model.trim="model.lastname"
              class="form-control"
              placeholder="Last Name"
              id="floating-lastname"
            />
            <label for="floating-lastname">Last Name</label>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">09</span>
            <input
              type="text"
              v-model.trim="model.contact"
              class="form-control"
              placeholder="Contact Number"
            />
          </div>
          <div class="form-floating mb-3">
            <select
              v-model.trim="model.status"
              class="form-select"
              id="floatingSelect"
            >
              <option value="ACTIVE">Active</option>
              <option value="DEACTIVATED">Deactivate</option>
            </select>
            <label for="floatingSelect">Status</label>
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
          <button type="submit" v-if="isUpdate" class="btn text-light bg-main">
            Save changes
          </button>
          <button type="submit" v-if="!isUpdate" class="btn text-light bg-main">
            Create
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axiosClient from "../../axios";

export default {
  name: "admin-users",
  components: {
    Navigation,
  },
  data() {
    return {
      model: {
        email: null,
        fullname: null,
        firstname: "",
        middlename: "",
        lastname: "",
        status: "ACTIVE",
        contact: null,
        id: null,
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
    submitForm(e) {
      e.preventDefault();
      if (this.isUpdate) {
        this.updateUser();
      }

      if (!this.isUpdate) {
        this.createUser();
      }
    },
    async loadData(page = 1) {
      try {
        let list = [];
        let params = `?page=${page}&${this.search && "search=" + this.search}`;
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_TEACHER_PAGINATE_V2 +
            params
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        res.data.docs.forEach((e) => {
          list.push({
            _id: e._id,
            email: e.email,
            fullname: e.fullname,
            firstname: e.firstname || "",
            middlename: e.middlename || "",
            lastname: e.lastname || "",
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
    clearModal() {
      this.model.email = "";
      this.model.fullname = "";
      this.model.firstname = "";
      this.model.middlename = "";
      this.model.lastname = "";
      this.model.contact = "";
      this.model.id = "";
      this.model.status = "ACTIVE";
      this.isUpdate = false;
    },
    async loadUser(id) {
      try {
        this.clearModal();
        this.isUpdate = true;
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_TEACHER_SHOW_V2 +
            "/" +
            id
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.model.email = res.data.email;
        this.model.fullname = res.data.fullname;
        this.model.firstname = res.data.firstname || "";
        this.model.middlename = res.data.middlename || "";
        this.model.lastname = res.data.lastname || "";
        this.model.contact = res.data.contact;
        this.model.id = res.data._id;
        this.model.status = res.data.status;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async createUser() {
      try {
        if (this.isUpdate) throw "Invalid action";

        const entry = await axiosClient.post(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_TEACHER_CREATE_V2,
          {
            email: this.model.email,
            fullname: this.model.fullname,
            firstname: this.model.firstname,
            middlename: this.model.middlename,
            lastname: this.model.lastname,
            contact: this.model.contact,
            status: this.model.status,
            password: "password",
            confirm_password: "password",
          }
        );

        const res = entry.data;

        if (!res.status) throw res.error;

        alert("User created");
        this.clearModal();
        this.loadData();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async updateUser() {
      try {
        if (!this.isUpdate) throw "Invalid action";

        const entry = await axiosClient.put(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_TEACHER_UPDATE_V2 +
            "/" +
            this.model.id,
          {
            email: this.model.email,
            fullname: this.model.fullname,
            firstname: this.model.firstname,
            middlename: this.model.middlename,
            lastname: this.model.lastname,
            contact: this.model.contact,
            status: this.model.status,
            id: this.model.id,
          }
        );

        const res = entry.data;

        if (!res.status) throw res.error;

        alert(this.model.fullname + " updated");
        this.loadData();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async deleteUser(id) {
      try {
        if (
          confirm(
            "Are you sure you want to delete this user? Operation can not be undone!"
          )
        ) {
          const entry = await axiosClient.delete(
            import.meta.env.VITE_SERVER +
              import.meta.env.VITE_API_TEACHER_DELETE_V2 +
              "/" +
              id
          );

          const res = entry.data;
          console.log(entry);
          if (!res.status) throw res.error;

          alert("User deleted");
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
