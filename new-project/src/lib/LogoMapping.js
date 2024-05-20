const logoMapping = {
  V: '/src/assets/Loggor/V_logo.svg',
  S: '/src/assets/Loggor/S_logo.svg',
  MP: '/src/assets/Loggor/MP_logo.svg',
  C: '/src/assets/Loggor/C_logo.svg',
  L: '/src/assets/Loggor/L_logo.svg',
  KD: '/src/assets/Loggor/KD_logo.svg',
  M: '/src/assets/Loggor/M_logo.svg',
  SD: '/src/assets/Loggor/SD_logo.svg'
}

const getLogoPath = (partyName) => logoMapping[partyName]

export { logoMapping, getLogoPath }
