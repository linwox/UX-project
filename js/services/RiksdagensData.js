export default {

    async randomId() {
        const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=`);

        if (!resp.ok) {
            throw new Error(resp.statusText)
        }

        const data = await resp.json();
        
        const listOfIds = data.personlista.person.map(person => person.intressent_id);

        const randomIndex = Math.floor(Math.random() * listOfIds.length);
        const idToFetch = listOfIds[randomIndex];

        return idToFetch;
    },

    async fetchAnforandelistaAsXml(date, intressentId) {
        const anforandeSearchUrl = `https://data.riksdagen.se/anforandelista/?rm=&anftyp=Nej&d=${date}&ts=&parti=&iid=${intressentId}&sz=50&utformat=xml`;

        const resp = await fetch(anforandeSearchUrl);

        if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
        }

        const data = await resp.text();

        const parser = new DOMParser();

        const result = parser.parseFromString(data, "application/xml");

        return result;
    }

    // async getAllTrafficAreas() {
    //     const resp = await fetch(`${this.baseUrl}/traffic/areas?format=json&size=100`)
    //     if (!resp.ok) {
    //         throw new Error(resp.statusText)
    //     }

    //     const data = await resp.json()
    //     return data?.areas ?? []
    // },

    // async getTrafficArea(latitude, longitude) {
    //     const resp = await fetch(`${this.baseUrl}/traffic/areas?latitude=${latitude}&longitude=${longitude}&format=json`)
    //     if (!resp.ok) {
    //         throw new Error(resp.statusText)
    //     }

    //     const data = await resp.json()
    //     return data?.area?.name ?? "Göteborg"
    // },

    // async getMessages(area) {
    //     const resp = await fetch(`${this.baseUrl}/traffic/messages?trafficareaname=${area}&format=json`)
    //     if (!resp.ok) {
    //         throw new Error(resp.statusText)
    //     }

    //     const data = await resp.json()
    //     return data?.messages ?? []
    // }
}