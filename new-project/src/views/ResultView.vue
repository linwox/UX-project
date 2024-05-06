<script setup>
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
</script>

<script>
export default {
  computed: {
    ...mapStores(useSelectedStore, ['selectedPersons'])
  }
}
</script>

<template>
  <main class="main">
    <h2>Resultat</h2>
    <div>
      <p>% vilka partier man fick</p>
      <!-- Hämta ut selectedIds från storen (som hämtar från CardView) -->
      <p>{{ selectedStore.selectedPersons }}</p>
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
