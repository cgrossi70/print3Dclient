import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { actions } from '@/store/actions'
import { getters } from '@/store/getters'
import { mutations } from '@/store/mutations'
import { RootState } from '@/store/types'
import { WebSocket } from '@/store/websocket/index'
import { Hardware } from '@/store/hardware/index'
import { Printer } from '@/store/printer/index'
import { Editor } from '@/store/editor/index'
import { FileManager } from '@/store/file_manager/index'

import VuexPersistence from 'vuex-persist'

// defino la persistenc
const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
  reducer: (state: RootState) => ({
    config: state.config, // Only persist config
  })
})

// default State
const state: RootState = {
  sidebar: true,
  rightbar: false,
  snackbar: {
    message: "",
    active: false,
    color: 'success'
  },
  config: {
    autoscaleGraph: true,
    confirmEmergencyStop: false,
    hideGraph: false,
    hideTemperature: true,
    initVersion: "0.0.1",
    language: "Spanish",
    printerName: "Desktop Local",
    preheats: [{"name": "Cool","script": "TURN_OFF_HEATERS"}]
  }
}

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state,
  getters,
  mutations,
  actions,
  modules:{
    websocket: WebSocket,
    hardware: Hardware,
    printer: Printer,
    editor: Editor,
    file_manager: FileManager
  },

  plugins: [vuexLocal.plugin] // Only Config result persistent in localStorage
}

export default new Vuex.Store<RootState>(store)
