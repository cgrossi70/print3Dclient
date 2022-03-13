export interface WebSocketState {
  api_url: string,
  socketConnected: boolean,
  socketId: number,
  subscribed: boolean,
  connectionFailed: boolean,
  reconnectError: boolean,
  reconnectCount: number
}
