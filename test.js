async function fetchHtmlUrl(api) {
        const resp = await fetch(api);
       
        if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
        }
       
        const data = await resp.json();

        // console.log(data.dokumentlista.dokument[0].dokument_url_html);
        const url_html = data.dokumentlista.dokument[0].dokument_url_html;
        console.log(url_html);

        const fullUrlHtml = `https:${url_html}`;
        return fullUrlHtml;
}

const api = "https://data.riksdagen.se/dokumentlista/?sok=%22bristande+vandel%22&doktyp=&rm=&from=&tom=&ts=&bet=&tempbet=&nr=&org=&iid=&avd=&webbtv=&talare=&exakt=&planering=&facets=&sort=rel&sortorder=desc&rapport=&utformat=json&a=s#soktraff";

const url = fetchHtmlUrl(api);

async function fetchHtml(url) {
    const resp = await fetch(url);
   
    if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
    }
   
    const data = await resp.text();

    console.log(data);

}

fetchHtml(url);