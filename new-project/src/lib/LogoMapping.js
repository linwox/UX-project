const logoMapping = {
  V: '/V_logo.svg',
  S: '/S_logo.svg',
  MP: '/MP_logo.svg',
  C: '/C_logo.svg',
  L: '/L_logo.svg',
  KD: '/KD_logo.svg',
  M: '/M_logo.svg',
  SD: '/SD_logo.svg'
}

const getLogoPath = (partyName) => logoMapping[partyName]

export { logoMapping, getLogoPath }
