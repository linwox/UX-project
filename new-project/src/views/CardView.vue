<script setup>
import RiksdagensData from '../services/RiksdagensData'
import HelloWorld from '@/components/HelloWorld.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
</script>

<template>
    <header>
      <img alt="politician" class="politician" :src="imageUrl"/>
      <div class="wrapper">
        <HelloWorld msg="Tänk att ta en kaffe med..." />
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
      imageUrl: undefined
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
    async preload() {
      this.listOfIds = await RiksdagensData.getListOfIds()
    }
  },
  async created() {
    await this.preload()
    await this.getRandomId()
    await this.getImage(this.randomId)
  }
}
</script>