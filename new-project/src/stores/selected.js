import { defineStore } from 'pinia'

export const useSelectedStore = defineStore('selected', {
  state: () => ({
    selectedPersons: new Set(),
  }),
  actions: {
    addSelectedPersonData(id, firstName, age, party, imageUrl) {
      const person = {id, firstName, age, party, imageUrl}
      this.selectedPersons.add(person)
    },
  }
})
