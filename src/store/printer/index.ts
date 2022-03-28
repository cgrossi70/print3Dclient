import { Module } from 'vuex'
import { PrinterState } from '@/store/printer/types'
import { RootState } from '@/store/types'
import { getters } from "@/store/printer/getters"
import { mutations } from "@/store/printer/mutations"
import { actions } from "@/store/printer/actions"

const piTtemperatures = []
const extruderTemperatures = []
const bedTemperatures = []
for (let i=0; i<2000;i++)
{
  extruderTemperatures.push(0);
  piTtemperatures.push(0);
  bedTemperatures.push(0)
}
const state: PrinterState = {
  fanSpeed: 0,
  printStats: {
    print_duration: 0,
    total_duration: 0,
    filament_used: 0,
    filename: '',
    state: '',
    message: ''
  },
  status: {
    state: '',
    message: '',

  },
  position: {
    x: 0,
    y: 0,
    z: 0
  },
  mcuInfo: {
    name: '',
    version: '',
    frequency: '',
    cpuLoad: 0
  },
  gCodes: {
    root: '',
    parent: '',
    dirs: [{
      typeRow: "dir",
      name: '..',
      size: "4 Kb",
      modified: (new Date()).toLocaleDateString("es-AR"),
    }]
  },
  historyStats:{
    total_jobs: 0,
    total_time: 0,
    total_print_time: 0,
    total_filament_used: 0,
    longest_job: 0,
    longest_print: 0
  },
  consoleCommands: [{
      date: (new Date()).toLocaleTimeString("es-AR"),
      color: "blue",
      message: 'type HELP to view existing commands'
  }],
  printerObjects: [],
  sensors: [],
  moonrakerWarnings: [],
  settings: {
    extruder: {
      min_extrude_temp: 0,
      max_temp: 0,
    },
    heaterBed: {
      max_temp: 0
    }
  },
  updateMessages: [],
  
  graphTemperatures: {
      extruderTemperature: extruderTemperatures,
      bedTemperature: bedTemperatures,
      piTemperature: piTtemperatures
  },
  
}

export const Printer: Module<PrinterState,RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
