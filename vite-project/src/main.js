import { createApp } from 'vue'

import RiksdagensData from "./services/RiksdagensData.js"

import './style.css'
import App from './App.vue'

// fanns redan
createApp(App).mount('#app')

// inklistrat från vår gamla kod
const vueApp = Vue.createApp(app)
vueApp.component('image-card', ImageCard)
vueApp.mount("#app")