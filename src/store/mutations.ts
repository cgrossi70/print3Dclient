import { MutationTree } from "vuex"
import { RootState, Printer } from "@/store/types"

export const mutations: MutationTree<RootState> = {
/*  setPrinterDefault (state,payload: number): void {
    state.config.default = payload;
  },
  deletePrinter (state,payload: number): void {
    state.config.printers.splice(payload,1)
  },
  addPrinter (state, payload: Printer): void {
    state.config.printers.push(payload)
  },*/
  setSnackbar (state,payload): void {
    state.snackbar.active = payload.active
    state.snackbar.message = payload.message
    if(payload.color)
      state.snackbar.color = payload.color
  },
  setAutoscaleGraph(state,payload){
    state.config.autoscaleGraph = payload
  },
  setHideGraph(state,payload){
    state.config.hideTemperature = payload
  },
  
  setPrinterName(state,payload){
    state.config.printerName = payload
  },
  setLanguage(state,payload){
    state.config.language = payload
  },

  setHideTemperature(state,payload){
    state.config.hideTemperature = payload
  },  

  setConfirmEmergencyStop(state,payload){
    state.config.confirmEmergencyStop = payload
  },  

  
  setConfig(state,payload) {
    state.config = payload.value
  }

}
