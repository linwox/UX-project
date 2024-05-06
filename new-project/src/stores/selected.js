import { defineStore } from 'pinia'

export const useSelectedStore = defineStore('selected', {
  state: () => ({
    selectedPersons: new Set(),
  }),
  actions: {
    addSelectedPersonData(firstName, age, party) {
      const person = {firstName, age, party}
      this.selectedPersons.add(person)
    },
  }
})
