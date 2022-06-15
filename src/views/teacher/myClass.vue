<template>
  <div class="row">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          Teacher: {{ classInfo?.teacher?.fullname || "" }}
        </h5>
        <div class="d-flex justify-content-between">
          <div class="">
            Class:
            {{ classInfo.name }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="studentsList.length == 0" class="">No Students</div>
  <div v-if="studentsList.length > 0" class="row">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Students</h5>
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
            <tr v-for="e in studentsList" v-bind:key="e._id">
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
                    e.classStatus.toUpperCase() == 'JOINED'
                      ? 'success'
                      : 'danger'
                  }`"
                  >{{ e.classStatus.toUpperCase() }}</span
                >
              </td>
              <td>
                <button
                  v-if="e.classStatus.toUpperCase() == 'PENDING'"
                  class="shadow-sm btn btn-sm bg-main text-light"
                  @click="approveStudent(e._id)"
                  data-bs-toggle="modal"
                  data-bs-target="#user_modal"
                >
                  Approve
                </button>
                <button
                  v-if="e.classStatus.toUpperCase() == 'JOINED'"
                  class="shadow-sm btn btn-sm bg-danger text-light"
                  @click="dropStudent(e._id)"
                >
                  Drop
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios";
import store from "../../store";

export default {
  name: "teacher-class-view",
  props: ["classId"],
  data() {
    return {
      teacherId: store.state.user.data._id,
      teacher: {},
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
            import.meta.env.VITE_API_TEACHER_SHOW_V2 +
            `/${this.teacherId}`
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.teacher = res.data;
        this.loadClassInfo();
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
            `/${this.classId}`
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        // check if class's teacher is the same as the current teacher
        if (res.data.teacher._id != this.teacherId) {
          throw "This class is not yours";
        }

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
    async approveStudent(id) {
      try {
        const entry = await axiosClient.post(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS_ARPPOVE_V2,
          {
            class: this.classInfo._id,
            student: id,
          }
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.classInfo = res.data.classId;

        await this.loadClassInfo();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async dropStudent(id) {
      try {
        if (
          confirm(
            "Are you sure you want to drop this student from the class? Operation can not be undone!"
          )
        ) {
          const entry = await axiosClient.post(
            import.meta.env.VITE_SERVER +
              import.meta.env.VITE_API_CLASS_DROP_V2,
            {
              class: this.classInfo._id,
              student: id,
            }
          );
          console.log(entry);
          const res = entry.data;
          if (!res.status) throw res.error;

          // remove student from the list
          this.studentsList = this.studentsList.filter((e) => e._id != id);
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
