import { defineStore } from 'pinia'
import { list } from 'postcss'
import { ref } from 'vue'
import { reactive } from 'vue'

export const useSelectedStore = defineStore('selected', {
  state: () => ({
    selectedPersons: ([])
  }),
  actions: {
    addSelectedPersonData(id, firstName, age, party, imageUrl) {
      const person = { id, firstName, age, party, imageUrl }
      this.selectedPersons.push(person)
    }
  }
})
