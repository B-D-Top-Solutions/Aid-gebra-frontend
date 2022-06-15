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

        this.chartData.labels = res.data.map((e) =>
          e._id.text.replace(/(<([^>]+)>)/gi, "")
        );
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
