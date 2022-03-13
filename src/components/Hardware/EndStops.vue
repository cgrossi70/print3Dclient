<template>
    <v-container class="py-0 my-0">
      <Block :title="$t('Endstops.Endstops')">
        <template v-slot:buttons>
          <v-btn @click="queryEndstops" text x-small>
              <v-icon class="white--text justify-end">mdi-refresh</v-icon>
          </v-btn>
        </template>

        <template v-slot:content>
          <v-card-text  v-if="endstopX !== ''">
              <div id="chips-container">
                  <span class="text-lg-caption">{{ $t('Endstops.EndStop X') }}:</span>
                  <v-chip x-small :class="`ml-5 text-uppercase font-weight-bold justify-center white--text ${endstopX}`">{{ endstopX }}</v-chip>
              </div>
              <div id="chips-container">
                  <span class="text-lg-caption">{{ $t('Endstops.EndStop Y') }}:</span>
                  <v-chip x-small :class="`ml-5 text-uppercase font-weight-bold justify-center white--text ${endstopY}`">{{ endstopY }}</v-chip>
              </div>
              <div id="chips-container">
                  <span class="text-lg-caption">{{ $t('Endstops.EndStop Z') }}:</span>
                  <v-chip x-small :class="`ml-5 text-uppercase font-weight-bold justify-center white--text ${endstopZ}`">{{ endstopZ }}</v-chip>
              </div>
          </v-card-text>
          <v-card-text v-if="endstopX === ''">
                  {{ $t('Endstops.PushRefreshButton') }}
          </v-card-text>
        </template>
      </Block>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
import axios from 'axios';

@Component({
  components: {
    Block
  }
})
export default class EndStopsClass extends  Vue {
  endstopX = ''
  endstopY = ''
  endstopZ = ''

  queryEndstops(): void {
      //const that = this
      const url = `http://${this.$store.getters['websocket/getApiUrl']}/printer/query_endstops/status`

      axios.get(url)
      .then((response) => {
          this.endstopX = response.data.result.x;
          this.endstopY = response.data.result.y;
          this.endstopZ = response.data.result.z;
      })
      .catch (() => {
          this.endstopX = "failure";
          this.endstopY = "failure";
          this.endstopZ = "failure";
      })
  }
}
</script>

<style>
#chips-container .v-chip.open {
  background: green;
  width:90px;
}
#chips-container .v-chip.TRIGGERED {
  background: tomato;
  width:90px;
}
#chips-container .v-chip.failure {
  background: black;
  width:90px;
}
</style>
