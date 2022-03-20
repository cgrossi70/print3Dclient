import Vue from "vue"
import { ActionTree } from "vuex"
import { PrinterState } from "@/store/printer/types"
import { RootState } from "@/store/types"
import {Sensor} from "@/store/printer/types"

export const actions: ActionTree<PrinterState,RootState> = {
  addConsoleCommand: function (context,payload) {
      context.commit('addConsoleCommand', {
        "date": new Date().toLocaleTimeString(),
        "message": payload,
        "color": "black"
      })
  },
  resetGCodeFiles: function(context){
    context.commit('resetGCodeFiles')
  },
  resetUpdateMessages: function(context){
    context.commit('resetUpdateMessages')
  },
  setRootDirectory: function (context,payload) {
    context.commit('setRootDirectory',payload)
  },

  ON_MESSAGE(context,payload) {

    const event = JSON.parse(payload);
    if (event.method === 'notify_klippy_shutdown') {
        console.log("Klippy shutdown .....")
        Vue.prototype.$socket.sendObj('printer.info',5445)
        //context.commit('setIsReady',false);
    }
    if (event.method === 'notify_klippy_disconnected') {
        console.log("Klippy disconeccted .....")
        //context.commit('setIsReady',false)
    }
    if (event.method === 'notify_klippy_ready') {
        console.log("Klippy connected .....")
        Vue.prototype.$socket.sendObj('printer.info',5445)
        //context.commit('setIsReady',true)
    }
    if (event.method === 'notify_gcode_response') {
        const myRegExp = new RegExp('B.*[0-9]*\\.[0-9]+\\s/[0-9]*\\.[0-9]+\\sT0:[0-9]*\\.[0-9]+\\s/[0-9]*\\.[0-9]+')
        if( context.getters.getHideConsoleTemp && !myRegExp.test( event.params[0]) ||
            !context.getters.getHideConsoleTemp){
              context.commit('addConsoleCommand',{
                "date": (new Date()).toLocaleTimeString("es-AR"),
                "color": "red",
                "message": event.params[0]
            })
        }
    }
    if (event.method === 'notify_update_response'){
      context.commit('setUpdateMessage',event.params[0].message)
    }

    if(event.method === 'notify_status_update'){

      /*
      if( event.params[0]["temperature_sensor raspberry_pi"].temperature ||
          event.params[0]["extruder"].temperature ||
          event.params[0]["heater_bed"].temperature) {
        if(event.params[0]["temperature_sensor raspberry_pi"].temperature)
          context.commit('setPiTemperature',event.params[0]["temperature_sensor raspberry_pi"].temperature)
        else
          context.commit('addGraphTemperature',{sensor: 'pi',value: context.getters.getGraphTemperatures.piTemperature[1999]})
        if(event.params[0]["extruder"].temperature)
          context.commit('addGraphTemperature',{sensor: 'extruder',value: event.params[0].extruder.temperature})
        else
          context.commit('addGraphTemperature',{sensor: 'extruder',value: context.getters.getGraphTemperatures.extruderTemperature[1999]})
        if(event.params[0]["heater_bed"].temperature)
          context.commit('addGraphTemperature',{sensor: 'bed',value: event.params[0].heater_bed.temperature})
        else
          context.commit('addGraphTemperature',{sensor: 'bed',value: context.getters.getGraphTemperatures.bedTemperature[1999]})
      }
      */


      if(event.params[0]['webhooks'])
        console.log(event.params[0]['webhooks'])
      if(event.params[0]['system_stats'])
        context.commit('setMcuCpuUsage',event.params[0].system_stats)
      if(event.params[0]['mcu'])
        context.commit('setMcuInfo',event.params[0].mcu)
      if (event.params[0]['fan']){
        context.commit('setFanSpeed',event.params[0].fan)
      }
      if (event.params[0]['configfile']){
        context.commit('setSettings',event.params[0].configfile.settings)
      }
      if(event.params[0]["temperature_host raspberry_pi"]){
        context.commit('setPiTemperature',event.params[0]["temperature_host raspberry_pi"])
      }
      if (event.params[0]['extruder']){
        context.commit('setExtruderParameters',event.params[0].extruder)
      }
      if (event.params[0]['heater_bed']){
        context.commit('setBedParameters',event.params[0].heater_bed)
      }
      if (event.params[0]['print_stats'])
        context.commit('setPrintStats',event.params[0])
      if (event.params[0]['motion_report'])
        context.commit('setPosition',event.params[0])
    }
    if(event.id === 5445 ){
      context.commit('setStatus',event.result)
    }
    else if(event.id === 1454) {
      context.commit('setObjectList',event.result)
    }
    else if(event.id === 5656) {
      context.commit('setHistoryStats',event.result)
    }
    else if(event.id === 9546) {
      context.commit('setMoonrakerWarnings',event.result)
    }
    else if (event.id === 5644) {

      if(event.result)
        context.commit('setGCodesFiles',event.result)

    }
  /*  else if (event.id === 4654) {
      // Este comando esta solo porque al enfriar no manda el corte de
      // power en la subscripcion bed y heater ver si en sucesivas versiones
      // Se arregla
      console.log(event.result.status.extruder)
      console.log(event.result.status.heater_bed)
      context.commit('setExtruderParameters',event.result.status.extruder)
      context.commit('setBedParameters',event.result.status.heater_bed)

    }*/
    else if (event.id === 111111) {
      if (event.result.status['fan'])
        context.commit('setFanSpeed',event.result.status.fan)
      if (event.result.status['configfile'])
        context.commit('setSettings',event.result.status.configfile.settings)
      if (event.result.status['print_stats'])
        context.commit('setPrintStats',event.result.status)
      if(event.result.status['motion_report'])
        context.commit('setPosition',event.result.status)
      if (event.result.status['extruder'])
        context.commit('setExtruderParameters',event.result.status.extruder)
      if (event.result.status['heater_bed'])
        context.commit('setBedParameters',event.result.status.heater_bed)
      if(event.result.status['mcu'])
        context.commit('setMcuInfo',event.result.status.mcu)
      if (event.result.status['heaters']) {
        if(event.result.status.heaters.available_heaters && event.result.status.heaters.available_sensors)
        {
          const heaters = event.result.status.heaters.available_heaters
          const sensors = event.result.status.heaters.available_sensors;

          const availableSensors: Sensor[] = []
          sensors.forEach(function (sensor: string) {
            availableSensors.push({
              "code": sensor,
              "name": sensor === 'extruder' ? 'Extruder' :
                      sensor === 'heater_bed' ? 'Bed' :
                      sensor === 'temperature_sensor raspberry_pi' ? 'Raspberry' : sensor,
              "isHeater": heaters.includes(sensor),
              "target": 0,
              "temperature": 0,
              "power" :0
            })
          })
          context.commit('setSensors',availableSensors)
        }
      }
    }
  },
}
