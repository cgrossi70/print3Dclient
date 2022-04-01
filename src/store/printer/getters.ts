import { GetterTree } from 'vuex'
import { Sensor,PrinterState, PrintStatistics, Position, Status, HistoryStatistics, ConsoleCommands } from '@/store/printer/types'
import { RootState } from '@/store/types'

export const getters: GetterTree<PrinterState,RootState> = {
  getMasterStatus(state): Status {
    if(state.status.state !== 'ready')
      return state.status
    else {
      return {
        "state": state.printStats.state,
        "message": state.printStats.message,
      }
    }
  },

  getPrinter(state): PrinterState {
    return state
  },
  getPrintStats(state): PrintStatistics {
    return state.printStats
  },
  getPosition(state): Position {
    return state.position
  },
  getHistoryStats(state): HistoryStatistics{
    return state.historyStats
  },
  getConsoleCommands(state): ConsoleCommands[]{
    return state.consoleCommands
  },
  getSensors(state): Sensor[] {
    return state.sensors
  },
  getMcuInfo(state) {
    return state.mcuInfo
  },
  getMoonrakerWarnings(state){
    return state.moonrakerWarnings
  },
  getSettings(state){
    return state.settings
  },
  getFanSpeed(state){
    return state.fanSpeed
  },
  getGCodes(state){
    return state.gCodes
  },
  
}
