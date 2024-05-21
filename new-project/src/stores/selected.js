import { defineStore } from 'pinia'

export const useSelectedStore = defineStore('selected', {
  state: () => ({
    selectedPersons: []
  }),
  actions: {
    addSelectedPersonData(
      id,
      firstName,
      age,
      party,
      imageUrl,
      ministerPost,
      buttonPressed,
      logoUrl,
      hat
    ) {
      const person = { id, firstName, age, party, imageUrl, ministerPost, buttonPressed, logoUrl, hat }
      this.selectedPersons.push(person)
    }
  }
})
