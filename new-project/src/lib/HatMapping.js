const hatMapping = {
    Statsminister: '/src/assets/Hats/crazy_crown.gif',
    Finansminister: '/src/assets/Hats/check_hat.gif',
    Partyminister: '/src/assets/Hats/crazy_hat.gif',
    Klimatminister: '/src/assets/Hats/dancing_hat.gif',
    Sjukvårdminister: '/src/assets/Hats/dot_hat.gif',
    Kulturminister: '/src/assets/Hats/green_hat.gif',
    Skolminister: '/src/assets/Hats/pink_hat.gif',
    Justitieminister: '/src/assets/Hats/red_hat.gif',
    Försvarsminister: '/src/assets/Hats/stripe_hat.gif',
    Utrikesminister: '/src/assets/Hats/wobble_hat.gif',
    Kompisminister: '/src/assets/Hats/yellow_hat.gif',
    Semesterminister: '/src/assets/Hats/star_hat.gif'
  }
  
  const getHatPath = (postName) => hatMapping[postName]
  
  export { hatMapping, getHatPath }