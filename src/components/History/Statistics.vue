<template>
<v-container id="">
  <Block :title="$t('History.Statistics')">
    <template v-slot:content>
      <v-row class="ma-1">
        <v-col align="center">
          <v-card outlined tile class="pa-2">
            <h5 class="grey--text">{{ $t('History.Total Jobs') }}</h5>
            <h3 >{{stats.total_jobs}}</h3>
            <h5 class="grey--text">{{ $t('History.Largest Job') }}</h5>
            <h3 >{{toHHMMSS(stats.longest_print)}}</h3>
          </v-card>
        </v-col>
        <v-col align="center">
          <v-card outlined tile class="pa-2">
            <h5 class="grey--text">{{ $t('History.Total Time') }}</h5>
            <h3 >{{toHHMMSS(stats.total_time)}}</h3>
            <h5 class="grey--text">{{ $t('History.Total Average') }}</h5>
            <h3 >{{toHHMMSS(Math.round(stats.total_time/stats.total_jobs))}}</h3>
          </v-card>
        </v-col>
        <v-col align="center">
          <v-card outlined tile class="pa-2">
            <h5 class="grey--text">{{ $t('History.Print Total') }}</h5>
            <h3 >{{toHHMMSS(stats.total_print_time)}}</h3>
            <h5 class="grey--text">{{ $t('History.Print Average') }}</h5>
            <h3 >{{toHHMMSS(Math.round(stats.total_print_time/stats.total_jobs))}}</h3>
          </v-card>
        </v-col>
        <v-col align="center">
          <v-card outlined tile class="pa-2">
            <h5 class="grey--text">{{ $t('History.Filament Total') }} </h5>
            <h3 >{{toMETERS(stats.total_filament_used)}} m</h3>
            <h5 class="grey--text">{{ $t('History.Filament Average') }}</h5>
            <h3 >{{toMETERS(stats.total_filament_used/stats.total_jobs)}} m</h3>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </Block>
</v-container>
</template>
<script lang="ts">
import helpers from '@/mixins/helpers.ts'
import Block from '@/components/General/Block.vue'

import { Component, Vue} from 'vue-property-decorator'
@Component({
  components:{
    Block
  },
  mixins: [helpers]
})
export default class StatisticsClass extends Vue {
  get stats(){
    return this.$store.getters['printer/getHistoryStats'];
  }
}
</script>
<style lang="scss" scoped>
  div.v-card {
    border: 1px solid #cccccc;
  }
</style>
