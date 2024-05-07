import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    v_count: 0,
    s_count: 0,
    mp_count: 0,
    l_count: 0,
    c_count: 0,
    kd_count: 0,
    m_count: 0,
    sd_count: 0,
  }),
  actions: {
    countParty(party) {
      switch (party) {
        case 'V':
          this.v_count++
          break
        case 'S':
          this.s_count++
          break
        case 'MP':
          this.mp_count++
          break
        case 'L':
          this.l_count++
          break
        case 'C':
          this.c_count++
          break
        case 'KD':
          this.kd_count++
          break
        case 'M':
          this.m_count++
          break
        case 'SD':
          this.sd_count++
          break
      }
    }
  },
  getters: {
    partyCounts() {
      return [this.v_count, this.s_count, this.mp_count, this.l_count, this.c_count, this.kd_count, this.m_count, this.sd_count]
    }
  }
})
