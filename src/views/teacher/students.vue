<template>
  <Navigation />
  <br />
  <div class="container py-5">
    <br />
    <div class="p-2 rounded bg-light">
      <table class="table">
        <thead style="border: none">
          <tr class="">
            <th class="text-maincolor">Fullname</th>
            <th class="text-maincolor">Email</th>
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
              <span
                :class="`badge bg-${
                  e.status.toUpperCase() == 'DROPPED' ? 'danger' : 'success'
                }`"
                >{{ e.status.toUpperCase() }}</span
              >
            </td>
            <td>
              <button
                v-if="e.status.toUpperCase() == 'PENDING'"
                class="shadow-sm btn btn-sm bg-main text-light"
                @click="approveStudent(e._id)"
              >
                Approve
              </button>
              <button
                v-if="e.status.toUpperCase() == 'ENROLLED'"
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
</template>

<script>
import axios from "axios";
import Navigation from "../../components/admin/navigation.vue";
import auth from "../../utils/authHeader";

export default {
  name: "teacher-students",
  components: {
    Navigation,
  },
  props: ["classId", "classCode"],
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    auth("teacher");
    this.loadData();
  },
  methods: {
    async loadData(page = 1) {
      try {
        let list = [];
        const entry = await axios.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS +
            "/" +
            this.classId
        );

        const res = entry.data;
        console.log(res);
        if (!res.status) throw res.error;

        res.data.students.forEach((student) => {
          list.push({
            _id: student.student._id,
            email: student.student.email,
            fullname: student.student.fullname,
            status: student.status,
          });
        });

        this.list = list;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },

    async approveStudent(studentId) {
      try {
        const entry = await axios.post(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_TEACHER_APPROVE +
            "/" +
            this.classCode +
            "/approve/" +
            studentId,
          {}
        );

        const res = entry.data;

        if (!res.status) throw res.error;

        alert("student is now enrolled");
        this.loadData();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },

    async dropStudent(studentId) {
      try {
        const entry = await axios.delete(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_TEACHER_DROP +
            "/" +
            this.classCode +
            "/drop/" +
            studentId,
          {}
        );

        const res = entry.data;

        if (!res.status) throw res.error;

        alert("student is now dropped from the class");
        this.loadData();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>
