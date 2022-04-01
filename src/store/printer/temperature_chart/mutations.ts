import { MutationTree } from "vuex";
import { TemperatureGraphState } from "./types";

export const mutations: MutationTree<TemperatureGraphState> ={
   
  addGraphTemperature(state,payload){
    if(payload.sensor === 'pi'){
      state.pi.shift()
      state.pi.push(payload.value)
    } else if(payload.sensor === 'extruder') {
      state.extruder.push(payload.value)
    } else if(payload.sensor === 'bed') {
      state.bed.shift()
      state.bed.push(payload.value)
    }
  },
}