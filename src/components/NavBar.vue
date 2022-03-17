<template>
  <v-container>
      <v-app-bar app clipped-left dense color="primary" dark>
       <v-app-bar-nav-icon @click="$store.state.sidebar = !$store.state.sidebar"></v-app-bar-nav-icon>
        <v-app-bar-title> {{ $store.getters['getPrinterName'] }}</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn
        @click="emergencyStop"
        color="amber"
        text
      >
        <v-icon>
          mdi-alert-octagon
        </v-icon>
        {{ $t('Menubar.EmergencyStop') }}
      </v-btn>

      <v-btn text @click="$store.state.rightbar = !$store.state.rightbar">
        <v-icon>
          mdi-dots-vertical
        </v-icon>
      </v-btn>

      <!-- <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text dark v-bind="attrs" v-on="on">
              <v-icon>mdi-cog</v-icon>
              Services
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item  @click="settingsMenu(item.action,item.service)" v-for="(item, index) in menuItems" :key="index">
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div> -->
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class NavBarClass extends Vue {
  private menuItems = [
      { title: 'Klipper Stop', action: 'stop', service: 'klipper' },
      { title: 'Klipper Start', action: 'start', service: 'klipper' },
      { title: 'Klipper Restart', action: 'restart', service: 'klipper' },
      { title: 'Webcam Stop', action: 'stop',service: 'webcamd' },
      { title: 'Webcam Start', action: 'start',service: 'webcamd' },
      { title: 'Webcam Restart', action: 'restart',service: 'webcamd' },
  ]
  emergencyStop(): void {
     this.$socket.sendObj( "printer.emergency_stop",4564)
   }
}
</script>
<style>
</style>
