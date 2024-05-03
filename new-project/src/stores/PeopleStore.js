import { defineStore } from 'pinia'

export const usePeopleStore = defineStore('PeopleStore', {
    state: () => ({
        // Vi skapar en array som går att nå överallt
        selectedIds: []
    }),
    actions: {
        // Vi hämtar arrayen från CardView2 och för över allt i den till den globala arrayen
        updateSelectedIds() {
            CardView2.getSelectedIds()
            .then(selectedIds => {
                selectedIds.forEach(i => this.selectedIds.push(i))
            })
        }
    }
})