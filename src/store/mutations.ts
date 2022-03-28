import { MutationTree } from "vuex"
import { RootState } from "@/store/types"
import {Announcement} from '@/store/types'

export interface Item {
  section: string,
  item:   string,
  value:  string
}

export const mutations: MutationTree<RootState> = {

  deleteConfigArrayItem(state,payload){
    if(payload.section != "")
    {
      // @ts-expect-error: Not reachable error
      state.config[payload.section][payload.key].splice(state.config[payload.section][payload.key].indexOf(payload.value),1)
    } else{
      // @ts-expect-error: Not reachable error
      state.config[payload.key].splice(state.config[payload.key].indexOf(payload.value),1)
    }
  },

  editConfigArrayItem(state,payload){
    // @ts-expect-error: Not reachable error
    state.config[payload.section][payload.key][payload.value.id].name  = payload.value.name
    // @ts-expect-error: Not reachable error
    state.config[payload.section][payload.key][payload.value.id].script = payload.value.script
  },

  addConfigArrayItem(state: RootState, payload: Item){
    if(payload.section != ""){
      // @ts-expect-error: Not reachable error
      state.config[payload.section][payload.key].push(payload.value)
    } else{
      // @ts-expect-error: Not reachable error
      if(!state.config[payload.key])
        // @ts-expect-error: Not reachable error
        state.config[payload.key] = []
      // @ts-expect-error: Not reachable error
      state.config[payload.key].push(payload.value)
    }
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
  },
  setAnnouncements(state,payload) {
    state.announcements = payload
  },
  updateAnnouncements(state,payload) {
    let id: string

    for (id in payload)
    {
       if ( state.announcements.filter((e: Announcement) => e.id === id).length === 0) {
        state.announcements.push({
          "id": id,
          "title": payload[id].title,
          "description": payload[id].description,
          "url": payload[id].url,
          "dismissed": payload[id].dismissed
        })
      }
    }
  },
  masrkAsRead(state,payload){
    state.announcements[payload].dismissed=true
  },
}
