export default {
  async getListOfIds() {
    const resp = await fetch(
      `https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=`
    )

    if (!resp.ok) {
      throw new Error(resp.statusText)
    }

    const data = await resp.json()

    const listOfIds = data.personlista.person.map((person) => person.intressent_id)

    return listOfIds
  },

  async fetchPoliticianData(idToFetch) {
    const resp = await fetch(
      `https://data.riksdagen.se/personlista/?iid=${idToFetch}&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=`
    )
    const data = await resp.json()

    return data.personlista.person
  },

  async fetchAnforandelistaAsXml(date, intressentId) {
    const anforandeSearchUrl = `https://data.riksdagen.se/anforandelista/?rm=&anftyp=Nej&d=${date}&ts=&parti=&iid=${intressentId}&sz=50&utformat=xml`

    const resp = await fetch(anforandeSearchUrl)

    if (!resp.ok) {
      throw new Error(`${resp.status} ${resp.statusText}`)
    }

    const data = await resp.text()

    const parser = new DOMParser()

    const result = parser.parseFromString(data, 'application/xml')

    return result
  },

  async fetchSpeechesAsHtml(url) {
    const resp = await fetch(url)

    if (!resp.ok) {
      throw new Error(`${resp.status} ${resp.statusText}`)
    }

    const data = await resp.text()

    return data
  }
}
