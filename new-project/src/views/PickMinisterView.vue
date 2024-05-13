<script setup>
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
</script>

<script>
export default {
  data() {
    return {
      ministers: new Map([
        ['prime', undefined],
        ['finance', undefined],
        ['equality', undefined],
        ['climate', undefined],
        ['health', undefined],
        ['culture', undefined],
        ['school', undefined],
        ['justice', undefined],
        ['defence', undefined],
        ['foreign', undefined],
        ['migration', undefined],
        ['rural', undefined]
      ]),
      ministerPost: undefined
    }
  },
  computed: {
    ...mapStores(useSelectedStore)
  },
  methods: {
    selectMinister() {
      const things = document.getElementsByClassName('carousel-item')
      for (const elem of things) {
        console.log(elem.getBoundingClientRect(), elem.dataset.item)
      }
    },
    setMinister() {
      this.ministers.set(this.ministerPost, randomId)
    },
    getMinisterPostValue() {
      const e = document.getElementById('minister_post')
      const value = e.value
      return value
    },
    getMinisterPostText() {
      const e = document.getElementById('minister_post')
      const text = e.target.options[e.target.selectedIndex].text
      return text
    }
  }
}
</script>

<template>
  <h2 class="flex items-center justify-center mt-3">Ministerpost</h2>
  <div class="flex items-center justify-center mt-3">Välj vem som ska ha posten</div>
  <!-- <div class="flex items-center justify-center mt-3" v-for="minister of ministerLabels"> {{ minister }} </div> -->
  <div class="flex items-center justify-center mt-3">
    <div class="w- carousel carousel-center p-4 space-x-4 bg-neutral rounded-box bg-white">

      <!-- <div v-for="person of selectedStore.selectedPersons" class="carousel-item ml-8 l" :data-item="person.id">
        <div>
          <img v-bind:src="person.imageUrl" class="rounded-box border-2" />
          <div class="block align-bottom">{{ person.firstName }} {{ person.age }}</div>
          <p class="flex items-center justify-center content-center">
          </p> -->

      <!-- <div
        v-for="person of selectedStore.selectedPersons"
        class="carousel-item ml-8 l"
        :data-item="person.id"
      > -->
      d
        <select
          id="minister_post"
          v-model="ministerPost"
          class="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>Ministerposter</option>
          <option value="prime">Statsminister</option>
          <option value="finance">Finansminister</option>
          <option value="equality">Jämställdhetsminister</option>
          <option value="climate">Klimatminister</option>
          <option value="health">Sjukvårdminister</option>
          <option value="culture">Kulturminister</option>
          <option value="school">Skolminister</option>
          <option value="justice">Justitieminister</option>
          <option value="defence">Försvarsminister</option>
          <option value="foreign">Utrikesminister</option>
          <option value="migration">Migrationsminister</option>
          <option value="rural">Landsbygdsminister</option>
        </select>
        <div class="w-72 carousel carousel-center p-4 space-x-4 bg-neutral rounded-box bg-white">
          <div v-for="person of selectedStore.selectedPersons" class="carousel-item ml-8 l">
            <div>
              <img :src="person.imageUrl" alt="politician" class="rounded-box border-2" />
              <div class="block align-bottom">{{ person.firstName }} {{ person.age }}</div>
              <p class="flex items-center justify-center content-center">
                {{ ministerPost }}
              </p>
              <p class="flex items-center justify-center content-center">
                <button class="p-2 rounded border-2" @click="setMinister">Välj</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
  <div class="flex items-center justify-center mt-2">
    <button class="p-2 rounded border-2" @click="selectMinister">Välj</button>
  </div>
  <RouterLink class="flex items-center justify-center mt-5" to="/government"
    >Se din regering</RouterLink
  >
</template>

<!-- <style>
.main {
  width: 30rem;
  height: 40rem;
  border: 1px solid black;
  padding: 1rem;
}
</style> -->
