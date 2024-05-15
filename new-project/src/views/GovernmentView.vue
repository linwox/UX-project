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
  <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg-center h-screen">
    <h2>Regeringen!</h2>
    <div>Alla har roliga hattar!</div>
    <div class="grid grid-cols-3 gap-2 p-1">
      <div v-for="person of selectedStore.selectedPersons" :key="person.id">
        <label class="swap swap-flip text-9xl">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" />

          <div class="swap-off">
            <div class="card w-28 h-36 bg-base-100 shadow-xl">
              <img :src="person.imageUrl" alt="Politician" class="p-2 rounded-2xl" />
            </div>
          </div>

          <div class="swap-on">
            <div class="card w-28 h-36 bg-base-100 shadow-xl">
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
    <RouterLink to="/closing">Klar!</RouterLink>
    <!-- <RouterLink to="/" @click="resetSelectedStore">Start over</RouterLink>  -->
  </div>
</template>
