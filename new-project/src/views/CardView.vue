<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import RiksdagensData from '../services/RiksdagensData'
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
import router from '@/router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h3>Tänk att ta en kaffe med...</h3>
      <img alt="politician" id="image" :src="imageUrl" />
      <p>{{ firstName }}</p>
      <p>{{ age }}</p>
      <ButtonComponent @answer="handleAnswer"></ButtonComponent>
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
      party: undefined,
      politicianData: Object
      // selectedIds: []
    }
  },
  components: {
    ButtonComponent
  },
  computed: {
    ...mapStores(useSelectedStore, ['selectedPersons'])
  },
  methods: {
    async preload() {
      this.listOfIds = await RiksdagensData.getListOfIds()
    },
    async getRandomId() {
      const randomIndex = Math.floor(Math.random() * this.listOfIds.length)
      this.randomId = this.listOfIds[randomIndex]
    },
    async getPoliticianData(randomId) {
      this.politicianData = await RiksdagensData.fetchPoliticianData(randomId)
    },
    async getImage() {
      return this.politicianData.bild_url_192
    },
    async getName() {
      return this.politicianData.tilltalsnamn
    },
    async getAge() {
      const yearBorn = this.politicianData.fodd_ar
      const yearNow = 2024
      return yearNow - yearBorn
    },
    async getParty() {
      return this.politicianData.parti
    },
    async loadImageAndData() {
      await this.getRandomId()
      await this.getPoliticianData(this.randomId)
      this.imageUrl = await this.getImage()
      this.firstName = await this.getName()
      this.age = await this.getAge()
      this.party = await this.getParty()
    },
    async handleAnswer(answer) {
      if (answer === 'yes') {
        // Reload image, name, and age
        await this.loadImageAndData()

        // Add randomId to the list
        // Assuming you have a list in your data called `selectedIds`
        // this.selectedIds.push(this.randomId)
        this.selectedStore.addSelectedPersonData(this.firstName, this.age, this.party)
        if (this.selectedStore.selectedPersons.size >= 12) {
          router.push('pick_minister')
        }
      } else if (answer === 'no') {
        // Only reload image, name, and age
        await this.loadImageAndData()
      }
    },
  },
  async created() {
    // Preload data
    await this.preload()
    // Load initial image and data
    await this.loadImageAndData()
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
