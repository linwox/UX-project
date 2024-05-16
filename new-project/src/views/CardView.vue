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
    <div
      class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg-center h-screen flex justify-center items-center"
    >
      <div class="card w-5/6 md:w-1/2 bg-base-100 shadow-xl">
        <figure v-if="choiceStore.choice" class="px-10 pt-10 flex justify-center items-center w-full h-full">
          <div class="card-body items-center text-center">
            <h3 class="card-title p-bottom-4">Tänk att ta en kaffe med...</h3>
            <img :src="imageUrl" alt="Politician" class="rounded-xl w-full h-full object-cover" />
            <p>{{ firstName }} {{ age }}</p>
          </div>
        </figure>

        <div v-else>
          <div class="card-body items-center text-center">
            <h3 class="card-title p-bottom-4">Håller du med om...?</h3>
            <p>{{ quote }}</p>
          </div>
        </div>

        <div class="card-body items-center text-center">
          <div class="card-actions">
            <button @answer="handleAnswer" @click="handleYesClick" class="btn btn-primary">
              Ja
            </button>
            <button @answer="handleAnswer" @click="handleNoClick" class="btn btn-secondary">
              Nej
            </button>
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
      politicianData: Object
    }
  },
  computed: {
    ...mapStores(useSelectedStore, useStatsStore, useChoiceStore)
  },
  methods: {
    async handleYesClick() {
      if (this.selectedStore.selectedPersons.includes(this.randomId)) {
        const index = this.listOfIds.indexOf(this.randomId)
        if (index !== -1) {
          this.listOfIds.splice(index, 1)
        }
      }

      this.selectedStore.addSelectedPersonData(
        this.randomId,
        this.firstName,
        this.age,
        this.party,
        this.imageUrl,
        undefined,
        false
      )
      // this.$emit('answer', 'yes') // Emit 'yes' when Yes button is clicked
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
    async getQuote() {
      this.quote = await generateQuote(this.randomId)
      return this.quote
    },
    async loadImageAndData() {
      await this.getRandomId()
      await this.getPoliticianData(this.randomId)
      this.imageUrl = await this.getImage()
      this.firstName = await this.getName()
      this.age = await this.getAge()
      this.party = await this.getParty()
      this.quote = await this.getQuote()
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

<style scoped>
.card {
  max-width: 500px;
}
</style>