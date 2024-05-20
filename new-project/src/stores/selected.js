import { defineStore } from 'pinia'

export const useSelectedStore = defineStore('selected', {
  state: () => ({
    selectedPersons: []
  }),
  actions: {
    addSelectedPersonData(id, firstName, age, party, imageUrl, ministerPost, buttonPressed, logoUrl) {
      const person = { id, firstName, age, party, imageUrl, ministerPost, buttonPressed, logoUrl }
      this.selectedPersons.push(person)
    }
  }
})
