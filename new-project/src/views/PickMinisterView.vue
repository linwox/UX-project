<script setup>
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
</script>

<script>
export default {
  data() {
    return {
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
    setMinister(ministerPost, id) {
      const index = this.selectedStore.selectedPersons.findIndex(obj => obj.id === id)
      this.selectedStore.selectedPersons[index].ministerPost = ministerPost
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
    },
    hideButton(id) {
      // Set buttonPressed to true for the specific person
      const index = this.selectedStore.selectedPersons.findIndex(obj => obj.id === id)
      this.selectedStore.selectedPersons[index].buttonPressed = true;
    },
    handleButtonClick(ministerPost, id) {
      this.setMinister(ministerPost, id);
      
      this.hideButton(id);

    }
  }
}
</script>

<template>
  <h2 class="flex items-center justify-center mt-3">Ministerpost</h2>
  <div class="flex items-center justify-center mt-3">Välj vem som ska ha posten</div>
  <div class="flex items-center justify-center mt-3">
    <select id="minister_post" v-model="ministerPost" class="select select-bordered w-48 max-w-xs">
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
  </div>
  <div class="flex items-center justify-center mt-3">
    <div class="w- carousel carousel-center p-4 space-x-4 bg-neutral rounded-box bg-white">
      <div class="w-72 carousel carousel-center p-4 space-x-4 bg-neutral rounded-box bg-white">
        <div v-for="person of selectedStore.selectedPersons" class="carousel-item ml-8 l">
          <div>
            <img :src="person.imageUrl" alt="politician" class="rounded-box border-2" />
            <div class="block align-bottom">{{ person.firstName }} {{ person.age }}</div>
            <!-- Här ska vi skriva ut vilken ministerpost man valt och ta bort knappen -->
            <p class="flex items-center justify-center content-center">
              <button class="p-2 rounded border-2" v-if="!person.buttonPressed" @click="handleButtonClick(ministerPost, person.id)">Välj</button>
              <p class="flex items-center justify-center content-center"
                v-else>{{ person.ministerPost }}
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RouterLink class="flex items-center justify-center mt-5" to="/government"
    >Se din regering</RouterLink
  >
</template>
