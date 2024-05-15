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
    class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg-center h-screen flex flex-col justify-end items-center pb-60">

    <p>Här ska det in en annan bild från Figma.<br>Adam, hjälp...</p>

      <div class="text-center">
        <RouterLink to="/about">Om oss</RouterLink>
        <RouterLink to="/" @click="resetSelectedStore">Start over</RouterLink>
      </div>
    </div>
</template>
