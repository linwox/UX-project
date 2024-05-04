import { defineStore } from 'pinia'

export const useSelectedStore = defineStore('selected', {
  state: () => ({
    // Vi skapar en array som går att nå överallt
    selectedIds: []
  }),
  actions: {
    // Vi hämtar arrayen från CardView och för över allt i den till den globala arrayen
    updateSelectedIds() {
      CardView.getSelectedIds().then((selectedIds) => {
        selectedIds.forEach((i) => this.selectedIds.push(i))
      })
    }
  }
})
