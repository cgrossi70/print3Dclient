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
      "key": "config", 
      "value": context.state.config})
  },

  deleteConfigArrayItem(context,payload){
    context.commit('deleteConfigArrayItem',payload) 
    Vue.prototype.$socket.sendObj("server.database.post_item",4654,{
      "namespace": "print3Dclient",
      "key": "config", 
      "value": context.state.config})
  },

  addConfigArrayItem(context,payload){
    context.commit('addConfigArrayItem',payload) 
    Vue.prototype.$socket.sendObj("server.database.post_item",4654,{
      "namespace": "print3Dclient",
      "key": "config", 
      "value": context.state.config})
  },
  
  setConfigItem(context,payload){
    context.commit('setConfigItem',payload)
    Vue.prototype.$socket.sendObj("server.database.post_item",4654,{
      "namespace": "print3Dclient",
      "key": "config", 
      "value": context.state.config})
  },

 
  ON_MESSAGE(context,payload) {
    const event = JSON.parse(payload);
    if(event.id === 5644) {
      console.log(event)
      context.commit('setConfig',event.result.value.config)
    }
  }
}
