import { defineStore } from 'pinia'

export const useSelectedStore = defineStore('selected', {
  state: () => ({
    selectedPersons: []
  }),
  actions: {
    addSelectedPersonData(id, firstName, age, party, imageUrl, ministerPost) {
      const person = { id, firstName, age, party, imageUrl, ministerPost }
      this.selectedPersons.push(person)
    }
  }
})
