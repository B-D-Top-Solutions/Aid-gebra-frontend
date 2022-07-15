<template>
  <button @click="exportExcel" class="btn bg-main text-light mb-3">Export Excel</button>

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

import axios from "axios";
import auth from "../utils/authHeader";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

import { saveExcel } from '@progress/kendo-vue-excel-export';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      items: [],
      chartData: {
        labels: [],
        datasets: [ 
            {
              label: 'Incorrect Answers [Post test Concepts]',
              backgroundColor: '#f87979',
              data: [] 
            },
            {
              label: 'Correct Answers [Post test Concepts]',
              backgroundColor: '#f87979',
              data: [] 
            }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    auth("admin");
    this.loadClass()
  },
  methods : {
    exportExcel () {
        saveExcel({
            data: this.items,
            fileName: "myFile",
            columns: [
              { field: '_id.name', title : "Concepts"},
              { field: 'incorrectAnswers', title : "Total Incorrect Answers"},
              { field: 'correctAnswers', title: 'Total correct Answers' }
          ]
        });
    },
    async loadClass(){
        try{
            const entry =  await axios
            .get(
                import.meta.env.VITE_SERVER+
                "/api/classes"
            )

            const res = entry.data
            console.log("CLASSES")
            console.log(res)
            if(!res.status) throw res.error
        }
        catch(error){
            // alert(error)
        }
    },
    async concepts(classId) {
        try{
            if(!classId) throw "Please select class"

            const entry =  await axios
            .get(
                import.meta.env.VITE_SERVER+
                "/api/v2/graph/concept/answers/incorrectly?class="+classId,
            )

            const res = entry.data
            console.log("GRAPH")
            console.log(res)
            if(!res.status) throw res.error
            this.items = res.data
            this.chartData.labels = res.data.map(e => e._id.name)
            this.chartData.datasets[0].data = res.data.map(e => e.incorrectAnswers)
            this.chartData.datasets[1].data = res.data.map(e => e.correctAnswers)
        }
        catch(error){
            // alert(error)
        }
    }
  }
}
</script>