<script setup>
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
import { useStatsStore } from '@/stores/stats'
</script>

<script>
export default {
  computed: {
    ...mapStores(useSelectedStore, ['selectedPersons'])
  }
}
</script>

<template>
  
    <h2>Ministerpost</h2>
    <div>Välj vem som ska ha posten</div>

    <div class="ml-14 w-72 carousel carousel-center p-4 space-x-4 bg-neutral rounded-box bg-white">
    <div v-for="person of selectedStore.selectedPersons" class="carousel-item">
      <div>
        <img v-bind:src="person.imageUrl" class="rounded-box border-2" />
        <div class="block align-bottom">{{ person.firstName }} {{ person.age}}</div>
        <p class="content-center"> 
           <button class="p-2 rounded border-2">Välj</button> 
        </p>
      </div>
      </div>

    </div>

<div>

  <RouterLink to="/government">Se din regering</RouterLink>
</div>

  
</template>

<!-- <style>
.main {
  width: 30rem;
  height: 40rem;
  border: 1px solid black;
  padding: 1rem;
}
</style> -->
