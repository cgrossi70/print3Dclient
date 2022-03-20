import Vue from 'vue'
import { ActionTree } from 'vuex'
import { RootState } from "@/store/types"


export const actions: ActionTree<RootState,RootState> = {
  setSnackbar(context,payload){
    context.commit('setSnackbar',payload);
    
  },

  editConfigArrayItem(context,payload){
    context.commit('editConfigArrayItem',payload) 
    Vue.prototype.$socket.sendObj("server.database.post_item",4654,{
      "namespace": "print3Dclient",
      "key": payload.item, 
      // @ts-expect-error: Not reachable error
      "value": context.state.config[payload.item]
    })
  },

  deleteConfigArrayItem(context,payload){
    context.commit('deleteConfigArrayItem',payload) 
    Vue.prototype.$socket.sendObj("server.database.post_item",4654,{
      "namespace": "print3Dclient",
      "key": payload.item, 
      // @ts-expect-error: Not reachable error
      "value": context.state.config[payload.item]
    })
  },

  addConfigArrayItem(context,payload){
    context.commit('addConfigArrayItem',payload) 
    Vue.prototype.$socket.sendObj("server.database.post_item",4654,{
      "namespace": "print3Dclient",
      "key": payload.item, 
      // @ts-expect-error: Not reachable error
      "value": context.state.config[payload.item]
    })
  },
  
  setConfigItem(context,payload){
    context.commit('setConfigItem',payload)
    Vue.prototype.$socket.sendObj("server.database.post_item",4654,{"namespace": "print3Dclient","key": payload.item, "value": payload.value })
  },

 
  ON_MESSAGE(context,payload) {
    const event = JSON.parse(payload);
    if(event.id === 5644) {
      context.commit('setConfig',event.result)
    }
  }
}
