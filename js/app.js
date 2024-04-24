import SverigesRadio from "./services/SverigesRadio.js"
import TrafficMessage from "./components/TrafficMessage.js"
import AreaSelect from "./components/AreaSelect.js"

const app = {
    data() {
        return {
            // latitude: undefined,
            // longitude: undefined,
            // area: undefined,
            // messages: [],
            // allAreas: undefined,
        }
    },
    methods: {
        async areaSelected(area) {
            this.messages = await SverigesRadio.getMessages(area)
        }
    },
    async created() {
        if (!navigator.geolocation) {
            this.allAreas = await SverigesRadio.getAllTrafficAreas()
        } else {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    this.latitude = position.coords.latitude
                    this.longitude = position.coords.longitude
                    this.area = await SverigesRadio.getTrafficArea(this.latitude, this.longitude)
                    this.messages = await SverigesRadio.getMessages(this.area)
                },
                async () => { 
                    this.allAreas = await SverigesRadio.getAllTrafficAreas()
                })
        }
    }
}

const vueApp = Vue.createApp(app)

vueApp.component('traffic-message', TrafficMessage)
vueApp.component('area-select', AreaSelect)

vueApp.mount("#app")