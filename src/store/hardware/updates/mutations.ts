import { MutationTree } from "vuex"
import {UpdateState} from "./types"

export const mutations: MutationTree<UpdateState> = {
  setUpdates(state,payload){
    state.updates = payload.result
  },
  setUpdateMessage(state,payload){
    state.updateMessages.push(payload)
  },
  resetUpdateMessages(state){
    state.updateMessages=[]
  },
}