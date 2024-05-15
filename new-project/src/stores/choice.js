import { defineStore } from 'pinia'

export const useChoiceStore = defineStore('choice', {
  state: () => ({
    choice: true
  }),
  actions: {
    makeChoice(choice) {
      this.choice = choice
    }
  }
})
