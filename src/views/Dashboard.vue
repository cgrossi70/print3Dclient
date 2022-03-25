<template>
    <v-container >
          <v-row>
            <v-col xl="3" lg="5">
                <v-row><MoonrakerError/></v-row>
                <v-row><MoonrakerWarnings v-if="$store.getters['printer/getMoonrakerWarnings'].length !== 0" /></v-row>
                <v-row v-if="isConnected"><PrinterStatus /></v-row>
                <v-row v-if="!isError"><Controls/></v-row>
                <v-row><Outputs v-if="!isError"/></v-row>
                <v-row v-if="!isError && $vuetify.breakpoint.name !== 'xl'"></v-row>
            </v-col>
            <v-col xl="5" lg="7">
                <v-row>
                    <Temperature v-if="!isError"/>
                    <Console v-if="isConnected" :divHeight="consoleHeight"/>
                </v-row>
                <v-row v-if="$vuetify.breakpoint.name !== 'xl'">
                    <Console v-if="isConnected" :divHeight="consoleHeight"/>
                </v-row>

            </v-col >
            <v-col xl="4" v-if="$vuetify.breakpoint.name === 'xl'">
              <v-row>
                <Macros/>
              </v-row>
              <v-row>
                <Auxiliar/>
              </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Temperature from '@/components/Dashboard/Temperature.vue'
import MoonrakerWarnings from '@/components/Dashboard/MoonrakerWarnings.vue'
import Controls from '@/components/Dashboard/Controls.vue'
import Console from '@/components/Dashboard/Console.vue'
import PrinterStatus from '@/components/Dashboard/PrinterStatus.vue'
import MoonrakerError from '@/components/Dashboard/MoonrakerError.vue'
import Outputs from '@/components/Dashboard/Outputs.vue'
import Macros from '@/components/Dashboard/Macros.vue'
import Auxiliar from '@/views/Auxiliar.vue'

@Component({
  components: {
      Auxiliar,
      MoonrakerWarnings,
      Temperature,
      Controls,
      Console,
      PrinterStatus,
      Outputs,
      MoonrakerError,
      Macros
  }
})
export default class DashboardClass extends Vue {
  get consoleHeight(): string{
    return this.$store.state.config.console.consoleHeight+"px"
  }
  get isConnected (): boolean {
    return this.$store.getters['websocket/getConnected']
  }
  get masterStatus(): string {
    return this.$store.getters['printer/getMasterStatus'].state
  }
  get isError (): boolean {
    return this.masterStatus === 'error' ||
      this.masterStatus === 'shutdown' ||
      this.masterStatus === 'startup';
  }

}
</script>
<style>
</style>
