import { defineStore } from 'pinia'

export const useSelectedStore = defineStore('selected', {
  state: () => ({
    selectedPersons: []
  }),
  actions: {
    addSelectedPersonData(id, firstName, age, party, imageUrl, ministerPost, buttonPressed) {
      const person = { id, firstName, age, party, imageUrl, ministerPost, buttonPressed }
      this.selectedPersons.push(person)
    }
  }
})
