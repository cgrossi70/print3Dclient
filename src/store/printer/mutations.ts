import { MutationTree } from "vuex"
import { PrinterState } from "@/store/printer/types.ts"

interface dir {
  typeRow: string,
  dirname: string,
  size: number,
  modified: number
}

interface thumbnails {
  relative_path: string
}

interface files {
  typeRow: string,
  filename: string,
  size: number,
  modified: number
  estimate_time?: number,
  filament_total?: number,
  first_layer_bed_temp?: number,
  first_layer_extr_temp?: number,
  first_layer_height?: number,
  layer_height?: string,
  object_height?: string,
  slicer?: string,
  slicer_version?: string,
  thumbnails?: thumbnails[]
}

export const mutations: MutationTree<PrinterState> = {
  addConsoleCommand(state,payload){
    state.consoleCommands.push(payload)
  },
  /*setIsReady(state,payload){
      state.isReady=payload;
  },*/
  setStatus(state,payload) {
    state.status.state = payload.state;
    state.status.message = payload.state_message
  },
  setObjectList(state,payload) {
    state.printerObjects = payload.objects;
  },
  setHistoryStats(state,payload){
    state.historyStats.total_jobs = payload.job_totals.total_jobs,
    state.historyStats.total_time = payload.job_totals.total_time,
    state.historyStats.total_print_time = payload.job_totals.total_print_time,
    state.historyStats.total_filament_used = payload.job_totals.total_filament_used,
    state.historyStats.longest_job = payload.job_totals.longest_job,
    state.historyStats.longest_print = payload.job_totals.longest_print
  },
  setPrintStats(state,payload){
    // Se hace propiedad por propiedad porque es la misma mutacion que sirve el 111111 y el notify_status_update
    if(payload.print_stats.print_duration)
      state.printStats.print_duration = payload.print_stats.print_duration
    if(payload.print_stats.total_duration)
      state.printStats.total_duration = payload.print_stats.total_duration
    if(payload.print_stats.filament_used)
      state.printStats.filament_used = payload.print_stats.filament_used
    if(payload.print_stats.filename)
      state.printStats.filename = payload.print_stats.filename
    if(payload.print_stats.state)
      state.printStats.state = payload.print_stats.state
    if(payload.print_stats.message)
      state.printStats.message = payload.print_stats.message
  },
  setPosition(state,payload){
    if(payload.motion_report.live_position){
      state.position.x = payload.motion_report.live_position[0].toFixed(2)
      state.position.y = payload.motion_report.live_position[1].toFixed(2)
      state.position.z = payload.motion_report.live_position[2].toFixed(2)
    }
  },
  setSensors(state,payload){
    state.sensors = payload;
  },
  setExtruderParameters(state,payload){
      state.sensors.find(function(sensor) {
        if(sensor.code === 'extruder'){
          if(typeof payload.temperature !== 'undefined')
            sensor.temperature = payload.temperature
          if(typeof payload.power !== 'undefined')
            sensor.power = payload.power
          if(typeof payload.target !== 'undefined')
              sensor.target = payload.target
      }
    })
  },
  setBedParameters(state,payload){
      state.sensors.find(function(sensor) {
        if(sensor.code == 'heater_bed'){
          if(typeof payload.temperature !== 'undefined')
            sensor.temperature = payload.temperature
          if(typeof payload.power !== 'undefined')
             sensor.power = payload.power
          if(typeof payload.target !== 'undefined')
              sensor.target = payload.target
      }
    })
  },
  setMoonrakerWarnings(state,payload){
    state.moonrakerWarnings = payload.warnings
    /*if(payload.state === 'ready')
      state.isReady = true;*/
  },
  setSettings(state,payload) {
    if(payload.extruder){
      state.settings.extruder.min_extrude_temp = payload.extruder.min_extrude_temp
      state.settings.extruder.max_temp = payload.extruder.max_temp
      state.settings.heaterBed.max_temp = payload.heater_bed.max_temp
    }
  },
  setFanSpeed(state,payload){
    state.fanSpeed = Math.floor(payload.speed*100)
  },
  setGCodesFiles(state,payload){
    if(payload.dirs)
      payload.dirs.forEach((item: dir) => {
        state.gCodes.dirs.push({
          typeRow: "dir",
          name: item.dirname,
          size: item.size / 1024 + "Mb",
          modified:  (new Date(item.modified*1000)).toLocaleDateString(),
        })
      })
    if(payload.files)
      payload.files.forEach((item: files) => {
        state.gCodes.dirs.push({
          typeRow: "file",
          name: item.filename,
          size: (item.size > 1048576) ? Number(item.size/1048576).toFixed(0)+' Mb' : Number(item.size/1024).toFixed(0)+' Kb',
          modified: (new Date(item.modified*1000)).toLocaleDateString(),
          estimate_time: item.estimate_time,
          filament_total: Math.round(item.filament_total) + ' mm',
          first_layer_bed_temp: 60,
          first_layer_extr_temp: item.first_layer_extr_temp,
          first_layer_height: item.first_layer_height,
          layer_height: item.layer_height + ' mm',
          object_height: item.object_height + ' mm',
          slicer: item.slicer+' '+ item.slicer_version,
          thumbnails_large: item.thumbnails[1].relative_path
        })
      })

  },
  resetGCodeFiles(state){
    state.gCodes = {
      root: '',
      parent: '',
      dirs: [{
        typeRow: "dir",
        name: '..',
        size: "4 Kb",
        modified: (new Date()).toLocaleDateString("es-AR"),
      }]
    }
  },
  setRootDirectory(state,payload){
    state.gCodes.root = payload.newRoot
    state.gCodes.parent = payload.newParent
  },
  setUpdateMessage(state,payload){
    state.updateMessages.push(payload)
  },
  resetUpdateMessages(state){
    state.updateMessages=[]
  },
  setMcuInfo(state,payload){
    if(payload.mcu_constants){
      state.mcuInfo.name = payload.mcu_constants.MCU
      state.mcuInfo.version = payload.mcu_version
      state.mcuInfo.frequency = payload.mcu_constants.CLOCK_FREQ/1000000 + " Mhz"
    }
  },
  setMcuCpuUsage(state,payload){
    state.mcuInfo.cpuLoad = Math.floor(payload.sysload*100)

  },
  setPiTemperature(state,payload) {

    state.sensors.find(function(sensor) {
      // TODO: Porque no lo puedo hacer con el code
      if(sensor.name === 'Raspberry'){
        if(typeof payload.temperature !== 'undefined')
          sensor.temperature = payload.temperature
      }
    })
  },
  addGraphTemperature(state,payload){
    if(payload.sensor === 'pi'){
      state.graphTemperatures.piTemperature.shift()
      state.graphTemperatures.piTemperature.push(payload.value)
    } else if(payload.sensor === 'extruder') {
      state.graphTemperatures.extruderTemperature.shift()
      state.graphTemperatures.extruderTemperature.push(payload.value)
    } else if(payload.sensor === 'bed') {
      state.graphTemperatures.bedTemperature.shift()
      state.graphTemperatures.bedTemperature.push(payload.value)
    }
  }
}
