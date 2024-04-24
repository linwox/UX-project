export default {
    name: "RandomId",
    emits: ['random-id'],
    props: {
        ids: Array
    },
    methods: {
        getRandomId() {
            const randomIndex = Math.floor(Math.random() * listOfIds.length);
            const idToFetch = listOfIds[randomIndex];
        }
    }
}