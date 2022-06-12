<template>
  <Navigation />
  <br />
  <div class="container py-5">
    <br />
    <br class="p-2 rounded bg-light">
      <div class="row">
        <!-- Col 1 -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Class Concepts</h5>
              <p class="card-text">
                <table class="table">
                  <thead>
                  <tr>
                    <td>
                      <small>Concept</small>
                    </td>
                    <td>
                      <small>Incorectly Answered</small>
                    </td>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="e in classConcepts">
                      <td>{{ e.conceptName }} </td>
                      <td>{{ e.incorrectlyAnswered }}</td>
                    </tr>
                  </tbody>
                </table>
              </p>
            </div>
          </div>
        </div>
        <!-- Col 2 -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Class Questions</h5>
              <p class="card-text">
                <table class="table">
                  <thead>
                  <tr>
                    <td>
                      <small>Question</small>
                    </td>
                    <td>
                      <small>Incorectly Answered</small>
                    </td>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="e in classQuestions">
                      <td>{{ e.questionName }} </td>
                      <td>{{ e.incorrectlyAnswered }}</td>
                    </tr>
                  </tbody>
                </table>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Row end -->
      <br>
      <!-- Row start -->
      <div class="row">
        <!-- Col 1 -->
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Class Students</h5>
              <p class="card-text">
                <table class="table">
                  <thead>
                  <tr>
                    <td>
                      <small>Student</small>
                    </td>
                    <td>
                      <small>Progress</small>
                    </td>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="e in classStudents">
                      <td>{{ e.studentName }} </td>
                      <td>
                        <router-link
                          :to="{ name: 'admin-monitoring-student', params: { studentId: e._id, classId: id } }"
                        >
                          <button class="shadow-sm btn btn-sm bg-main text-light">
                            View
                          </button>
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </p>
            </div>
          </div>
      </div>
      <!-- Row end -->

      </div>  
    </div>
</template>

<script>
import axios from "axios";
import Navigation from "../../../components/admin/navigation.vue";
import auth from "../../../utils/authHeader";

export default {
  name: "admin-monitoring-class",
  components: {
    Navigation,
  },
  props: ["id"],
  data() {
    return {
      classConcepts: null,
      classQuestions: null,
      classStudents: null
    };
  },
  mounted() {
    auth("admin");
    this.loadIncorrectConcept();
    this.loadIncorrectQuestions();
    this.loadStudents();
  },
  methods: {
    async loadIncorrectConcept() {
      try {
        const entry = await axios.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS_MONITORING +
            "/" +
            this.id +
            "/concepts"
        );

        const res = entry.data;
        console.log(res);
        if (!res.status) throw res.error;

        this.classConcepts = res.data;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async loadIncorrectQuestions() {
      try {
        const entry = await axios.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS_MONITORING +
            "/" +
            this.id +
            "/questions"
        );

        const res = entry.data;
        console.log(res);
        if (!res.status) throw res.error;

        this.classQuestions = res.data;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async loadStudents() {
      try {
        const entry = await axios.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS +
            "/" +
            this.id
        );

        const res = entry.data;
        console.log(res);
        if ( !res.status ) throw res.error;

        const studentData = res.data.students.map(e => {
          return {
            studentName: e.student.fullname,
            _id: e.student._id,
          };
        });
        console.log(studentData);

        this.classStudents = studentData;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>
