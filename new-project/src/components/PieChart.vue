<script setup>
import { useStatsStore } from '../stores/stats.js'
import { Chart, PieController, ArcElement, Legend } from 'chart.js'
</script>

<template>
  <div>
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  data() {
    return {
      pieChart: null
    }
  },
  mounted() {
    const statsStore = useStatsStore()
    const ctx = this.$refs.pieChart.getContext('2d')

    Chart.register(PieController, ArcElement, Legend)

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['V', 'S', 'MP', 'C', 'L', 'KD', 'M', 'SD'],
        datasets: [
          {
            data: statsStore.partyCounts,
            backgroundColor: [
              'red',
              'firebrick',
              'rgb(163 230 53)',
              'rgb(22 163 74)',
              'rgb(56 189 248)',
              'rgb(96 165 250)',
              'rgb(29 78 216)',
              'gold'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            display: true,
            formatter: (value) => {
              if (value < 15) return ''
              return value + '%'
            }
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true
            }
          },
          title: {
            display: true,
            text: 'Party Counts'
          }
        }
      }
    })
  }
}
</script>
