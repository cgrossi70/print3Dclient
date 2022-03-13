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
            Add Printer
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model = "printerName"
              label="Printer Name"
            >
            </v-text-field>
            <v-text-field
              v-model = "ipAddress"
              label="IP Address"
            >
            </v-text-field>
            <v-row>
              <v-col>
                <v-btn
                  block
                  color = "success"
                  @click = "addPrinter()"
                >
                  Add
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  dark
                  block
                  color = "red darken-2"
                  @click = "addPrinterDialog=false"
                >
                  Cancel
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
              Anfitrion
            </div>

          </v-expansion-panel-header>
          <v-expansion-panel-content color="primary">
            <v-row>
              <v-col cols="1" class="my-0 pb-0">
              </v-col>
              <v-col class="my-0 pb-0 text-caption font-weight-bold">
                Reiniciar
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
                Apagar
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
                Services
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
              <v-subheader>Impresoras</v-subheader>
              <!-- <v-list-item-group
                color="amber"
                v-model="selectedItem"
             > -->
                <v-list-item  v-for="(item,index) in $store.getters.getPrinters" :key="index">
                  <v-list-item-content @click="changePrinter(index)" >
                    {{ item.name }}<br>
                    {{ item.url }}
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn v-if="index !== 0" icon @click="deletePrinter(index)">
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
              Add Printer
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
    this.$store.commit('addPrinter',{
      name: this.printerName,
      url: this.ipAddress
    })
    this.addPrinterDialog = false;
  }
  deletePrinter (index: number): void {
    this.$store.commit('deletePrinter',index)

  }
  changePrinter (index: number): void {
    this.rightbar = false;

    this.$store.state.printer.printStats.state =  ''
    this.$store.commit('setPrinterDefault',index)
    this.$store.commit('websocket/setApiUrl',this.$store.getters.getPrinters[index].url)
    this.$socket.setUrl('ws://'+this.$store.getters['websocket/getApiUrl']+'/websocket')
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
