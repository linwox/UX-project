<script setup>
import { useStatsStore } from '@/stores/stats'
import { mapStores } from 'pinia'
import PieChart from '../components/PieChart.vue'
import { useSelectedStore } from '@/stores/selected'

const logoMapping = {
  'V': '/src/assets/Loggor/V_logo.svg',
  'S': '/src/assets/Loggor/S_logo.svg',
  'MP': '/src/assets/Loggor/MP_logo.svg',
  'L': '/src/assets/Loggor/L_logo.svg',
  'C': '/src/assets/Loggor/C_logo.svg',
  'KD': '/src/assets/Loggor/KD_logo.svg',
  'M': '/src/assets/Loggor/M_logo.svg',
  'SD': '/src/assets/Loggor/SD_logo.svg'
}

const getLogoPath = (partyName) => logoMapping[partyName]
</script>

<template>
  <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg-center h-screen">
    <div class="flex flex-col items-center justify-center">
      <div>
        <pie-chart class="w-80 mt-40 mb-10"></pie-chart>
      </div>
      <div v-for="(party, index) in partyPercentages" :key="index">
        <p class="text-lg flex items-center justify-center mt-1">
          <img :src="getLogoPath(party.name)" alt="" class="w-8 h-8">
          : {{ party.percentage }}% 
        </p>
      </div>
      <button class="btn btn-lg bg-teal text-white w-40" @click="this.$router.push('government')">Se regering</button>
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
  methods: {
    getLogoPath(partyName) {
      return logoMapping[partyName]
    }
  },
  components: {
    PieChart
  }
}
</script>
