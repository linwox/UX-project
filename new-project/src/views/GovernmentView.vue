<script setup>
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
</script>

<script>
export default {
  data() { },
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
    <div v-for="person of selectedStore.selectedPersons" :key="person">
      <label class="swap swap-flip text-9xl">
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" />

        <div class="swap-off">
          <div class="card w-96 bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
              <img :src="person.imageUrl" alt="Politician" class="rounded-xl" />
            </figure>
          </div>
        </div>

        <div class="swap-on">
          <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body items-center text-center">
              <h2 class="card-title"></h2>
              <p>{{ person.firstName }} {{ person.age }} {{ person.party }}</p>
            </div>
          </div>
        </div>

      </label>
    </div>
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
