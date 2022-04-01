
/*
TODO: Solo poner en el menu los servicios que existen
 */

<template>
  <v-container>
    <v-dialog
      persistent
      v-model="dialog"
      width="800"
    >
      <v-card>
        <v-card-title
            class="white--text text-h6 primary"
        >
          {{ $t('Updates.Update') }} {{ servicio }}
        </v-card-title>

        <v-card-text class="pa-0">
            <div ref="divUpdateMessages"  class="ma-2 pa-3 logdiv">
               <p v-for="(message,index) in updateMessages" :key="index">
                {{ message }}
              </p>
            </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-row>
            <v-col>
              <v-btn
                color="error"
                v-if="updateError"
                block
                @click="recoveyRepo"
              >
                {{ $t('Updates.RecoverRepository') }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="success"
                v-if="!isUpgrading"
                @click="close"
                block
              >
                {{ $t('Updates.Close') }}
              </v-btn>
            </v-col>

          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Block :title="$t('Updates.Updates')">
      <span slot="buttons">
        <v-btn
            v-if="!isRefreshing"
            @click="getUpdates(true)"
            icon
            dark
        >
            <v-icon class="white--text justify-end">mdi-refresh</v-icon>
        </v-btn>
        <v-progress-circular
            indeterminate
            color="white"
            v-if="isRefreshing">
        </v-progress-circular>
      </span>
      <v-card-text slot="content">
        <v-row v-for="(service,id) in $store.state.hardware.update.updates.version_info" :key="id">
          <v-col>
            <v-row>
              <v-card-title class="text-body-1 grey--text pb-0 pt-2">{{ id }}</v-card-title>
            </v-row>
            <v-row v-if="id !== 'system'" class="text-caption ml-1">
              {{ $store.state.hardware.update.updates.version_info[id].version }} ->  {{ $store.state.hardware.update.updates.version_info[id].remote_version }}
            </v-row>    
            <v-row v-if="id === 'system'" class="text-caption ml-1">{{ system.package_count }} {{ $t('Updates.Packages') }}</v-row>
          </v-col>
          <v-col align="right">
            <v-btn
              color="green darken-3"
              :outlined="!serviceNeedUpdate(id)"
              @click="serviceNeedUpdate(id) ? updateService(id) : UpToDate(id)"
              small
              dark
            >
              {{ serviceNeedUpdate(id) ? $t('Updates.Update') : $t('Updates.UpToDate') }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
              @click="$store.getters['hardware/update/needUpdate'] ? updateService('full') : UpToDate('Todo ')"
              :outlined="!$store.getters['hardware/update/needUpdate']"
              small
              dark
              color="green darken-4"
            >
              {{  !$store.getters['hardware/update/needUpdate'] ? $t('Updates.UpToDate')  : $t('Updates.UpdateAll') }}
            </v-btn>

          </v-col>
        </v-row>
      </v-card-text>
    </Block>
  </v-container>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Watch, Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
@Component({
  components: {
    Block
  }
})
export default class UpdatesClass extends Vue {
  dialog = false
  servicio = ''
  client=''
  isRefreshing = false
  isUpgrading = false
  updateError = false

  get updateMessages (): string[] {
    return this.$store.getters['hardware/update/getUpdateMessages']
  }
  get webSocketId(): number {
    return this.$store.getters['websocket/getId']
  }

  get moonraker(){
    return this.$store.state.hardware.update.updates.version_info.moonraker
  }
  get klipper(){
    return this.$store.state.hardware.update.updates.version_info.klipper
  }
  get system(){
    return this.$store.state.hardware.update.updates.version_info.system
  }
  get print3Dclient(){
    return this.$store.state.hardware.update.updates.version_info.print3Dclient
  }

  serviceNeedUpdate(service: string): boolean{
    if(service === 'system')
      return this.$store.state.hardware.update.updates.version_info.system.package_count === 0 ? false : true;
    else 
      return this.$store.state.hardware.update.updates.version_info[service].version === this.$store.state.hardware.update.updates.version_info[service].remote_version ? false : true;
  }

  UpToDate (service: string):void {
    this.$store.dispatch('setSnackbar',{
      message: service+ " ya esta actualizado",
      active: true,
    })
  }
  scrollToEnd (): void {
    try{
      var content: any = this.$refs.divUpdateMessages;
      content.scrollTop = content.scrollHeight
    }
    catch{console.log()}
  }
  close(): void {
      this.dialog=false
  }
  recoveyRepo(): void {
    // TODO: Pasar a esquema de axios para poder controlarle facilmente el error ver  updateService
    this.$socket.sendObj('machine.update.recover',4564,{ "name": this.servicio, "hard": false });
  }
  getUpdates (refresh: boolean): void {
    const url = `http://${this.$store.getters['websocket/getApiUrl']}/machine/update/status?refresh=${refresh}`;
    this.isRefreshing = true;
    axios.get(url)
    .then((response) => {
        this.$store.dispatch('hardware/update/setUpdates',response.data)
        this.isRefreshing = false;
    })
    .catch((e) => {
        console.log(e)
    })
  }

  updateService (servicio: string): void {
    this.dialog=true;
    this.servicio=servicio

    this.$store.dispatch('hardware/update/resetUpdateMessages')
    this.isUpgrading = true

    const url = `http://${this.$store.getters['websocket/getApiUrl']}/machine/update/${servicio}`;
    axios.post(url)
    .then(() => {
      this.isUpgrading = false;
    })
    .catch((e) => {
      console.log(e)
      this.updateError = true;
      this.isUpgrading=false;
    })
  }
  updateClient (client: string): void {
    this.dialog=true;
    this.client=client

    this.$store.dispatch('hardware/update/resetUpdateMessages')
    this.isUpgrading = true

    const url = `http://${this.$store.getters['websocket/getApiUrl']}/machine/update/client?name=${client}`;
    axios.post(url)
    .then(() => {
      this.isUpgrading = false;
    })
    .catch((e) => {
      console.log(e)
      this.updateError = true;
      this.isUpgrading=false;
    })
  }

  @Watch('webSocketId', { immediate: true, deep: true })
    onwebSocketIdChanged(): void { this.getUpdates(false) }

  updated():void {
    this.$nextTick(() => this.scrollToEnd());
  }
}
</script>

<style>
.logdiv {
    border: 1px solid #bbbbbb;
    height: 380px;
    overflow-y: auto
}
</style>