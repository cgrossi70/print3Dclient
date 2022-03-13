<template>
  <v-dialog
      persistent
      width="400px"
      v-model="dialog"
    >
      <v-card>
        <v-card-text class="text-center pa-5 text-body">
          <div>
            <v-icon x-large>
              mdi-desktop-classic
            </v-icon>
            <v-icon x-large>
              mdi-arrow-right-thick
            </v-icon>
            <v-progress-circular
              indeterminate
              color="grey darken-1"
            ></v-progress-circular>
            <v-icon x-large>
              mdi-arrow-right-thick
            </v-icon>
            <v-icon x-large>
              mdi-server
            </v-icon>
          </div>
        </v-card-text>
        <v-card-title v-if="!$store.getters['websocket/getReconnectError']">
          <div>
            Connecting {{$store.getters['websocket/getReconnectCount']}} de 5
          </div>
        </v-card-title>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend ({
  data:  () => ({

  }),
  computed: {
    dialog: function (): boolean {
      return !this.$store.getters['websocket/getReconnectError'] && this.$store.getters['websocket/getDisconnected']
    },
  },
})
</script>

<style>

</style>
