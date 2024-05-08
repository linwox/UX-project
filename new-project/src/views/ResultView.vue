<script setup>
import { useStatsStore } from '@/stores/stats'
import { mapStores } from 'pinia'
import PieChart from '../components/PieChart.vue'
</script>

<template>
  <main class="main">
    <h2>Resultat</h2>
    <div>
      <pie-chart></pie-chart>
      <p>{{ statsStore.partyCounts }}</p>
    </div>
    <RouterLink to="/pick_minister">Dela ut ministerposter</RouterLink>
  </main>
</template>

<script>
export default {
  computed: {
    ...mapStores(useStatsStore),
  },

  components: {
    PieChart
  }, 

  methods: {
    showStats() {
      const partyNames = ['V', 'S', 'MP', 'L', 'C', 'KD', 'M', 'SD']
      partyNames.forEach(party => {
        const count = this.statsStore[`${party.toLowerCase()}_count`]
        console.log(`${party}: ${count}`)
        return party, count
      })
    }
  },
  mounted() {
    this.showStats()
  }
}
</script>

<style>
.main {
  width: 30rem;
  height: 40rem;
  border: 1px solid black;
  padding: 1rem;
}
</style>
