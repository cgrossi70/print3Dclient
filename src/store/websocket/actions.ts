import { ActionTree } from 'vuex'
import { WebSocketState } from "@/store/websocket/types"
import { RootState } from "@/store/types"

export const actions: ActionTree<WebSocketState,RootState> = {
  setConnectedState(context,payload){
    context.commit('setConnectedState',payload);
  },
  setReconnectErrorState(context,payload){
    context.commit('setReconnectErrorState',payload)
  },
  incrementReconnectCount(context){
    context.commit('incrementReconnectCount')
  },
  resetReconnectCount(context){
    context.commit('resetReconnectCount')
  }
}
