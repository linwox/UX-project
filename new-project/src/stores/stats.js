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
    partyCounts: [v_count, s_count, mp_count, l_count, c_count, kd_count, m_count, sd_count]
  }),
  actions: {
    countParty(party) {
      switch (party) {
        case 'V':
          this.v_count++;
          break;
        case 'S':
          this.s_count++;
          break;
        case 'MP':
          this.mp_count++;
          break;
        case 'L':
          this.l_count++;
          break;
        case 'C':
          this.c_count++;
          break;
        case 'KD':
          this.kd_count++;
          break;
        case 'M':
          this.m_count++;
          break;
        case 'SD':
          this.sd_count++;
          break;
      }
    }
  }
})
