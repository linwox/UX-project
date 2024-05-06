import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    v_count: undefined,
    s_count: undefined,
    mp_count: undefined,
    l_count: undefined,
    c_count: undefined,
    kd_count: undefined,
    m_count: undefined,
    sd_count: undefined,
    partyCount : [v_count, s_count, mp_count, l_count, c_count, kd_count , m_count, sd_count]
  }),
  actions: {
    countParties() {
        
    }
  }
})
