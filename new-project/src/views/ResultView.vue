<script setup>
import { useStatsStore } from '@/stores/stats'
import { mapStores } from 'pinia'
import PieChart from '../components/PieChart.vue'
import { useSelectedStore } from '@/stores/selected'
import { useLogosStore } from '@/stores/logos'
</script>

<template>
  <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg-center h-screen">
    <div class="flex flex-col items-center justify-center">
      <div>
        <pie-chart class="w-80 mt-40 mb-10"></pie-chart>
      </div>
      <div v-for="(party, index) in partyPercentages" :key="index">
        <p class="text-lg flex items-center justify-center mt-1">
          {{ party.name }}: {{ party.percentage }}%
        </p>
      </div>
      <button class="btn btn-lg bg-teal text-white w-40 items-center">
        <RouterLink to="/government">Se regering</RouterLink>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    ...mapStores(useStatsStore, useSelectedStore),

    partyPercentages() {
      const partyNames = ['V', 'S', 'MP', 'L', 'C', 'KD', 'M', 'SD']
      return partyNames
        .map((party) => {
          const count = this.statsStore[`${party.toLowerCase()}_count`]
          const percentage = Math.round((count / 12) * 100)
          return { name: party, percentage: percentage }
        })
        .filter((party) => party.percentage !== 0)
    }
  },
  components: {
    PieChart
  }
}
</script>
