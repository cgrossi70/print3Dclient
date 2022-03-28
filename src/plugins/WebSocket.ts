import {Store} from 'vuex'
import _Vue from 'vue'
import {RootState} from '@/store/types'

declare module 'vue/types/vue' {
  interface Vue {
    $socket: WebSocketClient;
  }
}

export class WebSocketClient {
  socket: WebSocket | null = null
  url = ''
  maxReconnects = 5
  reconnectInterval = 3000
  store: Store<RootState> | null = null

  constructor (options: WebSocketPluginOptions) {
      this.url = options.url
      this.maxReconnects = options.maxReconnects || 5
      this.reconnectInterval = options.reconnectInterval || 1000
      this.store = options.store
  }

  setUrl (url: string): void{
    this.url = url
  }

  connect(): void {
    console.debug('Connecting to '+this.url)
    this.socket = new WebSocket(this.url);

    this.socket.onopen = ()=> {
      console.debug('Conectado y obteniendo el socket Id')
      this.store.dispatch('websocket/setReconnectErrorState',false)
      this.sendObj("server.connection.identify",333333,{
        "client_name": "print3dclient",
        "version": "0.0.1",
        "type": "web",
        "url": ""
      })
    }

    this.socket.onmessage = (payload) => {
        const event = JSON.parse(payload.data)
        if(event.error){
          if(  event.error.message === "Namespace 'print3Dclient' not found"){
            this.sendObj("server.database.post_item",4654,{
              "namespace": "print3Dclient",
              "key": "config", 
              "value": this.store.state.config})
            this.sendObj("server.database.post_item",4654,{
              "namespace": "print3Dclient",
              "key": "announcements", 
              "value": this.store.state.announcements})
          }
          else {
            this.store.dispatch('setSnackbar',{
              message: event.error.message + ' ('+ event.id +')',
              color: 'red',
              active: true
            })
          }
        }


        if(event.id === 333333) {
          console.debug(`WebsocketId obtenido (${event.result.connection_id}) procediendo a registrar subscripciones`)
          this.store.commit('websocket/setWebsocketId',event.result.connection_id)
          this.store.dispatch('websocket/setConnectedState',true)
          this.store.dispatch('websocket/setReconnectErrorState',false)
          this.store.dispatch('printer/resetGCodeFiles')
          this.store.dispatch('hardware/resetServices')
          this.sendObj("server.info",9546)
          this.sendObj("printer.info",5445)
          this.sendObj("printer.objects.list",1454)
          this.sendObj("machine.system_info",4665)
          this.sendObj("server.history.totals", 5656)
          this.sendObj("server.files.get_directory",5644,{ "path": "gcodes", "extended": true })
          this.sendObj("server.files.get_directory",777777,{"path": this.store.getters['file_manager/getPath'], "extended": false})

          //this.sendObj("server.database.delete_item",123414,{"namespace": "print3Dclient","key": "announcements"})
          //this.sendObj("server.database.delete_item",123414,{"namespace": "print3Dclient","key": "initVersion"})
          /*this.sendObj("server.database.delete_item",123414,{"namespace": "print3Dclient","key": "preheats"})
          this.sendObj("server.database.delete_item",123414,{"namespace": "print3Dclient","key": "printerName"})
          this.sendObj("server.database.delete_item",123414,{"namespace": "print3Dclient","key": "language"})
          this.sendObj("server.database.delete_item",123414,{"namespace": "print3Dclient","key": "hideTemperature"})
          this.sendObj("server.database.delete_item",123414,{"namespace": "print3Dclient","key": "hideGraph"})
          this.sendObj("server.database.delete_item",123414,{"namespace": "print3Dclient","key": "consoleHeight",})
          this.sendObj("server.database.delete_item",123414,{"namespace": "print3Dclient","key": "confirmEmergencyStop"})
          this.sendObj("server.database.delete_item",123414,{"namespace": "print3Dclient","key": "autoscaleGraph"})*/
          
          this.sendObj("server.database.get_item",9999,{"namespace": "print3Dclient"})
          this.sendObj("server.database.get_item",9999,{"namespace": "announcements"})

          this.sendObj("printer.objects.subscribe",111111,{
            "objects": {
              "print_stats": ["print_duration", "total_duration", "filament_used","filename", "state", "message"],
              "motion_report": ["live_position"],
              "heaters": ["available_sensors","available_heaters"],
              "heater_bed": ["temperature","power","target"],
              "extruder": ["temperature","power","target","can_extrude"],
              "configfile": ["config","settings"],
              "fan": ["speed"],
              "mcu": ["mcu_constants","mcu_version"],
              "system_stats": ["sysload"],
              "temperature_host raspberry_pi": ["temperature"],
              "webhooks": ["state","state_message"],
            }
          })
        }
        else {
          this.store.dispatch('ON_MESSAGE',payload.data)
          this.store.dispatch('file_manager/ON_MESSAGE',payload.data)
          this.store.dispatch('hardware/ON_MESSAGE',payload.data)
          this.store.dispatch('printer/ON_MESSAGE',payload.data)
          //this.store.dispatch('websocket/ON_MESSAGE',payload.data)
        }
    };

    this.socket.onerror = () => {
      this.store.dispatch('websocket/setConnectedState',false)
      if(this.store.getters['websocket/getReconnectCount'] === this.maxReconnects)

         this.store.dispatch('websocket/setReconnectErrorState',true)
      if(this.store.getters['websocket/getReconnectCount'] < this.maxReconnects){
        this.store.dispatch('websocket/incrementReconnectCount')
        setTimeout(() => {
            this.connect();
        },this.reconnectInterval);
      }
    }

    this.socket.onclose = (event) => {
      if(event.wasClean)
      {
        this.store.dispatch('websocket/setConnectedState',false)
        this.store.dispatch('websocket/setReconnectErrorState',false)
        this.store.dispatch('websocket/resetReconnectCount')
        this.connect();
      }
    };
  }
  close(): void {
    this.store.dispatch('websocket/setConnectedState',false)
    this.store.dispatch('websocket/setReconnectErrorState',false)
    this.store.dispatch('websocket/resetReconnectCount')
    this.socket.close()
  }


  sendCommand(command: string): void {
    this.store.dispatch('printer/addConsoleCommand', command)
    this.sendObj('printer.gcode.script',7466, { "script": command })
  }

  sendObj(command: string, id: number, params?: unknown): void  {
    if(!params)
      this.socket.send(JSON.stringify({
          "jsonrpc": "2.0",
          "method": command,
          "id": id
      }))
    else
      this.socket.send(JSON.stringify({
          "jsonrpc": "2.0",
          "method": command,
          "params": params,
          "id": id
      }))
  }

}

export function WebSocketPlugin(Vue: typeof _Vue, options: WebSocketPluginOptions): void {
    const socket = new WebSocketClient(options)
    Vue.prototype.$socket = socket
    // Vue.$socket = socket
}

export interface WebSocketPluginOptions {
    url: string
    connectManual: boolean,
    maxReconnects?: number
    reconnectInterval?: number
    store: Store<RootState>
}

export interface WebSocketClient {
  serUrl(url: string): void;
  connect() : void;
  close(): void;
  sendCommnad(command: string) : void;
  sendObj(command: string, id: number, params?: unknown) : void;
}
