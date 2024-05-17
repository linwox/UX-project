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
        'Jämställdhetsminister',
        'Klimatminister',
        'Sjukvårdminister',
        'Kulturminister',
        'Skolminister',
        'Justitieminister',
        'Försvarsminister',
        'Utrikesminister',
        'Migrationsminister',
        'Landsbygdsminister'
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
    handleButtonClick(ministerPost, id) {
      this.setMinister(ministerPost, id)
      this.hideButton(id)
      this.removePost(ministerPost)
      if (this.posts.length === 0) {
        this.$router.push('result')
      }
    }
  }
}
</script>

<template>
  <div class="bg-[url('../assets/headerBakgrund.svg')] bg-cover bg-center h-screen">
    <div class="">
      <div class="flex flex-col justify-end items-center">
        <select
          id="minister_post"
          v-model="ministerPost"
          class="select select-bordered w-54 max-w-xs mt-32 font-semibold text-xl"
        >
          <option disabled>Ministerposter</option>
          <option v-for="post in posts" :key="post" :value="post">{{ post }}</option>
        </select>
      </div>
    </div>

    <div class="flex items-center justify-center mt-3">
      <div class="w-72 carousel rounded-box md:w-1/2 bg-base-100 shadow-xl">
        <div v-for="person of visiblePersons" :key="person.id" class="carousel-item w-full">
          <div v-if="!person.buttonPressed" class="flex flex-col items-center">
            <img :src="person.imageUrl" alt="politician" class="w-72" />
            <div
              class="block align-bottom font-semibold text-xl flex flex-col justify-end items-center"
            >
              {{ person.firstName }} {{ person.age }}
            </div>
            <p class="flex items-center justify-center content-center">
              <button
                class="btn btn-m bg-teal text-white mt-4"
                @click="handleButtonClick(ministerPost, person.id)"
              >
                Välj
              </button>
              <span class="flex items-center justify-center content-center">{{
                person.ministerPost
              }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- </div> -->
      <!-- <div class="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box bg-white">
        <div class="w-72 carousel carousel-center p-4 space-x-4 bg-neutral rounded-box bg-white">
          <div v-for="person of selectedStore.selectedPersons" :key="person" class="carousel-item ml-8 l">
            <div>
              <img :src="person.imageUrl" alt="politician" class="w-72 rounded-box border-2" />
              <div class="block align-bottom font-semibold text-xl flex flex-col justify-end items-center">
                {{ person.firstName }} {{ person.age }}
              </div>
              <p class="flex items-center justify-center content-center">
                <button class="btn btn-m bg-teal text-white mt-4" v-if="!person.buttonPressed"
                  @click="handleButtonClick(ministerPost, person.id)">
                  Välj
                </button>
                <span class="flex items-center justify-center content-center" v-else>{{
                  person.ministerPost
                  }}</span>
              </p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- <RouterLink class="flex items-center justify-center mt-5 font-semibold text-xl" to="/result">Vem är vad?
    </RouterLink> -->
  </div>
</template>
