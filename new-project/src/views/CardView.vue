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
      <div class="flex flex-col justify-center items-center h-screen space-y-4">


        <div v-if="choiceStore.choice" class="flex flex-col h-screen w-screen justify-center items-center gap-5">

          <h3 class="text-2xl font-semibold">Tänk att ta en kaffe med...</h3>

          <div class="card relative w-80 h-2/3 md:w-1/2 flex flex-col shadow-xl border-slate border-2">

            <div v-if="loading" class="flex justify-center items-center w-full h-full">
              <span class="loading loading-dots loading-lg"></span>
            </div>

            <div v-else>

              <p class="text-3xl text-white font-bold absolute bottom-28 left-8 z-20">
                {{ firstName }} {{ age }}
              </p>

              <div
                class="w-full h-72 bg-gradient-to-t from-black via-transparent absolute bottom-0 left-0 right-0 rounded-2xl z-10">
              </div>

              <img :src="imageUrl" alt="Politician"
                class="w-full h-full object-cover absolute top-0 left-0 rounded-2xl z-0" />

            </div>


            <div class="flex items-end justify-center absolute bottom-6 left-6 right-6 z-20">
              <div class="card-actions space-x-36 flex justify-center">
                <button @answer="handleAnswer" @click="handleNoClick"
                  class="bg-[url('../assets/no_icon.svg')] bg-cover w-14 h-14"></button>
                <button @answer="handleAnswer" @click="handleYesClick"
                  class="bg-[url('../assets/yes_icon.svg')] bg-cover w-14 h-14"></button>
              </div>
            </div>

          </div>

          <div class="text-xl font-semibold">{{ count }} / 12</div>

        </div>

        <div v-else class="flex flex-col h-screen w-screen justify-center items-center gap-5">
          <h3 class="text-2xl font-semibold">Håller du med om...?</h3>

          <div
            class="card relative w-80 h-2/3 md:w-1/2 flex flex-col justify-center items-center shadow-xl border-slate border-2">
            <div v-if="loading" class="flex justify-center items-center w-full h-full">
              <span class="loading loading-dots loading-lg"></span>
            </div>

            <p v-else class="text-2xl text-black font-semibold p-8 text-center">{{ quote }}</p>

            <div class="flex items-end justify-center absolute bottom-6 left-6 right-6 z-20">
              <div class="card-actions space-x-36 flex justify-center">
                <button @answer="handleAnswer" @click="handleNoClick"
                  class="bg-[url('../assets/no_icon.svg')] bg-cover w-14 h-14"></button>
                <button @answer="handleAnswer" @click="handleYesClick"
                  class="bg-[url('../assets/yes_icon.svg')] bg-cover w-14 h-14"></button>
              </div>
            </div>
          </div>

          <div class="text-xl font-semibold">{{ count }} / 12</div>
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
      count: 0,
      loading: true // New loading state
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

    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async loadImageAndData() {
      this.loading = true // Start loading

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

      await this.delay(500) // 500ms delay
      this.loading = false // End loading
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
