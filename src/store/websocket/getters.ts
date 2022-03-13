import { WebSocketState } from "@/store/websocket/types.ts"
import { RootState } from "@/store/types.ts"
import { GetterTree } from "vuex"

export const getters: GetterTree<WebSocketState,RootState> = {
  getConnected(state): boolean{
    return state.socketConnected
  },
  getDisconnected(state): boolean{
    return !state.socketConnected
  },
  getId(state): number{
    return state.socketId
  },
  /*getSubscribed(state): boolean{
    return state.subscribed
  },*/
  getReconnectCount(state): number{
    return state.reconnectCount
  },
  getReconnectError(state): boolean{
    return state.reconnectError
  },
  getApiUrl(state): string{
    return state.api_url;
  },
  /*getWebSocketState(state): WebSocketState {
    return state
  }*/

}
