// TODO: Ver el tema de las macros

<template>
  <v-app >
    <ReconnectDialog/>
    <NavBar/>
    <SideBar/>
    <RightBar/>

    <v-main class="py-0 my-0 grey lighten-2">
      <router-view/>
    </v-main>
    <v-snackbar
      v-model="snackbar.active"
      :color="snackbar.color"
      timeout="2000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue';
import RightBar from '@/components/RightBar.vue';
import ReconnectDialog from '@/views/ReconnectDialog.vue';
@Component({
  components: {
    NavBar,
    SideBar,
    ReconnectDialog,
    RightBar
  }
})
export default class AppClass extends Vue{
  get snackbar() {
    return this.$store.getters.getSnackbar
  }
  mounted(): void {
    //this.$store.commit('websocket/setApiUrl',window.location.hostname+':7125')
    this.$store.commit('websocket/setApiUrl','192.168.0.5:7125')
    this.$socket.setUrl('ws://'+this.$store.getters['websocket/getApiUrl']+'/websocket')
    this.$socket.connect()
  }
}
</script>
