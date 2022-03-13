import { MutationTree } from "vuex"
import { HardwareState } from "@/store/hardware/types.ts"

export const mutations: MutationTree<HardwareState> = {
  setHostCpuInfo (state,payload) {
    state.hostCpuInfo.description = payload.cpu_info.cpu_desc
    state.hostCpuInfo.totalMemory =  payload.cpu_info.total_memory
    state.hostCpuInfo.processor = payload.cpu_info.processor
    state.hostCpuInfo.cpuCount = payload.cpu_info.cpu_count
    state.hostCpuInfo.soDistribution = payload.distribution.name
  },
  setServices (state,payload) {
    for (const property in payload.service_state) {
      state.services.push({
        name: property,
        active_state: payload.service_state[property].active_state,
        sub_state: payload.service_state[property].sub_state,
      })
    }
  },
  setSystemCpuUsage(state,payload){
    state.hostCpuInfo.systemCpuUsage = Math.floor(payload.system_cpu_usage.cpu)
  },
  updateService (state,payload) {
    for (const property in payload) {
      state.services.find(function(service) {
        if(service.name == property){
          service.active_state = payload[property].active_state;
          service.sub_state = payload[property].sub_state
        }
      })
    }
  },
  resetServices(state){
    state.services = []
  }
}
