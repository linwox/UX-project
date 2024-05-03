<script setup>
import ButtonComponent2 from '@/components/ButtonComponent2.vue'
import RiksdagensData from '../services/RiksdagensData'
</script>

<template>
  <header>
    <div class="wrapper">
      <div>Ett tokigt citat</div>
      <ButtonComponent2 @answer="handleAnswer"></ButtonComponent2>
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
      politicianData: Object,
      selectedIds: []
    }
  },
  components: {
    ButtonComponent2
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
    },

    async loadImageAndData() {
      await this.getRandomId()
      await this.getPoliticianData(this.randomId)
      this.imageUrl = await this.getImage()
      this.firstName = await this.getName()
      this.age = await this.getAge()
    },
    async handleAnswer(answer) {
      if (answer === 'yes') {
        // Reload image, name, and age
        await this.loadImageAndData()

        // Add randomId to the list
        // Assuming you have a list in your data called `selectedIds`
        this.selectedIds.push(this.randomId)
        console.log(this.randomId)
      } else if (answer === 'no') {
        // Only reload image, name, and age
        await this.loadImageAndData()
      }
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
