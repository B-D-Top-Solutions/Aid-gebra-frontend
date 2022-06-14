<template>
  <Navigation />
  <br />
  <div class="container py-5">
    <br />
    <br class="p-2 rounded bg-light" />
    <!-- Row start -->
    <div class="row">
      <!-- Col 1 -->
      <div
        v-for="classes in studentInfo"
        class="accordion accordion-flush"
        :id="'accordionFlush-' + classes.classId._id"
      >
        <div v-for="info in classes.lessons" class="accordion-item">
          <h2 class="accordion-header" :id="'flush-' + info.lessonId._id">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#flush-collapse' + info.lessonId._id"
            >
              {{ info.lessonId.name }}
            </button>
          </h2>
          <div
            :id="'flush-collapse' + info.lessonId._id"
            class="accordion-collapse collapse"
          >
            <div class="accordion-body">
              <div class="row">
                Concept Progress:
                {{ countCompletedConcepts(info.lessonId._id) * 20 }} %
              </div>
              <div class="row my-4">
                Pretest Result:
                <table class="table">
                  <thead>
                    <tr>
                      <td>
                        <small>Concept</small>
                      </td>
                      <td>
                        <small>Mastery</small>
                      </td>
                      <td>
                        <small>Incorectly Answered</small>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="e in displayPretestResults(info.pretest_results)"
                      :key="e.conceptName"
                    >
                      <td>{{ e.conceptName }}</td>
                      <td>{{ e.conceptMastery }}</td>
                      <td>{{ e.incorrectlyAnswered }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Col 1 end -->
    </div>
    <!-- Row end -->
  </div>
</template>

<script>
import axios from "axios";
import Navigation from "../../../components/teacher/navigation.vue";
import auth from "../../../utils/authHeader";

export default {
  name: "teacher-monitoring-student",
  components: {
    Navigation,
  },
  props: ["classId", "studentId"],
  data() {
    return {
      studentInfo: null,
    };
  },
  mounted() {
    auth("teacher");
    this.loadStudentInfo();
  },
  methods: {
    async loadStudentInfo() {
      try {
        const entry = await axios.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CLASS_MONITORING +
            "/" +
            this.classId +
            "/student/" +
            this.studentId
        );
        const res = entry.data;
        console.log(res.data);
        if (!res.status) throw res.error;

        this.studentInfo = [res.data];
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    // count completed lesson concepts
    countCompletedConcepts(lessonId) {
      let count = 0;
      this.studentInfo.forEach((student) => {
        student.lessons.forEach((lesson) => {
          lesson.concepts.forEach((concept) => {
            if (concept.isCompleted) count++;
          });
        });
      });
      return count;
    },

    displayPretestResults(pretestResult) {
      const result = [];
      let count = 0;
      while (count < 5) {
        result.push({
          conceptName: pretestResult.concepts[count].conceptId.name,
          conceptMastery: pretestResult.concepts[count].mastery,
          incorrectlyAnswered: pretestResult.results[count].incorrectlyAnswered,
        });
        count++;
      }
      return result;
    },
  },
};
</script>
