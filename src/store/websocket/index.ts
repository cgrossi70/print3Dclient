import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { WebSocketState } from "@/store/websocket/types"
import { getters } from "@/store/websocket/getters"
import { mutations } from "@/store/websocket/mutations"
import { actions } from "@/store/websocket/actions"

const state: WebSocketState = {
  api_url: '',
  socketConnected: false,
  socketId: 0,
  subscribed: false,
  connectionFailed: false,
  reconnectError: false,
  reconnectCount: 0
}

export const WebSocket: Module<WebSocketState,RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,

}
