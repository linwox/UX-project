<script setup>
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
</script>

<script>
export default {
  data() {},
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
  <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg-center h-screen pt-20">
    <div class="grid grid-cols-3 gap-2 p-1 pb-10">
      <div v-for="person of selectedStore.selectedPersons" :key="person.id">
        <label class="swap swap-flip text-9xl">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" />

          <div class="swap-off ml-3 pt-4 flex">
            <div class="card w-24 shadow-xl rounded">
              <img :src="person.imageUrl" alt="Politician" class="rounded" />
            </div>
          </div>

          <div class="swap-on">
            <div class="card w-20 h-36 bg-base-100 shadow-xl">
              <div class="card-body items-center text-center">
                <h2 class="card-title"></h2>
                <p class="text-base">{{ person.firstName }}</p>
                <p class="text-base">{{ person.age }}</p>
                <p class="text-base">{{ person.party }}</p>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
    <div class="text-center">
      <button class="btn btn-lg bg-teal text-white w-24" @click="this.$router.push('closing')">Klar!</button>
    </div>
  </div>
</template>
