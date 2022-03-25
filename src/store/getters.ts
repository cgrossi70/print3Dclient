import { RootState, Config, Snackbar } from "@/store/types"
import { GetterTree } from "vuex"

export const getters: GetterTree<RootState,RootState> = {
  /*getPrinters(state): Printer[] {
    return state.config.printers;
  },
  getPrinterDefault(state): number {
    return state.config.default;
  },*/
  getConfig(state): Config {
    return state.config;
  },
  getSnackbar(state): Snackbar {
    return state.snackbar;
  },
  getHideTemperature(state){
    return state.config.console.hideTemperature
  },
  getAutoscaleGraph(state){
    return state.config.temperature.autoscaleGraph
  },
  getHideGraph(state){ 
    return state.config.temperature.hideGraph
  },
  getLanguage(state){
    return state.config.general.language
  },
  getPrinterName(state){
    return state.config.general.printerName
  },
  getConfirmEmergencyStop(state){
    return state.config.general.confirmEmergencyStop
  }

}
