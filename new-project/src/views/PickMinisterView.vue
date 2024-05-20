<script setup>
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
</script>

<script>
export default {
  data() {
    return {
      ministerPost: 'Statsminister', // Set the default selected post
      posts: [
        'Statsminister',
        'Finansminister',
        'Partyminister',
        'Klimatminister',
        'Sjukvårdminister',
        'Kulturminister',
        'Skolminister',
        'Justitieminister',
        'Försvarsminister',
        'Utrikesminister',
        'Kompisminister',
        'Semesterminister'
      ]
    }
  },
  computed: {
    ...mapStores(useSelectedStore),
    visiblePersons() {
      return this.selectedStore.selectedPersons.filter((person) => !person.buttonPressed)
    }
  },
  methods: {
    selectMinister() {
      const things = document.getElementsByClassName('carousel-item')
      for (const elem of things) {
        console.log(elem.getBoundingClientRect(), elem.dataset.item)
      }
    },
    setMinister(ministerPost, id) {
      const index = this.selectedStore.selectedPersons.findIndex((obj) => obj.id === id)
      this.selectedStore.selectedPersons[index].ministerPost = ministerPost
    },
    getMinisterPostValue() {
      const e = document.getElementById('minister_post')
      const value = e.value
      return value
    },
    getMinisterPostText() {
      const e = document.getElementById('minister_post')
      const text = e.target.options[e.target.selectedIndex].text
      return text
    },
    hideButton(id) {
      // Set buttonPressed to true for the specific person
      const index = this.selectedStore.selectedPersons.findIndex((obj) => obj.id === id)
      this.selectedStore.selectedPersons[index].buttonPressed = true
    },
    removePost(ministerPost) {
      const index = this.posts.indexOf(ministerPost)
      this.posts.splice(index, 1)
      // Set ministerPost to the next available option if exists, otherwise set it to undefined
      this.ministerPost = this.posts[0] || undefined
    },

    handleButtonClick(personId) {
      const ministerPost = this.getMinisterPostValue()
      this.setMinister(ministerPost, personId)
      this.hideButton(personId)
      this.removePost(ministerPost)
      if (this.posts.length === 0) {
        this.$router.push('result')
      }
    }
  }
}
</script>

<template>
  <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover h-screen flex justify-center items-center md:bg-[url('../assets/bakgrundwebb.svg')]">
    <div class="flex flex-col justify-center items-center h-screen space-y-4">
      <!-- <details class="collapse bg-base-200 mt-28">
        <summary class="collapse-title text-s font-medium">Info</summary>
        <div class="collapse-content">
          <p>Välj ministerpost i menyn och scrolla fram vem som ska ha posten.</p>
        </div>
      </details> -->

      <div class="flex flex-col h-screen w-screen justify-center items-center gap-5">
        <select id="minister_post" v-model="ministerPost"
          class="select select-bordered w-54 max-w-xs mt-32 font-semibold text-xl">
          <option disabled>Ministerposter</option>
          <option v-for="post in posts" :key="post" :value="post">{{ post }}</option>
        </select>

        <div class="carousel relative w-80 h-2/3 md:w-80 rounded-box bg-base-100 shadow-xl border-slate border-2">
          <div v-for="person of visiblePersons" :key="person.id"
            class="carousel-item w-full flex flex-col items-center justify-center relative">
            <div v-if="!person.buttonPressed" class="w-full h-full flex flex-col items-center justify-center">
              <img :src="person.imageUrl" alt="Politician"
                class="w-full h-full object-cover absolute top-0 left-0 rounded-2xl z-0" />
              <div
                class="w-full h-72 bg-gradient-to-t from-black via-transparent absolute bottom-0 left-0 right-0 rounded-2xl z-10">
              </div>
              <p class="text-3xl text-white font-bold absolute bottom-28 left-8 z-20">
                {{ person.firstName }} {{ person.age }}
              </p>

              <div class="flex items-end justify-center absolute bottom-6 left-6 right-6 z-20">
                <div class="card-actions space-x-36 flex justify-center">
                  <button @click="handleButtonClick(person.id)"
                    class="bg-[url('../assets/pick_icon.svg')] bg-cover w-14 h-14"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
