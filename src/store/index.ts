import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { actions } from '@/store/actions.ts'
import { getters } from '@/store/getters.ts'
import { mutations } from '@/store/mutations.ts'
import { RootState } from '@/store/types.ts'
import { WebSocket } from '@/store/websocket/index.ts'
import { Hardware } from '@/store/hardware/index.ts'
import { Printer } from '@/store/printer/index.ts'
import { Editor } from '@/store/editor/index.ts'
import { FileManager } from '@/store/file_manager/index.ts'

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
    autoscaleTempGraph: true,
    hideTempGraph: false,
    printers: [
       {"name": "Local", "url": "127.0.0.1:7125"},
       {"name": "Toshiba Sattelite", "url": "192.168.0.2:7125"},
       {"name": "Prusa Bear Nova", "url": "192.168.0.108:7125"},
       {"name": "Desktop", "url": "192.168.0.5:7125"}
     ],
     default: 0,
     hideConsoleTemp: true,
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
