<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import RiksdagensData from '../services/RiksdagensData'
import { useSelectedStore } from '@/stores/selected'
import { useStatsStore } from '@/stores/stats'
import { mapStores } from 'pinia'
import router from '@/router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h3>Håller du med om...?</h3>
      <p>{{ quote }}</p>
      <ButtonComponent @answer="handleAnswer"></ButtonComponent>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      randomId: undefined,
      listOfIds: [],
      imageUrl: undefined,
      firstName: undefined,
      age: undefined,
      party: undefined,
      quote: undefined,
      politicianData: Object
    }
  },
  components: {
    ButtonComponent
  },
  computed: {
    ...mapStores(useSelectedStore, useStatsStore)
  },
  methods: {
    async preload() {
      this.listOfIds = await RiksdagensData.getListOfIds()
    },

    async getRandomId() {
      const randomIndex = Math.floor(Math.random() * this.listOfIds.length)
      this.randomId = this.listOfIds[randomIndex]
    },

    async getPoliticianData(randomId) {
      this.politicianData = await RiksdagensData.fetchPoliticianData(randomId)
    },

    async getImage() {
      return this.politicianData.bild_url_192
    },

    async getName() {
      return this.politicianData.tilltalsnamn
    },

    async getAge() {
      const yearBorn = this.politicianData.fodd_ar
      const yearNow = 2024
      return yearNow - yearBorn
    },

    async getParty() {
      return this.politicianData.parti
    },

    async collectAnforandeUrls(anforandeListaXml) {
      const anforandeUrlList = [];
      const anforandeUrlElements = await anforandeListaXml.getElementsByTagName("anforande_url_html");

      for (const element of anforandeUrlElements) {
        const url = element.textContent.trim();
        anforandeUrlList.push(url);
      }

      return anforandeUrlList;
    },

    async collectAnforandeText(url) {
      // Get speeches as html from API
      const data = await RiksdagensData.fetchSpeechesAsHtml(url);

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
    },

    async collectAnforandenIntoArray(anforandeUrlList) {
      const anforandeTexts = [];

      for (const url of anforandeUrlList) {
        const anforande = await this.collectAnforandeText(url);
        anforandeTexts.push(anforande);
      }

      return anforandeTexts;
    },

    async speechesToSentences(anforandeTexts) {
      const sentences = [];

      for (const anforande of anforandeTexts) {
        const sentencesPerSpeach = anforande.split(".");
        for (const sentence of sentencesPerSpeach) {
          sentences.push(sentence.trim() + ".");
        }
      }

      return sentences;
    },

    async getQuote() {
      const anforandelistaXml = await RiksdagensData.fetchAnforandelistaAsXml('2023-01-01', this.randomId);

      const anforandeUrlList = await this.collectAnforandeUrls(anforandelistaXml);

      const anforandeTexts = await this.collectAnforandenIntoArray(anforandeUrlList);

      const sentences = await this.speechesToSentences(anforandeTexts);

      const keyPhrases = ["jag tycker", "tycker jag", "jag anser", "anser jag", "jag menar", "menar jag",
        "enligt min mening", "vi tycker", "tycker vi", "vi anser", "anser vi", "vi menar",
        "menar vi", "det bör", "bör det", "det måste", "måste det", "vi måste", "måste vi",
        "lösning", "förändring", "ändras", "förbättras", "det är viktigt att", "det är bra att"];

      let filteredSentences = [];

      for (const keyPhrase of keyPhrases) {
        const sentenceWithKeyPhrase = sentences.filter(sentence => sentence.toLowerCase().includes(keyPhrase.toLowerCase()));
        filteredSentences = filteredSentences.concat(sentenceWithKeyPhrase);
      }

      if (filteredSentences.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredSentences.length)
        return filteredSentences[randomIndex]
      }
      else {
        console.log("No matching quotes")
      }
    },

    async loadImageAndData() {
      await this.getRandomId()
      await this.getPoliticianData(this.randomId)
      this.imageUrl = await this.getImage()
      this.firstName = await this.getName()
      this.age = await this.getAge()
      this.party = await this.getParty()
      this.quote = await this.getQuote()
    },

    async handleAnswer(answer) {
      if (answer === 'yes') {
        // Reload image, name, and age
        await this.loadImageAndData()
        // Add randomId to the list
        // Assuming you have a list in your data called `selectedIds`
        // this.selectedIds.push(this.randomId)
        this.selectedStore.addSelectedPersonData(
          this.randomId,
          this.firstName,
          this.age,
          this.party,
          this.imageUrl
        )
        this.statsStore.countParty(this.party)
        if (this.selectedStore.selectedPersons.size >= 12) {
          router.push('pick_minister')
        }
      } else if (answer === 'no') {
        // Only reload image, name, and age
        await this.loadImageAndData()
      }
    }
  },

  async created() {
    // Preload data
    await this.preload()
    // Load initial image and data
    await this.loadImageAndData()

    await this.getQuote()
  }
}
</script>

<style scoped>
.wrapper {
  padding: 1rem;
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
  font-family: Courier, monospace;
  margin: auto;
}
</style>
