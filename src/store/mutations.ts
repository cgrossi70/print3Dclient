import { MutationTree } from "vuex"
import { RootState } from "@/store/types"

export interface Item {
  section: string,
  item:   string,
  value:  string
}

export const mutations: MutationTree<RootState> = {

  deleteConfigArrayItem(state,payload){
    // @ts-expect-error: Not reachable error
    state.config[payload.section][payload.key].splice(state.config[payload.section][payload.key].indexOf(payload.value),1)
  },

  editConfigArrayItem(state,payload){
    // @ts-expect-error: Not reachable error
    state.config[payload.section][payload.key][payload.value.id].name  = payload.value.name
    // @ts-expect-error: Not reachable error
    state.config[payload.section][payload.key][payload.value.id].script = payload.value.script
  },

  addConfigArrayItem(state: RootState, payload: Item){
    // @ts-expect-error: Not reachable error
    state.config[payload.section][payload.key].push(payload.value)
  },

  setConfigItem(state: RootState, payload: Item){
  console.log(payload)
  if(!payload['section']) 
    // @ts-expect-error: Not reachable error
    state.config[payload.key] = payload.value
  else   
    // @ts-expect-error: Not reachable error
    state.config[payload.section][payload.key] = payload.value
  },

  setSnackbar (state,payload): void {
    state.snackbar.active = payload.active
    state.snackbar.message = payload.message
    if(payload.color)
      state.snackbar.color = payload.color
  },

  setConfig(state,payload) {
    state.config = payload
  }

}
