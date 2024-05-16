<script setup>
import { useStatsStore } from '@/stores/stats'
import { mapStores } from 'pinia'
import PieChart from '../components/PieChart.vue'
import { useSelectedStore } from '@/stores/selected'
</script>

<template>
  <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg-center h-screen ">
    
      <div class="flex items-center justify-center">
        <pie-chart class="w-80 mt-40 mb-10"></pie-chart>
      </div>
      <div v-for="(party, index) in partyPercentages" :key="index">
        <p class="text-lg flex items-center justify-center mt-1">{{ party.name }}: {{ party.percentage }}%</p>
    </div>
    <div v-for="(party, index) in partyPercentages" :key="index">
      <p class="text-lg flex items-center justify-center mt-1">
        {{ party.name }}: {{ party.percentage }}%
      </p>
    </div>
    <RouterLink to="/government" class="flex items-center justify-center mt-20"
      >Se din regering</RouterLink
    >
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
