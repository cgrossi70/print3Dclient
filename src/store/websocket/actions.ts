import { ActionTree } from 'vuex'
import { WebSocketState } from "@/store/websocket/types.ts"
import { RootState } from "@/store/types.ts"

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
