import { defineStore } from 'pinia'

export const useSelectedStore = defineStore('selected', {
  state: () => ({
    selectedPersons: new Set(),
  }),
  actions: {
    addSelectedPersonData(firstName, age, party, imageUrl) {
      const person = {firstName, age, party, imageUrl}
      this.selectedPersons.add(person)
    },
  }
})
