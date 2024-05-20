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
  <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg center h-screen flex flex-col justify-center items-center md:bg-[url('../assets/bakgrundwebb.svg')]">
    <div class="flex flex-col items-center justify-center">
      <div class="grid grid-cols-3 gap-2">
        <div
          v-for="person of selectedStore.selectedPersons"
          :key="person.id"
          class="flex flex-col items-center"
        >
          <div class="flex flex-col relative items-center">
            <img
              :src="'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDY0OXdzMGllNjYxYXp5ZDc5eTNobmtjcXlrbDJocHNudHlzcTg1MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/fwE6vBUQvweaBQR9zb/giphy.gif'"
              alt="partyhat"
              class="partyhat absolute m-1 w-10 h-8 mr-2 z-10"
            />
            <div class="card w-24 shadow-xl rounded z-0">
              <img :src="person.imageUrl" alt="Politician" class="rounded" />
              <img
                :src="person.logoUrl"
                alt="partilogga"
                class="absolute bottom-0 left-0 m-1 w-8 h-8 mr-2 z-10"
              />
              <!-- <img
                :src="'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/1290px-Love_Heart_SVG.svg.png?20081212064102'"
                alt="partilogga"
                class="absolute bottom-0 left-0 m-1 w-8 h-8 mr-2 z-10"
              /> -->
            </div>

            <p class="font-semibold">{{ person.ministerPost }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center space-x-4 mt-6">
      <button class="btn btn-lg bg-teal text-white w-30" @click="$router.push('result')">
        Tillbaka
      </button>
      <button class="btn btn-lg bg-teal text-white w-30" @click="$router.push('closing')">
        Avsluta
      </button>
    </div>
  </div>
</template>

<style scoped>
.partyhat {
  bottom: 92%; /* Position the hat outside of the card area */
  left: 40%;
  transform: translate(-50%, 50%); /* Center horizontally and adjust vertically */
}
</style>
