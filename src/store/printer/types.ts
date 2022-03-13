export interface PrintStatistics {
  print_duration: number,
  total_duration: number,
  filament_used: number,
  filename: string,
  state: string,
  message: string
}
export interface HistoryStatistics {
  total_jobs: number,
  total_time: number,
  total_print_time: number,
  total_filament_used: number,
  longest_job: number,
  longest_print: number
}

export interface ConsoleCommands {
  date: string,
  color: string,
  message: string
}

export interface GcodeDirectories {
  typeRow: string,
  name: string,
  size: string,
  modified: string
  estimate_time?: number,
  filament_total?: string,
  first_layer_bed_temp?: number,
  first_layer_extr_temp?: number,
  first_layer_height?: number,
  layer_height?: string,
  object_height?: string,
  slicer?: string,
  thumbnails_large?: string
}

export interface Gcodes {
  root: string,
  parent: string,
  dirs: GcodeDirectories[],
}

export interface MCUInfo {
  name: string,
  version: string,
  frequency: string,
  cpuLoad: number
}

export interface Position {
  x: number,
  y: number,
  z: number
}

export interface Status {
  state: string,
  message: string,
}

export interface Sensor {
  name: string,
  code: string,
  isHeater: boolean,
  target: number,
  temperature: number,
  power: number
}

export interface Extruder {
  min_extrude_temp: number,
  max_temp: number,

}

export interface HeaterBed {
  max_temp: number
}

export interface PrinterState {
    fanSpeed: number,
    printStats: PrintStatistics,
    status: Status,
    position:Position,
    mcuInfo: MCUInfo,
    gCodes: Gcodes,
    historyStats: HistoryStatistics,
    consoleCommands: ConsoleCommands[],
    printerObjects: string [],
    sensors: Sensor []
    moonrakerWarnings: string [],
    settings: {
      extruder: Extruder,
      heaterBed: HeaterBed,
    }
    updateMessages: string[],
    graphTemperatures: {
        extruderTemperature: number[],
        bedTemperature: number[],
        piTemperature: number[]
    },
}
