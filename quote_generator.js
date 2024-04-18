// Get politicians id number from API based on their first name and last name
async function fetchIntressentId(fNamn, eNamn) {
    const intressentIdUrl = `https://data.riksdagen.se/personlista/?iid=&fnamn=${fNamn}&enamn=${eNamn}&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=`;
    
    const resp = await fetch(intressentIdUrl);

    if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();

    const intressentId = data.personlista.person.intressent_id;

    return intressentId;
}

// Get list of all politicians id numbers
async function getListOfIds() {
    const resp = await fetch(`https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=`);
    const data = await resp.json();
    console.log(data);
    const listOfIds = data.personlista.person.map(person => person.intressent_id);
    return listOfIds;
}

// Generate one random id number
async function randomId() {
    const listOfIds = await getListOfIds();
    const randomIndex = Math.floor(Math.random() * listOfIds.length);
    const idToFetch = listOfIds[randomIndex];

    return idToFetch;
}


// Get list of speeches based on an id number
async function fetchAnforandelistaAsXml(date, intressentId) {
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

// Function to collect URL:s for each speech into array
async function collectAnforandeUrls(anforandeListaXml) {
    const anforandeUrlList = [];
    const anforandeUrlElements = await anforandeListaXml.getElementsByTagName("anforande_url_html");
    
    for (const element of anforandeUrlElements) {
        const url = element.textContent.trim();
        anforandeUrlList.push(url);
    }

    return anforandeUrlList;
}

// Function to get speeches as cleaned text
async function collectAnforandeText(url) {
    // Get speeches as html from API
    const resp = await fetch(url);
    
    if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
    }
    
    const data = await resp.text();
    
    // Clean up the text from html tags
    const strWithoutComments = data.replace(/(<!--.*?-->)/sg, "");
    const strWithoutHTmlTags = strWithoutComments.replace(/(<([^>]+)>)/gi, "");
    const strHtml = strWithoutHTmlTags.replace(/\s+/g, " ");
    
    // Remove meta data for speech
    const regex = /\((\b[A-Z]+\b)\)/;
    const match = strHtml.match(regex);
    
    if (match && match.index !== undefined) {
        const result = strHtml.substring(match.index + match[0].length).trim();
        return result;
    } else {
        console.log("Error cleaning text"); // Hantera bättre!
    }
}

// Function to put cleaned speech texts into array
async function collectAnorandenIntoArray(anforandeUrlList) {
    const anforandeTexts = [];
    
    for (const url of anforandeUrlList) {
        const anforande = await collectAnforandeText(url);
        anforandeTexts.push(anforande);
    }

    return anforandeTexts;
}

// Function to split speeches into sentences
async function speechesToSentences(anforandeTexts) {
    const sentences = [];

    for (const anforande of anforandeTexts) {
        const sentencesPerSpeach = anforande.split(".");
        for (const sentence of sentencesPerSpeach) {
            sentences.push(sentence.trim() + ".");
        }
    }
    
    return sentences;
}

// Politician to search for quotes
const fNamn = "Annika";
const eNamn = "Hirvonen";

// Get id for politician
// const intressentId = await fetchIntressentId(fNamn, eNamn);
const intressentId = await randomId();
console.log(intressentId);

// Limit search result, only results after this date
const date = "2023-04-18";

// Get the list of speeches as XML
const anforandeListaXml = await fetchAnforandelistaAsXml(date, intressentId);

// Get array of URL:s
const anforandeUrlList = await collectAnforandeUrls(anforandeListaXml);

// Put speeches into array
const anforandeTexts = await collectAnorandenIntoArray(anforandeUrlList);


// Put sentences into array
const sentences = await speechesToSentences(anforandeTexts);

// Filter the sentences based on key phrases (or maybe filter speeches in an earlier stage?)
// const keyPhrase = "jag tycker";

// Key phrases to filter by
const keyPhrases = [ "jag tycker", "tycker jag", "jag anser", "anser jag", "jag menar", "menar jag",
                    "enligt min mening", "vi tycker", "tycker vi", "vi anser", "anser vi", "vi menar",
                    "menar vi", "det bör", "bör det", "det måste", "måste det", "vi måste", "måste vi",
                    "lösning", "förändring", "ändras", "förbättras", "det är viktigt att", "det är bra att" ];

