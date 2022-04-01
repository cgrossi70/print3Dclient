import { ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { UpdateState } from "./types";


export const actions: ActionTree<UpdateState,RootState> = {

  setUpdates(context,payload): void {
    context.commit('setUpdates',payload)
  },

  resetUpdateMessages: function(context){
    context.commit('resetUpdateMessages')
  },

  ON_MESSAGE(context,payload): void {
    const event = JSON.parse(payload);
    if(event.id === 4644){
      context.commit('setUpdates',event)
      
    }
    if (event.method === 'notify_update_response'){
      context.commit('setUpdateMessage',event.params[0].message)
    }
  }

}