import { RootState } from "@/store/types"
import { GetterTree } from "vuex"
import { TemperatureGraphState } from "./types"

export const getters: GetterTree<TemperatureGraphState,RootState> = {
  getGraphTemperatures(state){
    return state
  },
}