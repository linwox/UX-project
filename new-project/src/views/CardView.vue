<script setup>
import RiksdagensData from '../services/RiksdagensData'
import { useSelectedStore } from '@/stores/selected'
import { useStatsStore } from '@/stores/stats'
import { useChoiceStore } from '@/stores/choice'
import { mapStores } from 'pinia'
import { generateQuote } from '@/lib/QuoteManager.js'
</script>

<template>
  <header>
    <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover h-screen flex justify-center items-center">
      <div class="card w-5/6 md:w-1/2 bg-base-100 shadow-xl">
        <div class="flex justify-center items-center text-xl font-semibold">{{ count }} / 12</div>
        
        <div v-if="choiceStore.choice" class="px-10 pt-10 flex flex-col justify-center items-center w-full h-full">
          <h3 class="card-title p-bottom-4 justify-center items-center text-center">Tänk att ta en kaffe med...</h3>
          <!-- <div class="card-body items-center text-center"> -->
          <img :src="imageUrl" alt="Politician" class="rounded-xl w-full h-full object-cover items-center" />
          <!-- </div> -->
          <p class="text-xl font-semibold justify-center items-center text-center">{{ firstName }} {{ age }}</p>
        </div>

        <div v-else>
          <div class="card-body items-center text-center">
            <h3 class="card-title p-bottom-4">Håller du med om...?</h3>
            <p>{{ quote }}</p>
          </div>
        </div>

        <div class="card-body items-center text-center">
          <div class="card-actions space-x-20 flex justify-center items-center">
            <button @answer="handleAnswer" @click="handleNoClick"
              class="bg-[url('../assets/no_icon.svg')] bg-cover w-14 h-14"></button>
            <button @answer="handleAnswer" @click="handleYesClick"
              class="bg-[url('../assets/yes_icon.svg')] bg-cover w-14 h-14"></button>
          </div>
        </div>
      </div>
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
      quote: undefined,
      politicianData: Object,
      count: 0
    }
  },
  computed: {
    ...mapStores(useSelectedStore, useStatsStore, useChoiceStore)
  },
  methods: {
    async handleYesClick() {
      const index = this.listOfIds.indexOf(this.randomId)
      if (index !== -1) {
        this.listOfIds.splice(index, 1)
      }

      this.count++

      this.selectedStore.addSelectedPersonData(
        this.randomId,
        this.firstName,
        this.age,
        this.party,
        this.imageUrl,
        undefined,
        false
      )
      await this.loadImageAndData()

      this.statsStore.countParty(this.party)
      if (this.selectedStore.selectedPersons.length >= 12) {
        this.$router.push('pick_minister')
      }
    },
    async handleNoClick() {
      await this.loadImageAndData()
    },
    async preload() {
      this.listOfIds = await RiksdagensData.getListOfIds()
    },
    async getRandomId() {
      const randomIndex = Math.floor(Math.random() * this.listOfIds.length)
      this.randomId = this.listOfIds[randomIndex]
    },
    // hämta allt, spara in, plocka därifrån
    async getPoliticianData(randomId) {
      this.politicianData = await RiksdagensData.fetchPoliticianData(randomId)
    },
    async getImage() {
      // return this.politicianData.bild_url_192
      return this.politicianData.bild_url_max
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
    async getGoodQuote(randomId) {
      const quote = await generateQuote(randomId)
      if (quote === null) {
        await this.getRandomId()
        return this.getGoodQuote(this.randomId)
      }

      return quote
    },
    async loadImageAndData() {
      // Hämtar ut ett random id
      await this.getRandomId()

      // Om man valt att välja på citat
      if (!this.choiceStore.choice) {
        // Hämta ut ett citat från id
        this.quote = await this.getGoodQuote(this.randomId)
      }

      await this.getPoliticianData(this.randomId)
      this.imageUrl = await this.getImage()
      this.firstName = await this.getName()
      this.age = await this.getAge()
      this.party = await this.getParty()
    }
  },
  async created() {
    // Preload data
    await this.preload()
    // Load initial image and data
    await this.loadImageAndData()
  }
}
</script>

<!-- <style scoped>
.card {
  max-width: 500px;
  max-width: 100%;
}
</style> -->