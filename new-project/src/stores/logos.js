import { defineStore } from 'pinia'

export const useLogosStore = defineStore('logos', {
  state: () => ({
    c_logo: undefined,
    kd_logo: undefined,
    l_logo: undefined,
    m_logo: undefined,
    mp_logo: undefined,
    s_logo: undefined,
    sd_logo: undefined,
    v_logo: undefined
  }),
  actions: {
    setLogoUrl(party) {
      switch (party) {
        case 'V':
          this.v_logo = '../assets/Loggor/V_logo.svg'
          break
        case 'S':
          this.s_logo = '../assets/Loggor/S_logo.svg'
          break
        case 'MP':
          this.mp_logo = '../assets/Loggor/MP_logo.svg'
          break
        case 'L':
          this.l_logo = '../assets/Loggor/L_logo.svg'
          break
        case 'C':
          this.c_logo = '../assets/Loggor/C_logo.svg'
          break
        case 'KD':
          this.kd_logo = '../assets/Loggor/KD_logo.svg'
          break
        case 'M':
          this.m_logo = '../assets/Loggor/M_logo.svg'
          break
        case 'SD':
          this.sd_logo = '../assets/LoggorSD_logo.svg'
          break
      }
    }
  },
  getters: {
    getLogoUrl() {
      return [
        this.v_logo,
        this.s_logo,
        this.mp_logo,
        this.l_logo,
        this.c_logo,
        this.kd_logo,
        this.m_logo,
        this.sd_logo
      ]
    }
  }
})