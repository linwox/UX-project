<script setup>
import { useSelectedStore } from '@/stores/selected'
import { useStatsStore } from '@/stores/stats';
import { mapStores } from 'pinia'
</script>

<script>
export default {
  computed: {
    ...mapStores(useSelectedStore, useStatsStore)
  },
  methods: {
    resetSelectedStore() {
      this.selectedStore.selectedPersons = []
      this.$router.push('/')

      this.statsStore.v_count = 0
      this.statsStore.s_count = 0
      this.statsStore.mp_count = 0
      this.statsStore.l_count = 0
      this.statsStore.c_count = 0
      this.statsStore.kd_count = 0
      this.statsStore.m_count = 0
      this.statsStore.sd_count = 0
      
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
