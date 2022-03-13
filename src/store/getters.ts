import { RootState, Printer, Config, Snackbar } from "@/store/types.ts"
import { GetterTree } from "vuex"

export const getters: GetterTree<RootState,RootState> = {
  getPrinters(state): Printer[] {
    return state.config.printers;
  },
  getPrinterDefault(state): number {
    return state.config.default;
  },
  getConfig(state): Config {
    return state.config;
  },
  getSnackbar(state): Snackbar {
    return state.snackbar;
  },
  getHideConsoleTemp(state){
    return state.config.hideConsoleTemp
  },
  getAutoscaleTempGraph(state){
    return state.config.autoscaleTempGraph
  },
  getHideTempGraph(state){
    return state.config.hideTempGraph
  },
}
