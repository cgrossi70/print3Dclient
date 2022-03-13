import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { HardwareState } from "@/store/hardware/types.ts"
import { getters } from "@/store/hardware/getters.ts"
import { mutations } from "@/store/hardware/mutations.ts"
import { actions } from "@/store/hardware/actions.ts"

const state: HardwareState = {
  hostCpuInfo: {
    description: '',
    processor: '',
    totalMemory: '',
    cpuCount: '',
    soDistribution: '',
    systemCpuUsage: 0,
    temperature: 0
  },
  services: [],
}

export const Hardware: Module<HardwareState,RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,

}
