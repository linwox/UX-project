import RiksdagensData from '../services/RiksdagensData'

async function collectAnforandeUrls(anforandeListaXml) {
  const anforandeUrlList = []
  const anforandeUrlElements = await anforandeListaXml.getElementsByTagName('anforande_url_html')

  for (const element of anforandeUrlElements) {
    const url = element.textContent.trim()
    anforandeUrlList.push(url)
  }

  return anforandeUrlList
}

async function collectAnforandeText(url) {
  // Get speeches as html from API
  const data = await RiksdagensData.fetchSpeechesAsHtml(url)

  // Clean up the text from html tags
  const strWithoutComments = data.replace(/(<!--.*?-->)/gs, '')
  const strWithoutHTmlTags = strWithoutComments.replace(/(<([^>]+)>)/gi, '')
  const strHtml = strWithoutHTmlTags.replace(/\s+/g, ' ')

  // Remove meta data for speech
  const regex = /\((\b[A-Z]+\b)\)/
  const match = strHtml.match(regex)

  if (match && match.index !== undefined) {
    const result = strHtml.substring(match.index + match[0].length).trim()
    return result
  } else {
    throw new Error('Error cleaning text: no meta data found')
  }
}

async function collectAnforandenIntoArray(anforandeUrlList) {
  const anforandeTexts = []

  for (const url of anforandeUrlList) {
    const anforande = await collectAnforandeText(url)
    anforandeTexts.push(anforande)
  }

  return anforandeTexts
}

async function speechesToSentences(anforandeTexts) {
  const sentences = []

  for (const anforande of anforandeTexts) {
    const sentencesPerSpeach = anforande.split('.')
    for (const sentence of sentencesPerSpeach) {
      sentences.push(sentence.trim() + '.')
    }
  }

  return sentences
}

export async function generateQuote(randomId) {
  const anforandelistaXml = await RiksdagensData.fetchAnforandelistaAsXml('2023-01-01', randomId)

  const anforandeUrlList = await collectAnforandeUrls(anforandelistaXml)

  const anforandeTexts = await collectAnforandenIntoArray(anforandeUrlList)

  const sentences = await speechesToSentences(anforandeTexts)

  const sentencesCorrectLength = sentences.filter(
    (sentence) => sentence.length > 30 && sentence.length < 180
  )

  const keyPhrases = [
    'jag tycker',
    'tycker jag',
    'jag anser',
    'anser jag',
    'jag menar',
    'menar jag',
    'enligt min mening',
    'vi tycker',
    'tycker vi',
    'vi anser',
    'anser vi',
    'vi menar',
    'menar vi',
    'det bör',
    'bör det',
    'det måste',
    'måste det',
    'vi måste',
    'måste vi',
    'lösning',
    'förändring',
    'ändras',
    'förbättras',
    'det är viktigt att',
    'det är bra att'
  ]

  let filteredSentences = []

  for (const keyPhrase of keyPhrases) {
    const sentenceWithKeyPhrase = sentencesCorrectLength.filter((sentence) =>
      sentence.toLowerCase().includes(keyPhrase.toLowerCase())
    )
    filteredSentences = filteredSentences.concat(sentenceWithKeyPhrase)
  }

  if (filteredSentences.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredSentences.length)
    return filteredSentences[randomIndex]
  } else {
    return null
  }
}
