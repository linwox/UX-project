<script setup>
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
</script>

<script>
export default {
  computed: {
    ...mapStores(useSelectedStore)
  },
  methods: {
    resetSelectedStore() {
      this.selectedStore.selectedPersons = []
    }
  }
}
</script>

<template>
  <main class="main">
    <h2>Regeringen!</h2>
    <div>Alla har roliga hattar!</div>
    <RouterLink to="/" @click="resetSelectedStore">Start over</RouterLink>
  </main>
</template>

<script></script>

<style>
.main {
  width: 30rem;
  height: 40rem;
  border: 1px solid black;
  padding: 1rem;
}
</style>
