<template>
  <div>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartDataCom"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/08/11
 */
'use strict'
import { Bar } from 'vue-chartjs/legacy'
import {Chart as ChartJS, registerables, } from 'chart.js'
import * as Utils from '../utils/chart_utils'

ChartJS.register(...registerables)

export default {
  name: 'VnChart',
  components: { Bar },
  props: {
    chartName: {
      type: String,
      default: 'Bar Chart'
    },
    chartData: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: { position: 'top', },
          title: { display: true, text: this.chartName },
        },
        interaction: {
          intersect: false,
          mode: 'index',
          axis: 'xy',
        },
        scales: {
          x: { display: true, },
          y: { display: true, },
          // y: { display: true, type: 'logarithmic',},
        }
        // hover: {
        //   mode: "nearest",
        //   intersect: true
        // },
      }
    },
    chartDataCom() {
      return this.chartData && Object.keys(this.chartData).length > 0
        ? this.chartData
        : this.sample
    }
  },
  data() {
    return {
      sample: {
        labels: ['January', 'February', 'March'],
        datasets: [
          {
            label: 'My First dataset',
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            borderWidth: 2,
            borderRadius: 5,
            data: [40, 20, 12]
          },
          {
            label: 'Small Radius',
            borderColor: Utils.CHART_COLORS.blue,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
            data: [40, 20, 12],
          }
        ]
      }
    }
  },
  methods: {
    initChart() {

    }
  },
  beforeMount() {
    this.initChart()
  },
}
</script>

<style scoped>

</style>
