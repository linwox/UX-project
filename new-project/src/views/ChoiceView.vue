<script setup>
import { useChoiceStore } from '@/stores/choice'
import { mapStores } from 'pinia'
</script>

<template>
  <div
    class="bg-[url('../assets/headerBakgrund.svg')] bg-cover h-screen flex items-center justify-center"
  >
    <div class="text-center">
      <p class="text-3xl mb-10">
        Välj din regering utifrån <br />
        bilder eller citat
      </p>
      <p></p>
      <div class="space-x-10">
        <button class="btn btn-lg bg-teal text-white w-24" @click="handleImageClick">Bilder</button>
        <button class="btn btn-lg bg-teal text-white w-24" @click="handleQuoteClick">Citat</button>
      </div>
      <p class="text-lg mt-10">
        Din regering kommer att bestå <br />
        av 12 medlemmar
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    ...mapStores(useChoiceStore)
  },
  methods: {
    handleImageClick() {
      this.choiceStore.choice = true
      this.$router.push('card')
    },
    handleQuoteClick() {
      this.choiceStore.choice = false
      this.$router.push('card')
    }
  }
}
</script>
<!-- 
<style>
.main {
  width: 30rem;
  height: 40rem;
  border: 1px solid black;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

p {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: 600;
  font-size: larger;
}

.choice {
  width: 10rem;
  height: 5rem;
  font-family: Helvetica, sans-serif;
  font-weight: 600;
  font-size: x-large;
  margin-top: 3rem;
}
</style> -->
