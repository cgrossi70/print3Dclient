<template>
  <v-container v-if="$store.getters['websocket/getReconnectError']">
    <Block title="Moonraker Connection Error" toolbarColor="red darken-3">
      <template v-slot:content>
        <v-card-text class="text-center" >
          <div class="pa-3 red--text font-weight-bold">
            No se pudo connectar a Moonraker. Revise la configuracion y que el servicio estre correctamente instalado y levantado.
          </div>
          <v-btn
            @click = "reload()"
            color = "red lighten-1"
            class = "mt-3"
            dark
          >
            Reconnect
          </v-btn>
        </v-card-text>
      </template>
    </Block>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
@Component({
  components: {
    Block
  }
})
export default class MoonrakerErrorClass extends Vue {

  reload() {
    this.$socket.close()
    this.$socket.connect()
  }
}
</script>
<style lang="scss" scoped>
</style>
