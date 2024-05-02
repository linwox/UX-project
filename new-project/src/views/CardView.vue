<script setup>
import RiksdagensData from '../services/RiksdagensData'
import ButtonComponent from '@/components/ButtonComponent.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <h3>Tänk att ta en kaffe med...</h3>
      <img alt="politician" id="image" :src="imageUrl" />
      <p>{{ firstName }}</p>
      <p>{{ age }}</p>
      <ButtonComponent></ButtonComponent>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      randomId: undefined,
      listOfIds: [],
      imageUrl: undefined,
      firstName: undefined,
      age: undefined
    }
  },
  methods: {
    async getRandomId() {
      const randomIndex = Math.floor(Math.random() * this.listOfIds.length)
      this.randomId = this.listOfIds[randomIndex]
    },
    async getImage(randomId) {
      this.imageUrl = await RiksdagensData.fetchImage(randomId)
    },
    async getName(randomId) {
      this.firstName = await RiksdagensData.fetchFirstName(randomId)
    },
    async getAge(randomId) {
      const yearBorn = await RiksdagensData.fetchAge(randomId)
      const yearNow = 2024
      this.age = yearNow - yearBorn
    },
    async preload() {
      this.listOfIds = await RiksdagensData.getListOfIds()
    }
  },
  async created() {
    await this.preload()
    await this.getRandomId()
    await this.getImage(this.randomId)
    await this.getName(this.randomId)
    await this.getAge(this.randomId)
  }
}
</script>

<style scoped>
.wrapper {
  padding: 1rem;
  display: flexbox;
  align-items: center;
  justify-content: center;
  width: 14rem;
  margin: auto;
  margin-top: 10rem;
  border: 3px solid black;
  border-radius: 10px;
}

#image {
  align-items: center;
  justify-content: center;
  text-align: center;
}

#name {
  text-align: center;
  font-size: 200%;
  font-family: Courier, monospace;
  margin: auto;
}

</style>
