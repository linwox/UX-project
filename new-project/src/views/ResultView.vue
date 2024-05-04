<script setup>
import { useSelectedStore } from '@/stores/selected'
</script>

<script>
export default {
  computed: {
    ...Pinia.mapStores(useSelectedStore),
    // Ett sätt att komma åt sin action
    ...Pinia.mapState(useSelectedStore, ['selectedIds'])
  },
  // Ett annat sätt att komma åt sin action
  methods: {
    ...Pinia.mapActions(useSelectedStore, ['selectedIds'])
  }
}
</script>

<template>
  <main class="main">
    <h2>Resultat</h2>
    <div>
      <p>% vilka partier man fick</p>
      <p>{{ selectedStore.selectedIds }}</p>
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
