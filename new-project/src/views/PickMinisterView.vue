<script setup>
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
</script>

<script>
export default {
  data() {
    return {
      ministers: new Map([["Statsminister", undefined],
                          ["Finansminister", undefined],
                          ["Jämställdhetsminister", undefined],
                          ["Klimatminister", undefined],
                          ["Sjukvårdsminister", undefined],
                          ["Kulturminister", undefined],
                          ["Skolminister", undefined],
                          ["Justitieminister", undefined],
                          ["Försvarsminister", undefined],
                          ["Utrikesminister", undefined],
                          ["Migrationsminister", undefined],
                          ["Landsbygdsminister", undefined]]),
    }
  },
  computed: {
    ...mapStores(useSelectedStore, ['selectedPersons'])
  },
  methods: {
    setMinister(key, id) {
      this.ministers.set(key, id)
    }
  }
}
</script>

<template>

  <h2 class="flex items-center justify-center mt-3">Ministerpost</h2>
  <div class="flex items-center justify-center mt-3">Välj vem som ska ha posten</div>
  <!-- <div class="flex items-center justify-center mt-3" v-for="minister of ministerLabels"> {{ minister }} </div> -->
  <div class="flex items-center justify-center mt-3">
    <div class=" w-72 carousel carousel-center p-4 space-x-4 bg-neutral rounded-box bg-white">
      <div v-for="person of selectedStore.selectedPersons" class="carousel-item ml-8 l">
        <div>
          <img v-bind:src="person.imageUrl" class="rounded-box border-2" />
          <div class="block align-bottom">{{ person.firstName }} {{ person.age }}</div>
          <p class="flex items-center justify-center content-center">
            <button class=" p-2 rounded border-2">Välj</button>
          </p>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
  <RouterLink class="flex items-center justify-center mt-5" to="/government">Se din regering</RouterLink>


</template>

<!-- <style>
.main {
  width: 30rem;
  height: 40rem;
  border: 1px solid black;
  padding: 1rem;
}
</style> -->
