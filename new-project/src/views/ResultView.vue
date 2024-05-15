<script setup>
import { useStatsStore } from '@/stores/stats'
import { mapStores } from 'pinia'
import PieChart from '../components/PieChart.vue'
import { useSelectedStore } from '@/stores/selected'
</script>

<template>
  <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg-center h-screen">
    <div class="mt-32">
      <h2 class="text-xl text-center">Resultat</h2>
      <pie-chart class="w-80"></pie-chart>
      <div v-for="(party, index) in partyPercentages" :key="index">
        <p class="text-lg">{{ party.name }}: {{ party.percentage }}%</p>
      </div>
    </div>
    <RouterLink to="/government">Se din regering</RouterLink>
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
