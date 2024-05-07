<script setup>
import { useStatsStore } from '@/stores/stats'
import { mapStores } from 'pinia'
</script>

<script>
export default {
  computed: {
    ...mapStores(useStatsStore, ['partyCounts'])
  }
}
</script>

<template>
  <main class="main">
    <h2>Resultat</h2>
    <div>
      <p>% vilka partier man fick</p>
      <p></p>
      <p>{{ statsStore.partyCounts }}</p>
    </div>
    <RouterLink to="/pick_minister">Dela ut ministerposter</RouterLink>
  </main>
</template>

<style>
.main {
  width: 30rem;
  height: 40rem;
  border: 1px solid black;
  padding: 1rem;
}
</style>