// const filteredSentences = sentences.filter(sentence => sentence.toLowerCase().includes(keyPhrase.toLowerCase()));

let filteredSentences = [];

for (const keyPhrase of keyPhrases) {
    const sentenceWithKeyPhrase = sentences.filter(sentence => sentence.toLowerCase().includes(keyPhrase.toLowerCase()));
    filteredSentences = filteredSentences.concat(sentenceWithKeyPhrase);
}

for (const sentence of filteredSentences) {
    console.log(sentence)
}







// Below works only for special case without intressent_id
// async function fetchHtmlUrl(api) {
//         const resp = await fetch(api);
       
//         if (!resp.ok) {
//             throw new Error(`${resp.status} ${resp.statusText}`);
//         }
       
//         const data = await resp.json();

//         // console.log(data.dokumentlista.dokument[0].dokument_url_html);
//         const url_html = data.dokumentlista.dokument[0].dokument_url_html;
//         console.log(url_html);

//         const fullUrlHtml = `https:${url_html}`;
//         return fullUrlHtml;
// }
// // const search = "nooshi+dadgostar+sommarlov";
// const searchTerm = "gängkriminalitet";
// const searchTermEncoded = encodeURIComponent(searchTerm);


// // const api = "https://data.riksdagen.se/dokumentlista/?sok=nooshi+dadgostar+sommarlov&doktyp=&rm=&from=&tom=&ts=&bet=&tempbet=&nr=&org=&iid=&avd=&webbtv=&talare=&exakt=&planering=&facets=&sort=rel&sortorder=desc&rapport=&utformat=json&a=s#soktraff";
// // const url = await fetchHtmlUrl(api);

// const api = `https://data.riksdagen.se/dokumentlista/?sok=${searchTermEncoded}&doktyp=prot&rm=&from=&tom=&ts=&bet=&tempbet=&nr=&org=&iid=${politicianId}&avd=&webbtv=&talare=&exakt=&planering=&facets=&sort=rel&sortorder=desc&rapport=&utformat=json&a=s#soktraff`;
// const url = await fetchHtmlUrl(api);

// async function fetchHtml(url) {
//     const resp = await fetch(url);
   
//     if (!resp.ok) {
//         throw new Error(`${resp.status} ${resp.statusText}`);
//     }
   
//     const data = await resp.text();
    
//     const strWithoutComments = data.replace(/(<!--.*?-->)/sg, "");
//     const strWithoutHTmlTags = strWithoutComments.replace(/(<([^>]+)>)/gi, "");
//     const result = strWithoutHTmlTags.replace(/\s+/g, " ")
    
//     const anforanden = result.split("Anf. ");

//     // const searchTerm = "sommarlov";

//     const filteredAnforanden = anforanden.filter(anforande => anforande.toLowerCase().includes(searchTerm.toLowerCase()));

//     const anforandenNoNumber = filteredAnforanden.map(anforande => anforande.replace(/^\d+\s/, ''));

//     const politicians = [];
    
//     anforandenNoNumber.forEach(anforande => {
//         const name = anforande.substring(0, anforande.indexOf(" ("));
        
//         if (!politicians[name]) {
//             politicians[name] = [];
            
//             politicians[name].push(anforande);
//         }
//         else {
//             politicians[name].push(anforande);
//         }
        
//     });

    
//     Object.entries(politicians).forEach(([name, speeches]) => {
//         console.log(name);
        
//         speeches.forEach(speech => {
//             const regex = /^(.*?)(?:: |replik: |: )(.*)$/;
//             const match = speech.match(regex);
//             let result = match ? match[2] : speech;
            
//             if (result.startsWith("Partiledardebatt ")) {
//                 const startIndex = "Partiledardebatt ".length;
//                 result = result.substring(startIndex);
//             }
            
//             const sentences = result.split(". ");

//             console.log(sentences);


//         });
//     });

    
// }

// fetchHtml(url);