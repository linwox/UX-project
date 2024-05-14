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
        labels: ['V', 'S', 'MP', 'L', 'C', 'KD', 'M', 'SD'],
        datasets: [
          {
            data: statsStore.partyCounts,
            backgroundColor: [
              'red',
              'hotpink',
              'green',
              'cyan',
              'purple',
              'orange',
              'blue',
              'yellow'
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
              // if (value < 5) return '';
              return value + '%'
            }
          },
          legend: {
            position: 'bottom'
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
