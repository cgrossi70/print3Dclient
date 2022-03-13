<template>
  <v-container>
  <!--
  Toolbar con el titlo del estado que toma de system_stats
  si este es distinto de ready y de print_stats si
  system_stats es ready
  -->
  <Block :title="state" leftIcon="mdi-alert-circle">
    <template v-slot:buttons>
      <v-btn
        v-if="state === 'complete'"
        x-small
        text
        @click="resetPrint"
      >
        <v-icon
          color="white"
        >
          mdi-broom
        </v-icon>
      </v-btn>
      <v-btn
        v-if="state === 'printing'"
        x-small
        text
        @click="pausePrint"
      >
        <v-icon
          color="amber"
        >
          mdi-pause
        </v-icon>
      </v-btn>
      <v-btn
        v-if="state === 'paused'"
        x-small
        text
        @click="resumePrint"
      >
        <v-icon
          color="green lighten-2"
        >
          mdi-play
        </v-icon>
      </v-btn>
      <v-btn
        v-if="state === 'printing' || state === 'paused'"
        x-small
        text
        @click="cancelPrint"
      >
        <v-icon
          color="red lighten-2"
        >
          mdi-stop
        </v-icon>

      </v-btn>
    </template>

    <template v-slot:content>
      <v-card-text v-if="isError">
          <div>
            {{ message }}
          </div>

          <v-btn
              @click="restartFirmware"
              class="mt-5"
              small
              color="success"
              dark
          >
              RESTART FIRMAWARE
          </v-btn>
      </v-card-text>

      <v-card-text v-if="isPrinting" >
        <v-img width="100px" src="http://192.168.0.108/server/files/gcodes/Varios_Casa/.thumbs/Regaton%20Esponjero.png"></v-img>
        Archivo: {{ $store.getters['printer/getPrintStats'].filename }}
      </v-card-text>
      <!-- Si el estado en print_stats es distionto de errors muetro las estadisticas -->
      <!-- ************************************************************************************************************************************************************************************  -->
      <v-card-text v-if="! isError ">
          <v-row align="center">
            <v-col cols="1" >
              <v-icon large>mdi-crosshairs</v-icon>
            </v-col>
            <v-col>
              <v-simple-table class="pa-0 ma-0">
                  <thead>
                      <th class="text-center">X</th>
                      <th class="text-center">Y</th>
                      <th class="text-center">Z</th>
                  </thead>
                  <tbody>
                      <td style="width: 33%" class="text-center">{{ $store.getters['printer/getPosition'].x }}</td>
                      <td style="width: 33%" class="text-center">{{ $store.getters['printer/getPosition'].y }}</td>
                      <td style="width: 33%" class="text-center">{{ $store.getters['printer/getPosition'].z }}</td>
                  </tbody>
                </v-simple-table>
              </v-col>
          </v-row>
          <v-row v-if="isPrinting" >
            <v-col cols="1" >
              <v-icon large>mdi-chart-bar</v-icon>
            </v-col>
            <v-col>
              <!-- A partir de aca solo muetro si es distinto de standby -->
              <v-simple-table  class="pa-0 ma-0">
                <thead >
                    <th style="width: 33%" class="text-center">Filament</th>
                    <th style="width: 33%" class="text-center">Print</th>
                    <th style="width: 33%" class="text-center">Total</th>
                </thead>
                <tbody>
                    <td  class="text-center">{{ Number($store.getters['printer/getPrintStats'].filament_used).toFixed(2) }} mm</td>
                    <td class="text-center">{{ Number($store.getters['printer/getPrintStats'].print_duration).toFixed(2) }}</td>
                    <td class="text-center">{{ Number($store.getters['printer/getPrintStats'].total_duration).toFixed(2) }}</td>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
      </v-card-text>
    </template>


  </Block>
<!--
 -->

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
@Component({
  components: {
    Block
  }
})
export default class PrintStatusClass extends Vue {
   get isPrinting (){
    return this.$store.getters['printer/getMasterStatus'].state === 'printing' ||
      this.$store.getters['printer/getMasterStatus'].state === 'complete' ||
      this.$store.getters['printer/getMasterStatus'].state === 'paused' ||
      this.$store.getters['printer/getMasterStatus'].state === 'canceled'
  }
  get state (): string {
    return this.$store.getters['printer/getMasterStatus'].state
  }
  get message (): string {
    return this.$store.getters['printer/getMasterStatus'].message
  }
  get isError (): boolean {
    return this.$store.getters['printer/getMasterStatus'].state === 'error' ||
      this.$store.getters['printer/getMasterStatus'].state === 'shutdown' ||
      this.$store.getters['printer/getMasterStatus'].state === 'startup';
  }

  restartFirmware () {
      this.$socket.sendObj("printer.firmware_restart",8463)
  }
  resetPrint (){
    this.$socket.sendCommand("SDCARD_RESET_FILE")
  }
  pausePrint () {
    this.$socket.sendObj("printer.print.pause",4564)
  }
  resumePrint () {
    this.$socket.sendObj("printer.print.resume",1465)
  }
  cancelPrint () {
    this.$socket.sendObj("printer.print.cancel",2578)
  }
}
</script>
<style>
</style>
