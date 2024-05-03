import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)



// HAMPUS EXEMPEL (här anropas updateEvents-metoden):
// const app = {
//     computed: {
//         ...Pinia.mapStores(useEventsStore)
//     },
//     components: {
//         HighestSeverity,
//         EventList,
//         SeverityCount
//     },
//     created() {
//         this.eventsStore.updateEvents()
//     }
// }




app.use(router)
app.use(createPinia())

app.mount('#app')
