<template>
  <div class="row">
    <div v-if="isFailed" class="card-body">
      <div class="text-center">
        <h5 class="card-title">FAILED</h5>
        <p>
          You have reached maximum attempt for Post-test. Kindly seek for a
          professional's help. Thank you.
        </p>
      </div>
    </div>
    <div v-if="isCompleted" class="card-body">
      <div class="text-center">
        <h5 class="card-title">COMPLETED</h5>
        <p>
          You have successfully completed this lesson, you may proceed to the
          next one.
        </p>
      </div>
    </div>
    <div class="row p-4">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Pre-test</h5>
            <p class="card-text">
              Take the pretest to determine your knowledge mastery
            </p>
            <RouterLink
              v-if="isInClass && canTakeLesson"
              class="text-danger"
              :to="{
                name: 'student-pretest-view',
                params: { lessonId: lesson._id },
              }"
              >Take Test</RouterLink
            >
            <p v-if="!isInClass" class="text-danger">
              You are not in a class, you may not take the test
            </p>
            <p v-if="!canTakeLesson" class="text-danger">
              You cannot take this lesson yet until you complete the previous
            </p>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Post test</h5>
            <p class="card-text">
              Test what you learned and complete the class
            </p>
            <RouterLink
              v-if="isInClass && conceptStatus.length == 5"
              class="text-danger"
              :to="{
                name: 'student-posttest-view',
                params: { lessonId: lesson._id },
              }"
              >Take Test</RouterLink
            >
            <p v-if="!isInClass" class="text-danger">
              you are not in a class, you may not take the test
            </p>
            <p v-if="conceptStatus.length != 5" class="text-danger">
              You cannot take this post test until you complete all concepts
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card">
        <div class="card-header p-4">
          <h2 v-if="lesson" class="m-auto">{{ lesson.name }}</h2>
        </div>
        <div v-if="concepts.length > 0" class="card-body">
          <div
            class="card my-3"
            v-for="(concept, index) in concepts"
            v-bind:key="concept._id"
          >
            <div class="card-header d-flex justify-content-between">
              <div class="">
                <h4>{{ concept.name }}</h4>
              </div>
            </div>
            <p
              class="text-center"
              v-if="hasPretest && !checkStatus(concept.order)"
            >
              You must complete the previous concept
            </p>
            <div
              class="card-body"
              v-if="hasPretest && checkStatus(concept.order)"
            >
              <p class="card-text">
                Lecture:
                <RouterLink
                  class="text-danger"
                  :to="{
                    name: 'student-lecture-view',
                    params: { conceptId: concept._id, setType: 'A' },
                  }"
                  >View Lecture</RouterLink
                >
              </p>
              <p class="card-text">
                Assesment:
                <RouterLink
                  v-if="isInClass"
                  class="text-danger"
                  :to="{
                    name: 'student-assesment-view',
                    params: { conceptId: concept._id },
                  }"
                  >Take Assesment</RouterLink
                >
                <span v-if="!isInClass" class="text-danger"
                  >You may only view if you dont have a class</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios";
import store from "../../store";

export default {
  name: "student-class-view",
  props: ["lessonId"],
  data() {
    return {
      hasPretest: false,
      isInClass: false,
      canTakeLesson: false,
      canTakePostTest: false,
      isFailed: false,
      isCompleted: false,
      lesson: null,
      lessons: null,
      student: null,
      concepts: [],
      conceptStatus: [],
    };
  },
  mounted() {
    this.getStudent();
    this.getClass();
    this.getConcepts();
  },
  methods: {
    checkStatus(order) {
      if (order == 1) {
        return true;
      }
      console.log(this.conceptStatus);
      // find the concept with the order
      let concept = this.conceptStatus.find(
        (concept) => concept.order == order - 1
      );
      console.log(concept);
      if (concept) {
        return concept.isCompleted;
      }

      return false;
    },
    async getStudent() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_SHOW_V2 +
            "/" +
            store.state.user.data._id
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.student = res.data;

        await this.getLessons();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async getClass() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER + import.meta.env.VITE_API_MEV2
        );

        const res = entry.data;
        if (res.status == false) throw res.error;
        console.log(res);

        const entry2 = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_SHOW_V2 +
            `/${res.data.id}`
        );

        const res2 = entry2.data;
        if (res2.status == false) throw res2.error;

        console.log(res2);
        if (res2.data.classId != null) {
          this.isInClass = true;
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async getConcepts() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CONCEPT_ALL_V2 +
            `?lessonId=${this.lessonId}`
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        console.log(res.data);

        this.concepts = res.data;
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
    async getLessons() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER + import.meta.env.VITE_API_LESSON_ALL_V2
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.lessons = res.data;
        this.lesson = res.data.find((lesson) => lesson._id == this.lessonId);

        const userLessons = this.student.lessons;

        const userSelectedLesson = userLessons.find(
          (lesson) => lesson.lessonId._id == this.lessonId
        );

        console.log("USER LESSON" + userSelectedLesson);

        // if its the first lesson and its not failed student can take the class
        const lessonOrder = this.lesson.order;
        if (userLessons.length > 0) {
          if (lessonOrder == 1 && userLessons[0].status != "FAILED") {
            this.canTakeLesson = true;

            // check if the student has completed the lesson
            if (userLessons[0].status == "COMPLETED") {
              this.isCompleted = true;
            }
          } else {
            // find if the prev lesson order status is completed
            const prevLesson = userLessons.find(
              (lesson) => lesson.lessonId.order == lessonOrder - 1
            );
            if (prevLesson != null && prevLesson.status == "COMPLETED") {
              this.canTakeLesson = true;
            }

            // check if student failed the current lesson
            const currentLesson = userLessons.find(
              (lesson) => lesson.lessonId.order == lessonOrder
            );

            if (currentLesson != null && currentLesson.status == "FAILED") {
              this.isFailed = true;
            }

            // check if student completed the current lesson
            if (currentLesson != null && currentLesson.status == "COMPLETED") {
              this.isCompleted = true;
            }
          }
        } else {
          this.hasPretest = false;
          if (this.lesson.order == 1) {
            this.canTakeLesson = true;
          }
        }

        // CONCEPTS
        if (userSelectedLesson) {
          this.hasPretest = true;
          // get the concept status from the lesson and update concept status
          const takenConcepts = userSelectedLesson.concepts;
          if (takenConcepts == null) {
            this.conceptStatus = [];
          } else {
            // check if the student has completed the concept
            console.log(takenConcepts);
            takenConcepts.forEach((concept, i) => {
              this.conceptStatus.push({
                order: i + 1,
                isCompleted: concept.isCompleted,
              });
            });
          }
          console.log(this.conceptStatus);
        }

        console.log(this.lesson);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>

<style scoped></style>
