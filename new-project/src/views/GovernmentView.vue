<script setup>
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
</script>

<template>
  <div
    class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg center h-screen flex flex-col justify-center items-center md:bg-[url('../assets/bakgrundwebb.svg')] md:pt-40"
  >
    <div class="flex flex-col items-center justify-center">
      <div class="grid grid-cols-3 gap-2 md:gap-4 md:grid-cols-6">
        <div
          v-for="person of selectedStore.selectedPersons"
          :key="person.id"
          class="flex flex-col items-center"
        >
          <div class="flex flex-col relative items-center">
            <img
              :src="person.hat"
              alt="partyhat"
              class="partyhat absolute m-1 w-10 h-8 mr-2 z-10"
            />
            <div class="card w-24 md:w-32 shadow-xl rounded z-0">
              <img :src="person.imageUrl" alt="Politician" class="rounded" />
              <img
                :src="person.logoUrl"
                alt="partilogga"
                class="absolute bottom-0 left-0 m-1 w-8 h-8 mr-2 z-10"
              />
            </div>

            <p class="font-semibold">{{ person.ministerPost }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center space-x-4 mt-6">
      <button class="btn btn-lg bg-teal text-white w-30" @click="$router.push('result')">
        Statistik
      </button>
      <button class="btn btn-lg bg-teal text-white w-30" @click="$router.push('closing')">
        Avsluta
      </button>
    </div>
  </div>
</template>

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

<style scoped>
.partyhat {
  bottom: 92%;
  left: 40%;
  transform: translate(-50%, 50%);
}
</style>
