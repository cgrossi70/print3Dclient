import { RootState, Printer, Config, Snackbar } from "@/store/types"
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
    return state.config.hideTemperature
  },
  getAutoscaleGraph(state){
    return state.config.autoscaleGraph
  },
  getHideGraph(state){
    return state.config.hideGraph
  },
  getLanguage(state){
    return state.config.language
  },
  getPrinterName(state){
    return state.config.printerName
  },
  getConfirmEmergencyStop(state){
    return state.config.confirmEmergencyStop
  }

}
