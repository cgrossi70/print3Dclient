<template>
      <v-navigation-drawer
        v-model="rightbar"
        absolute
        clipped
        right

        color="primary"
        width = "250"
      >

      <v-dialog
        v-model="addPrinterDialog"
        width = "400px"
      >
        <v-card>
          <v-toolbar
            dense
            dark
            color="primary"
          >
            {{ $t('Rightbar.AddPrinter') }}
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model = "printerName"
              :label= "$t('Rightbar.PrinterName')"
            >
            </v-text-field>
            <v-text-field
              v-model = "ipAddress"
              :label= "$t('Rightbar.IP Address')"
            >
            </v-text-field>
            <v-row>
              <v-col>
                <v-btn
                  block
                  color = "success"
                  @click = "addPrinter()"
                >
                  {{ $t('Rightbar.Add') }}
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  dark
                  block
                  color = "red darken-2"
                  @click = "addPrinterDialog=false"
                >
                  {{ $t('Rightbar.Cancel') }}
                </v-btn>
              </v-col>
            </v-row>


          </v-card-text>
        </v-card>

      </v-dialog>

      <v-expansion-panels dark dense accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Dummy
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Dummy
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header color="primary">
            <div>
              <v-icon>mdi-server</v-icon>
              {{ $t('Rightbar.Host') }}
            </div>

          </v-expansion-panel-header>
          <v-expansion-panel-content color="primary">
            <v-row>
              <v-col cols="1" class="my-0 pb-0">
              </v-col>
              <v-col class="my-0 pb-0 text-caption font-weight-bold">
                {{ $t('Rightbar.Restart') }}
              </v-col>
              <v-col class="my-0 pb-0 text-right">
                <v-icon color="orange lighten-2">
                  mdi-restart
                </v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" class="my-0 pb-0">
              </v-col>
              <v-col class="my-0 pb-0 text-caption font-weight-bold">
                {{ $t('Rightbar.Shutdown') }}
              </v-col>
              <v-col class="my-0 pb-0 text-right">
                <v-icon color="red lighten-2">
                  mdi-power
                </v-icon>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel elevation="0">
          <v-expansion-panel-header color="primary">
              <div>
                <v-icon>mdi-cog</v-icon>
                {{ $t('Rightbar.Services') }}
              </div>

          </v-expansion-panel-header>
          <v-expansion-panel-content color="primary">
            <v-row v-for="(item, index) in $store.getters['hardware/getServices']" :key="index">
              <v-col cols="1" class="my-0 pb-0">
              </v-col>
              <v-col class="my-0 pb-0 text-caption font-weight-bold">
                {{ item.name }}
              </v-col>
              <v-col class="my-0 pb-0 text-right">
                <v-icon
                  v-if="item.name!='moonraker'"
                  @click="serviceStart(item.name)"
                  color="green lighten-2"
                >
                  mdi-play
                </v-icon>
                <v-icon
                  v-if="item.name!='moonraker'"
                  @click="serviceStop(item.name)"
                  color="red lighten-2"
                >
                  mdi-stop
                </v-icon>
                <v-icon
                  class="text-right"
                  @click="serviceRestart(item.name)"
                  color="orange lighten-2"
                >
                  mdi-restart
                </v-icon>
              </v-col>

            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>


        </v-expansion-panels>
        <v-card
          dark
          elevation="0"
          color="primary"
        >
          <v-card-text>
            <v-list dense>
              <v-subheader>{{ $t('Rightbar.Printers') }}</v-subheader>
              <!-- <v-list-item-group
                color="amber"
                v-model="selectedItem"
             > -->
                <v-list-item >
                  <v-list-item-content @click="changePrinter(-1)" >
                    {{ $store.state.config.general.printerName }}<br>
                    127.0.0.1:7125
                  </v-list-item-content>
                </v-list-item>
                <v-list-item  v-for="(item,index) in $store.state.config.remotePrinters" :key="index">
                  <v-list-item-content @click="changePrinter(index)" >
                    {{ item.description }}<br>
                    {{ item.url }}
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="deletePrinter(index)">
                      <v-icon color="white">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

              <!-- </v-list-item-group> -->
            </v-list>
            <v-btn
              @click = "addPrinterDialog = true"
              block
              color = "success"
            >
              {{ $t('Rightbar.AddPrinter') }}
            </v-btn>
          </v-card-text>
        </v-card>

      </v-navigation-drawer>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class RightBarClass extends Vue {
  printerName       = ''
  ipAddress         = ''
  addPrinterDialog  = false

  get rightbar(): boolean {
    return this.$store.state.rightbar
  }
  set rightbar(value: boolean) {
    this.$store.state.rightbar = value
  }

  addPrinter (): void {
    
    this.$store.dispatch('addConfigArrayItem',{
      "section": "",
      "key":  "remotePrinters", 
      "value": {
        "description": this.printerName,
        "url": this.ipAddress
      }
    })
    
    this.addPrinterDialog = false;
  }
  deletePrinter (index: number): void {
   this.$store.dispatch('deleteConfigArrayItem',{
      "section": "",
      "key":  "remotePrinters", 
      "value": index
    })

  }
  changePrinter (index: number): void {

    this.rightbar = false;
    this.$store.state.printer.printStats.state =  ''
    //this.$store.commit('setPrinterDefault',index)
    if(index ===-1){
      this.$store.commit('websocket/setApiUrl','127.0.0.1:7125')
      this.$socket.setUrl('ws://127.0.0.1:7125/websocket')
    } else {
      this.$store.commit('websocket/setApiUrl',this.$store.state.config.remotePrinters[index].url)
      this.$socket.setUrl('ws://'+this.$store.getters['websocket/getApiUrl']+'/websocket')
    }
    
    this.$router.push('/')
    this.$socket.close()
  }
  serviceStart (service: string): void{
    this.$socket.sendObj(`machine.services.start`,4645,{"service": service})
  }
  serviceStop (service: string): void{
    this.$socket. sendObj(`machine.services.stop`,4645,{"service": service})
  }
  serviceRestart (service: string): void{
    if(service !== 'moonraker')
      this.$socket.sendObj(`machine.services.restart`,4645,{"service": service})
    else
      this.$socket.sendObj(`server.restart`,4656,)
  }
}
</script>
<style>
</style>
