<script setup>
import { useSelectedStore } from '@/stores/selected'
import { mapStores } from 'pinia'
import { getHatPath } from '@/lib/HatMapping'
</script>

<template>
  <div
    class="bg-[url('../assets/headerBakgrund.svg')] bg-cover h-screen flex justify-center items-center md:bg-[url('../assets/bakgrundwebb.svg')] pb-40"
  >
    <div class="flex flex-col justify-center items-center h-screen space-y-4">
      <div class="flex flex-col h-screen w-screen justify-center items-center gap-5">
        <select
          id="minister_post"
          v-model="ministerPost"
          class="select select-bordered w-54 max-w-xs mt-32 font-semibold text-xl"
        >
          <option disabled>Ministerposter</option>
          <option v-for="post in posts" :key="post" :value="post">{{ post }}</option>
        </select>

        <div
          class="carousel relative w-80 h-2/3 md:w-96 rounded-box bg-base-100 shadow-xl border-slate border-2"
        >
          <div
            v-for="person of visiblePersons"
            :key="person.id"
            class="carousel-item w-full flex flex-col items-center justify-center relative"
          >
            <div
              v-if="!person.buttonPressed"
              class="w-full h-full flex flex-col items-center justify-center"
            >
              <img
                :src="person.imageUrl"
                alt="Politician"
                class="w-full h-full object-cover absolute top-0 left-0 rounded-2xl z-0"
              />
              <div
                class="w-full h-72 bg-gradient-to-t from-black via-transparent absolute bottom-0 left-0 right-0 rounded-2xl z-10"
              ></div>
              <p class="text-3xl text-white font-bold absolute bottom-28 left-8 z-20">
                {{ person.firstName }} {{ person.age }}
              </p>

              <div class="flex items-end justify-center absolute bottom-6 left-6 right-6 z-20">
                <div class="card-actions space-x-36 flex justify-center">
                  <button
                    @click="handleButtonClick(person.id)"
                    class="bg-[url('../assets/yes_icon.svg')] bg-cover w-14 h-14"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ministerPost: 'Statsminister',
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
    setMinister(ministerPost, id) {
      const index = this.selectedStore.selectedPersons.findIndex((obj) => obj.id === id)
      const person = this.selectedStore.selectedPersons[index]
      person.ministerPost = ministerPost
    },
    setHat(id) {
      const index = this.selectedStore.selectedPersons.findIndex((obj) => obj.id === id)
      const person = this.selectedStore.selectedPersons[index]
      const ministerPost = person.ministerPost
      person.hat = getHatPath(ministerPost)
    },
    getMinisterPostValue() {
      const e = document.getElementById('minister_post')
      const value = e.value
      return value
    },
    hideButton(id) {
      const index = this.selectedStore.selectedPersons.findIndex((obj) => obj.id === id)
      this.selectedStore.selectedPersons[index].buttonPressed = true
    },
    removePost(ministerPost) {
      const index = this.posts.indexOf(ministerPost)
      this.posts.splice(index, 1)
      this.ministerPost = this.posts[0] || undefined
    },
    handleButtonClick(personId) {
      const ministerPost = this.getMinisterPostValue()
      this.setMinister(ministerPost, personId)
      this.hideButton(personId)
      this.removePost(ministerPost)
      this.setHat(personId)
      if (this.posts.length === 0) {
        this.$router.push('result')
      }
    }
  }
}
</script>
