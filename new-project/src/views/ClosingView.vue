<script setup>
import { useSelectedStore } from '@/stores/selected'
import { useStatsStore } from '@/stores/stats'
import { mapStores } from 'pinia'
</script>

<template>
  <div
    class="bg-[url('../assets/closing.svg')] md:bg-[url('../assets/headerBakgrund.svg')] bg-cover h-screen flex flex-col justify-end items-center pb-52 space-y-20 relative"
  >
  
  <img src="../assets/confetti.gif" alt="confetti" class="z-10 absolute inset-30">
  <img src="../assets/tack.svg" alt="tack" class="z-0 relative">
  
  <div class="text-center space-x-4 relative z-20">
      <button class="btn btn-lg bg-teal text-white w-30" @click="resetSelectedStore">
        Till start
      </button>
      <button class="btn btn-lg bg-teal text-white w-30" @click="$router.push('about')">
        Om oss
      </button>
    </div>
  </div>
</template>

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
