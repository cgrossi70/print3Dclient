import Vue from 'vue'
import { ActionTree } from 'vuex'
import { RootState } from "@/store/types"


function saveConfigItem(context: any ,payload: any, storeCommand: string, databaseItem: string){
  context.commit(storeCommand,payload)
  Vue.prototype.$socket.sendObj("server.database.post_item",4654,{"namespace": "print3Dclient","key": databaseItem, "value": payload})
}

export const actions: ActionTree<RootState,RootState> = {
  setSnackbar(context,payload){
    context.commit('setSnackbar',payload);
  },
  setAutoscaleGraph(context,payload){
    saveConfigItem(context,payload,'setAutoscaleGraph','autoscaleGraph')
  },
  setHideGraph(context,payload){
    saveConfigItem(context,payload,'setHideGraph','hideGraph')
  },

  setPrinterName(context,payload){
    saveConfigItem(context,payload,'setPrinterName','printerName')
  },
  setLanguage(context,payload){
    saveConfigItem(context,payload,'setLanguage','language')
  },
  setConfirmEmergencyStop(context,payload){
    saveConfigItem(context,payload,'setConfirmEmergencyStop','confirmEmergencyStop')
  },

  setHideTemperature(context,payload){
    saveConfigItem(context,payload,'setHideTemperature','hideTemperature')
  },

  ON_MESSAGE(context,payload) {
    const event = JSON.parse(payload);
    if(event.id === 5644) {
      context.commit('setConfig',event.result)
    }
  }
}
