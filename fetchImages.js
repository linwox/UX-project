async function fetchImageWithName(fName, lName) {
    const api = `https://data.riksdagen.se/personlista/?iid=&fnamn=${fName}&enamn=${lName}&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=`;

    const resp = await fetch(api);

    if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();

    const imageUrl = data.personlista.person.bild_url_192;

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    document.getElementById('image').prepend(imageElement);
}

await fetchImageWithName("Nooshi", "Dadgostar");
await fetchImageWithName("Jimmie", "Åkesson")
await fetchImageWithName("Magdalena", "Andersson")


// Dessa går INTE att hämta med namn!
// await fetchImageWithName("Ulf", "Kristersson")
// await fetchImageWithName("Ebba", "Busch")
// await fetchImageWithName("Parisa", "Liljestrand")


// Denna metod skriver ut alla namn som går att hämta med namn (inte Busch, Åkesson, mfl...)
async function getListOfPersons() {

    const resp = await fetch("https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=")

    const data = await resp.json();

    const listOfNames = []

    data.personlista.person.forEach(person => {
        const fullName = person.tilltalsnamn + " " + person.efternamn;
        listOfNames.push(fullName);
    });

    listOfNames.forEach(person => {
        console.log(person)
        
    })

}

// getListOfPersons()

// Denna metod lägger in namn i en map med tillhörande id. Fortfarande utan Ebba o Ulf dock...
async function nameToIdMap(name) {
    const resp = await fetch("https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=");

    const data = await resp.json();

    const map = new Map();

    data.personlista.person.forEach(person => {
        const fullName = person.tilltalsnamn + " " + person.efternamn;
        const id = person.sourceid;
        map.set(fullName, id);
    })

    const personId = map.get(name);

    return personId;
}

console.log("Maggans id: " + await nameToIdMap('Magdalena Andersson'))

// Onödig metod som behöver utvecklas.
async function fetchImageWithId(name) {
    const idToFetch = await nameToIdMap(name)

    const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=${idToFetch}&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=`);

    const data = await resp.json();

    const imageUrl = data.personlista.person.bild_url_192;

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    document.getElementById('image').prepend(imageElement);

}

// fetchImageWithId('Magdalena Andersson')
// fetchImageWithId('Ebba Busch')
