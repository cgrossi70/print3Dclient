import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { HardwareState } from "@/store/hardware/types"
import { getters } from "@/store/hardware/getters"
import { mutations } from "@/store/hardware/mutations"
import { actions } from "@/store/hardware/actions"
import { Update } from "@/store/hardware/updates/index"

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
  modules: {
    update: Update
  }

}
