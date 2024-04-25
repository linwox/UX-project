const imageUrl = data.personlista.person.bild_url_192;
const name = data.personlista.person.tilltalsnamn;
const year = data.personlista.person.fodd_ar;
const age = (2024 - year);
const party = data.personlista.person.parti;

document.getElementById('image').innerHTML = '';
document.getElementById('name').innerHTML = '';

const imageElement = document.createElement('img');
imageElement.src = imageUrl;
document.getElementById('image').prepend(imageElement);
document.getElementById('name').prepend(name + " " + age);