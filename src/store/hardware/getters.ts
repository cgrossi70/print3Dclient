import { GetterTree } from 'vuex'
import { HardwareState, Service} from "@/store/hardware/types"
import { RootState } from "@/store/types"

export const getters: GetterTree<HardwareState,RootState> = {
  getServices (state): Service [] {
    return state.services
  },
  getHostCpuInfo(state) {
    return state.hostCpuInfo
  },
}
