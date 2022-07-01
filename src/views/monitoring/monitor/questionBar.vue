<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />

  <div class="container">
    <button @click="exportExcel" class="btn bg-main text-light my-3">
      Export Excel
    </button>
  </div>
</template>

<script>
import axiosClient from "../../../axios";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { saveExcel } from "@progress/kendo-vue-excel-export";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      items: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Incorrect Answers [Post test Questions]",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.concepts();
  },
  methods: {
    exportExcel() {
      saveExcel({
        data: this.items,
        fileName: "myFile",
        columns: [
          { field: "_id.text", title: "Question" },
          { field: "_id.tags", title: "Tags" },
          { field: "inCorrectAnswers", title: "Total Incorrect Answers" },
        ],
      });
    },
    async concepts() {
      try {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
            "/api/v2/graph/question/answers/incorrectly"
        );

        const res = entry.data;
        console.log("GRAPH");
        console.log(res);
        if (!res.status) throw res.error;

        let cleanedNames = [];
        res.data.forEach((item) => {
          cleanedNames.push({
            _id: {
              text: item._id.text.replace(/(<([^>]+)>)/gi, ""),
              tags: item._id.tags,
            },
            inCorrectAnswers: item.inCorrectAnswers,
          });
        });
        this.items = cleanedNames;

        this.chartData.labels = res.data.map((e) => e._id.tags);
        this.chartData.datasets[0].data = res.data.map(
          (e) => e.inCorrectAnswers
        );
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>
