<template>
  <br class="p-2 rounded bg-light" />
  <div v-if="isLoading" class="card-body">
    <div class="text-center">
      <h5 class="card-title">Loading...</h5>
    </div>
  </div>
  <!-- Row start -->
  <div v-if="!isLoading" class="row">
    <!-- Col 1 -->
    <div
      v-if="student"
      class="accordion accordion-flush"
      :id="'accordionFlush-' + student._id"
    >
      <div
        v-for="info in student.lessons"
        class="accordion-item"
        :key="info.lessonId._id"
      >
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
          </div>
        </div>
      </div>
    </div>
    <!-- Col 1 end -->
  </div>
  <!-- Row end -->
  <div v-if="!isLoading" class="row m-auto mt-5">
    <!-- Pretests -->
    <div class="col-md-6">
      <h5>Pretest</h5>

      <table class="table">
        <thead style="border: none">
          <tr class="">
            <th class="text-maincolor">Lesson</th>
            <th class="text-maincolor">Date</th>
            <th class="text-maincolor" style="max-width: 150px">-</th>
          </tr>
        </thead>
        <p class="text-center" v-if="pretest.list.length <= 0">
          No Pretest To Show
        </p>
        <tbody v-if="pretest.list.length > 0">
          <tr v-for="e in pretest.list" v-bind:key="e._id">
            <td>
              <small>{{ e.name }}</small>
            </td>
            <td>
              <small>{{ e.date }}</small>
            </td>
            <td>
              <RouterLink
                class="shadow-sm btn btn-sm bg-main text-light"
                :to="{
                  name: 'monitor-pretest',
                  params: { pretestId: e._id },
                }"
              >
                View Result
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="btn-group" role="group">
        <button
          type="button"
          v-if="pretest.hasPrevPage"
          @click="loadPretest(pretest.page - 1)"
          class="btn btn-outline-secondary"
        >
          Prev
        </button>
        <button type="button" class="btn btn-outline-secondary">
          {{ pretest.page }}
        </button>
        <button
          type="button"
          v-if="pretest.hasNextPage"
          @click="loadPretest(pretest.page + 1)"
          class="btn btn-outline-secondary"
        >
          Next
        </button>
      </div>
    </div>
    <!-- Pretests end -->
    <!-- Posttests -->
    <div class="col-md-6">
      <h5>Posttest</h5>

      <table class="table">
        <thead style="border: none">
          <tr class="">
            <th class="text-maincolor">Lesson</th>
            <th class="text-maincolor">Date</th>
            <th class="text-maincolor" style="max-width: 150px">-</th>
          </tr>
        </thead>
        <p class="text-center" v-if="posttest.list.length <= 0">
          No Posttest To Show
        </p>
        <tbody v-if="posttest.list.length > 0">
          <tr v-for="e in posttest.list" v-bind:key="e._id">
            <td>
              <small>{{ e.name }}</small>
            </td>
            <td>
              <small>{{ e.date }}</small>
            </td>
            <td>
              <RouterLink
                class="shadow-sm btn btn-sm bg-main text-light"
                :to="{
                  name: 'monitor-posttest',
                  params: { posttestId: e._id },
                }"
              >
                View Result
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="btn-group" role="group">
        <button
          type="button"
          v-if="posttest.hasPrevPage"
          @click="loadPosttest(posttest.page - 1)"
          class="btn btn-outline-secondary"
        >
          Prev
        </button>
        <button type="button" class="btn btn-outline-secondary">
          {{ posttest.page }}
        </button>
        <button
          type="button"
          v-if="posttest.hasNextPage"
          @click="loadPosttest(posttest.page + 1)"
          class="btn btn-outline-secondary"
        >
          Next
        </button>
      </div>
    </div>
    <!-- Posttests end -->
  </div>
</template>

<script>
import axiosClient from "../../../axios";

export default {
  name: "student-myprogress",
  props: ["studentId"],
  data() {
    return {
      isLoading: true,
      student: null,
      pretest: {
        hasPrevPage: false,
        hasNextPage: false,
        page: 1,
        search: null,
        list: [],
      },
      posttest: {
        hasPrevPage: false,
        hasNextPage: false,
        page: 1,
        search: null,
        list: [],
      },
    };
  },
  mounted() {
    this.loadSelf();
  },
  methods: {
    async loadSelf() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_STUDENT_SHOW_V2 +
            "/" +
            this.studentId
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        this.student = res.data;

        await this.loadPretest();
        await this.loadPosttest();
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async loadPretest(page = 1) {
      try {
        let list = [];
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_PRETEST_RESULTS_PAGINATE_V2 +
            "?student=" +
            this.student._id +
            "&page=" +
            page +
            "&count=" +
            5
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        res.data.docs.forEach((e) => {
          const parsedDate = new Date(e.createdAt).toLocaleString();
          list.push({
            _id: e._id,
            name: e.lessonId.name,
            date: parsedDate,
          });
        });

        this.pretest.list = list;
        this.pretest.page = res.data.page;
        this.pretest.hasPrevPage = res.data.hasPrevPage;
        this.pretest.hasNextPage = res.data.hasNextPage;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    async loadPosttest(page = 1) {
      try {
        let list = [];
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_POSTTEST_RESULTS_PAGINATE_V2 +
            "?student=" +
            this.student._id +
            "&page=" +
            page +
            "&count=" +
            5
        );

        const res = entry.data;
        if (!res.status) throw res.error;

        res.data.docs.forEach((e) => {
          const parsedDate = new Date(e.createdAt).toLocaleString();
          list.push({
            _id: e._id,
            name: e.lessonId.name,
            date: parsedDate,
          });
        });

        this.posttest.list = list;
        this.posttest.page = res.data.page;
        this.posttest.hasPrevPage = res.data.hasPrevPage;
        this.posttest.hasNextPage = res.data.hasNextPage;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    countCompletedConcepts(lessonId) {
      let count = 0;
      const lesson = this.student.lessons.filter((lesson) => {
        return lesson.lessonId._id == lessonId;
      });
      console.log(lesson);
      lesson.forEach((lesson) => {
        lesson.concepts.forEach((concept) => {
          if (concept.isCompleted) {
            count++;
          }
        });
      });
      return count;
    },
  },
};
</script>
