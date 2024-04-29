<script setup>
import Card from './components/Card.vue'

import RiksdagensData from "./services/RiksdagensData.js"

</script>

<script>
export default {
  data() {
    return {
      randomId: undefined,
      listOfIds: [],
      imageUrl: undefined
    }
  },
  methods: {
    async getRandomId() {
      const randomIndex = Math.floor(Math.random() * this.listOfIds.length);
      this.randomId = this.listOfIds[randomIndex];
    }
    ,
    async getImage(randomId) {
      this.imageUrl = await RiksdagensData.fetchImage(randomId);
    }
    ,
    async preload() {
      this.listOfIds = await RiksdagensData.getListOfIds();
    }
  },
  async created() {
    await this.preload();
    console.log(this.listOfIds);
    await this.getRandomId();
    console.log(this.randomId)
    await this.getImage(this.randomId);
    console.log(this.imageUrl)
  },

}
</script>

<!-- Allt vi hade i app-diven -->
<template>
  <Card></Card>
</template>

<style scoped>

</style>