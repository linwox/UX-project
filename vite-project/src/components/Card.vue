<script setup>
import RiksdagensData from "./services/RiksdagensData.js";
</script>

<template>
    
    <div id="card">
        <div id="image" class="image"></div>
        <p id="name"></p>
        <nav>
            <ul>
                <li><button id="ja">Ja</button></li>
                <li><button id="nej">Nej</button></li>
            </ul>
        </nav>
     </div>

</template>

<script>
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

    if (saveToList) {
        choosenPeople.push({ name: name, age: age, imageUrl: imageUrl, party: party });
        
        if (choosenPeople.length = 12){
            console.log(choosenPeople);
        }
    }
    </script>

    <style scoped>
         #card {
            display: flexbox;
            align-items: center;
            justify-content: center;
            width: 14rem;
            margin: auto;
            margin-top: 10rem;
            border: 3px solid black;
            border-radius: 10px;
        }

        #image {
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        #name {
            text-align: center;
            font-size: 200%;
            font-family:  Courier, monospace;
            margin: auto;
        }

        #ja {
            padding: 0.5rem;
            width: 3rem;
           
        }

        #nej {
           padding: 0.5rem;
            margin-right: 1rem;
            margin-left: 3rem;
            width: 3rem;
        }
        
        p :last-child {
            margin-left: auto;
        }

        p :first-child{
            margin-right: auto;
        }

        ul{
            list-style: none;
        }

        li {
            display: inline-block;
        }
        
    </style>