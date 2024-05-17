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
  <div
    class="bg-[url('../assets/partySwipeStart.svg')] bg-cover h-screen flex flex-col justify-end items-center pb-52"
  >
    <p class="pb-72 text-2xl">Tack för att du spelade!</p>

    <div class="text-center space-x-4">
      <button class="btn btn-m bg-teal text-white" @click="resetSelectedStore">
        <RouterLink to="/">Start over</RouterLink>
      </button>
      <button class="btn btn-m bg-teal text-white">
        <RouterLink to="/about">Om oss</RouterLink>
      </button>
    </div>
  </div>
</template>
