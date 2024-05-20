<script setup>
import { useStatsStore } from '@/stores/stats'
import { mapStores } from 'pinia'
import PieChart from '../components/PieChart.vue'
import { useSelectedStore } from '@/stores/selected'
import { getLogoPath } from '@/lib/LogoMapping'
</script>

<template>
  <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover h-screen flex justify-center items-center md:bg-[url('../assets/bakgrundwebb.svg')]">
    <div class="flex flex-col items-center justify-center">
      <div>
        <pie-chart class="w-96 mt-40 mb-10"></pie-chart>
      </div>

      <div
        v-if="partyPercentages.length < 4"
        class="flex flex-col items-center justify-center mb-4"
      >
        <div
          v-for="(party, index) in partyPercentages"
          :key="index"
          class="flex items-center justify-between w-full max-w-xs"
        >
          <img :src="getLogoPath(party.name)" alt="partilogga" class="w-8 h-8 mr-2" />
          <p class="text-lg">{{ party.percentage }}%</p>
        </div>
      </div>

      <div v-else class="grid grid-cols-2 gap-x-10 gap-y-1 mb-4">
        <div
          v-for="(party, index) in partyPercentages"
          :key="index"
          class="flex items-center justify-between w-full max-w-xs"
        >
          <img :src="getLogoPath(party.name)" alt="partilogga" class="w-8 h-8 mr-2" />
          <p class="text-lg">{{ party.percentage }}%</p>
        </div>
      </div>

      <button class="btn btn-lg bg-teal text-white w-40" @click="$router.push('government')">
        Se regering
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
