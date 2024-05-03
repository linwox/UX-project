import { defineStore } from 'pinia'

export const usePeopleStore = defineStore('PeopleStore', {
state: () => ({
count: 0
}),
})