import { MutationTree } from "vuex"
import { RootState, Printer } from "@/store/types.ts"

export const mutations: MutationTree<RootState> = {
  setPrinterDefault (state,payload: number): void {
    state.config.default = payload;
  },
  deletePrinter (state,payload: number): void {
    state.config.printers.splice(payload,1)
  },
  addPrinter (state, payload: Printer): void {
    state.config.printers.push(payload)
  },
  setSnackbar (state,payload): void {
    state.snackbar.active = payload.active
    state.snackbar.message = payload.message
    if(payload.color)
      state.snackbar.color = payload.color
  },
  setHideConsoleTemp(state,payload){
    state.config.hideConsoleTemp = payload
  },
  setAutoscaleTempGraph(state,payload){
    state.config.autoscaleTempGraph = payload
  },
  setHideTempGraph(state,payload){
    state.config.hideTempGraph = payload
  },

}
