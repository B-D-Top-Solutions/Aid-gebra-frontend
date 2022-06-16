<template>
  <div class="row">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          Teacher: {{ classInfo?.teacher?.fullname || "" }}
        </h5>
        <div class="d-flex justify-content-between">
          <div class="">
            <div v-if="hasClass">
              Class:
              {{ classInfo.name }}
              <br />
              <small v-if="isPending">Pending</small>
              <small v-if="!isPending">Joined</small>
            </div>
            <div v-if="!hasClass">No Class</div>
          </div>
          <div class="">
            <button
              v-if="!hasClass"
              class="btn btn-primary border shadow-sm"
              data-bs-toggle="modal"
              data-bs-target="#class_modal"
            >
              <i class="bi bi-plus"></i>&nbsp;Join Class
            </button>
            <button
              v-if="hasClass"
              class="btn btn-danger border shadow-sm"
              @click="leaveClass()"
            >
              <i class="bi bi-plus"></i>&nbsp;Leave Class
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="hasClass" class="row">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Students</h5>
        <table class="table">
          <thead style="border: none">
            <tr class="">
              <th class="text-maincolor">Fullname</th>
              <th class="text-maincolor" style="max-width: 150px">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in studentsList" v-bind:key="e._id">
              <td>
                <small>{{ e.fullname }}</small>
              </td>
              <td>
                <span
                  :class="`badge bg-${
                    e.classStatus.toUpperCase() == 'JOINED'
                      ? 'success'
                      : 'danger'
                  }`"
                  >{{ e.classStatus.toUpperCase() }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
              v-model.trim="model.code"
              class="form-control"
              id="floatingInput"
              placeholder="Class Code"
            />
            <label for="floatingInput">Class Code</label>
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
            @click="joinClass()"
            class="btn text-light bg-main"
          >
            Join
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
  name: "student-myclass",
  data() {
    return {
      hasClass: false,
      isPending: false,
      studentId: store.state.user.data._id,
      student: {},
      classInfo: {},
      studentsList: [],
      model: {
        code: null,
      },
    };
  },
  methods: {
    async loadUser() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_SHOW_V2 +
            `/${this.studentId}`
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.student = res.data;
        if (this.student.classId != null) {
          this.hasClass = true;
          this.isPending = this.student.classStatus == "PENDING" ? true : false;
          this.classInfo = this.student.classId;
          this.loadClassInfo();
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async loadClassInfo() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS_SHOW_V2 +
            `/${this.classInfo._id}`
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.classInfo = res.data;
        console.log(this.classInfo);
        await this.loadStudents();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async loadStudents() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_ALL_V2 +
            `?class=${this.classInfo._id}`
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.studentsList = res.data;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async joinClass() {
      try {
        const entry = await axiosClient.post(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_JOIN_CLASS_V2,
          {
            classcode: this.model.code,
          }
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.classInfo = res.data.classId;

        await this.loadClassInfo();
        this.hasClass = true;
        this.isPending = true;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async leaveClass() {
      try {
        if (
          confirm(
            "Are you sure you want to leave this class? Operation can not be undone!"
          )
        ) {
          const entry = await axiosClient.delete(
            import.meta.env.VITE_SERVER +
              import.meta.env.VITE_API_STUDENT_LEAVE_CLASS_V2,
            {
              classcode: this.classInfo.code,
            }
          );

          const res = entry.data;
          if (!res.status) throw res.error;

          this.hasClass = false;
          this.isPending = false;
          this.classInfo = {};
          this.studentsList = [];
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>

<style lang="scss" scoped></style>
