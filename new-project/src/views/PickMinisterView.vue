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
    <h2>Ministerpost</h2>
    <div>Välj vem som ska ha posten</div>
    <div v-for="person of selectedStore.selectedPersons">
      <img :src="person.imageUrl" class="" />
      <p>{{ person.age }}</p>
    </div>

    <RouterLink to="/government">Se din regering</RouterLink>
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
