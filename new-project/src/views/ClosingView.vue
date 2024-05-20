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
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <div
    class="bg-[url('../assets/partySwipeStart.svg')] bg-cover h-screen flex flex-col justify-end items-center pb-52"
  >
    <p class="pb-72 text-2xl">Tack för att du spelade!</p>

    <div class="text-center space-x-4">
      <button class="btn btn-lg bg-teal text-white w-30" @click="resetSelectedStore">
        Till start
      </button>
      <button class="btn btn-lg bg-teal text-white w-30" @click="$router.push('about')">
        Om oss
      </button>
    </div>
  </div>
</template>
