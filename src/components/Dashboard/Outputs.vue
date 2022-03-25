<template>
  <v-container>
      <Block :title="$t('Outputs.Outputs')">
      <template v-slot:content>
        <v-card-text>

              <v-slider
                  class = "mt-7 py-0 mb-0"
                  v-model="fanSpeed"
                  append-icon="mdi-fan"
                  prepend-icon="mdi-fan-off"
                  @end="fanChange()"
                  @click:prepend="stopFan()"
                  @click:append="fullFan()"
                  :thumb-size="24"
                  thumb-label="always"
                  max="100"
                  min="0"
              ></v-slider>
              <v-switch
                class = "my-0 py-0"
                v-model="beeper"
                prepend-icon="mdi-volume-high"

                @change = "handleBeeper"
              ></v-switch>
          </v-card-text>
      </template>
    </Block>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
@Component({
  components: {
    Block
  }
})
export default class OutputClass extends Vue {
  private beeper = false

  get fanSpeed() {
    return this.$store.getters['printer/getFanSpeed'];
  }
  set fanSpeed(newValue) {
    this.$store.state.printer.fanSpeed = newValue
  }

  fanChange() {
      this.$socket.sendCommand("M106 S"+Math.floor(this.fanSpeed*255/100))
  }
  stopFan(){
    this.fanSpeed = 0
    this.$socket.sendCommand("M106 S"+Math.floor(this.fanSpeed*255/100))
  }
  fullFan(){
    this.fanSpeed = 100
    this.$socket.sendCommand("M106 S"+Math.floor(this.fanSpeed*255/100))
  }
  handleBeeper() {
    if(this.beeper)
      this.$socket.sendCommand('SET_PIN PIN=beeper VALUE=1')
    else
      this.$socket.sendCommand('SET_PIN PIN=beeper VALUE=0')
  }
}
</script>

<style>
div.v-messages.theme--light {
  min-height: 0px
}
</style>
