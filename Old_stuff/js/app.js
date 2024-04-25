import RiksdagensData from "./services/RiksdagensData.js"
import ImageCard from "./components/ImageCard.js";

const app = {
    data() {
        return {
            randomId: undefined,
            listOfIds: [],
            imageUrl: undefined
        }
    },
    methods: {
        async getRandomId() {
            const randomIndex = Math.floor(Math.random() * this.listOfIds.length);
            this.randomId = this.listOfIds[randomIndex];
        }
        ,
        async getImage(randomId) {
            this.imageUrl = await RiksdagensData.fetchImage(randomId);
        }
        ,
        async preload() {
            this.listOfIds = await RiksdagensData.getListOfIds();
        }
    },
    async created() {
        console.log("Hej");
        await this.preload();
        console.log(this.listOfIds);
        await this.getRandomId();
        console.log(this.randomId)
        await this.getImage(this.randomId);
        console.log(this.imageUrl)
    },
   
}


const vueApp = Vue.createApp(app)

vueApp.component('image-card', ImageCard)

// vueApp.component('traffic-message', TrafficMessage)
// vueApp.component('area-select', AreaSelect)

vueApp.mount("#app")