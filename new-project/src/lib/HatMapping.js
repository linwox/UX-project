const hatMapping = {
  Statsminister: '/crazy_crown.gif',
  Finansminister: '/check_hat.gif',
  Partyminister: '/crazy_hat.gif',
  Klimatminister: '/dancing_hat.gif',
  Sjukvårdminister: '/dot_hat.gif',
  Kulturminister: '/green_hat.gif',
  Skolminister: '/pink_hat.gif',
  Justitieminister: '/red_hat.gif',
  Försvarsminister: '/stripe_hat.gif',
  Utrikesminister: '/wobble_hat.gif',
  Kompisminister: '/yellow_hat.gif',
  Semesterminister: '/star_hat.gif'
}

const getHatPath = (postName) => hatMapping[postName]

export { hatMapping, getHatPath }
