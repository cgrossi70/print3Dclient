import { MutationTree } from "vuex"
import { RootState } from "@/store/types"

export interface Item {
  item:   string,
  value:  string
}

export const mutations: MutationTree<RootState> = {

  deleteConfigArrayItem(state,payload){
    state.config.preheats.splice(state.config.preheats.indexOf(payload.id),1)
  },

  editConfigArrayItem(state,payload){
    alert(payload.value.id)
    state.config.preheats[payload.value.id].name  = payload.value.name
    state.config.preheats[payload.value.id].script = payload.value.script
  },

  addConfigArrayItem(state: RootState, payload: Item){
    // @ts-expect-error: Not reachable error
    state.config[payload.item].push(payload.value)
  },

  setConfigItem(state: RootState, payload: Item){
    // @ts-expect-error: Not reachable error
    state.config[payload.item] = payload.value
  },

  setSnackbar (state,payload): void {
    state.snackbar.active = payload.active
    state.snackbar.message = payload.message
    if(payload.color)
      state.snackbar.color = payload.color
  },

  setConfig(state,payload) {
    state.config = payload.value
  }

}
