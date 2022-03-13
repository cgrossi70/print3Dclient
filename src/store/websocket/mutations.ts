import { MutationTree } from "vuex"
import { WebSocketState } from "@/store/websocket/types.ts"

export const mutations: MutationTree<WebSocketState> = {

  setApiUrl (state,payload: string) {
    state.api_url = payload;
  },
  setConnectedState (state,payload: boolean) {
    state.socketConnected = payload;
  },

  setWebsocketId(state,payload: number) {
    state.socketId = payload;
  },
  incrementReconnectCount(state) {
    state.reconnectCount++
  },
  resetReconnectCount(state) {
    state.reconnectCount = 0
  },
  setReconnectErrorState(state,payload){
    state.reconnectError = payload;
  },

}
