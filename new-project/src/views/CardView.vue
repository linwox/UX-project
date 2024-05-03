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
      age: undefined,
      politicianData: Object
    }
  },
  methods: {
    async getRandomId() {
      const randomIndex = Math.floor(Math.random() * this.listOfIds.length)
      this.randomId = this.listOfIds[randomIndex]
    },
    async getImage() {
      return this.politicianData.bild_url_192
    },
    async getName(randomId) {
      return this.politicianData.tilltalsnamn
    },
    async getAge(randomId) {
      const yearBorn = this.politicianData.fodd_ar
      const yearNow = 2024
      return yearNow - yearBorn
    },
    async getPoliticianData(randomId) {
      this.politicianData = await RiksdagensData.fetchPoliticianData(randomId)
    },
    async preload() {
      this.listOfIds = await RiksdagensData.getListOfIds()
    }
  },
  async created() {
    await this.preload()
    await this.getRandomId()
    await this.getPoliticianData(this.randomId)
    this.imageUrl = await this.getImage()
    this.firstName = await this.getName()
    this.age = await this.getAge()
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
