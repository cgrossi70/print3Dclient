<template>
  <v-container>
    <Block :title="$t('History.History')">
      <template v-slot:content>
        <div>
          <v-data-table
            dense
            :headers="headers"
            :items="jobs"
            :options.sync="options"
            :server-items-length="totalJobs"
            :loading="loading"
            class="elevation-1"
          >
          <template v-slot:item.filename="{ item }">
            {{ item.filename.split('/')[item.filename.split('/').length-1] }}
          </template>
          <template v-slot:item.status="{ item }">
            <v-icon color="green" v-if="item.status==='completed'">
              mdi-check-circle-outline
            </v-icon>
            <v-icon color="red" v-if="item.status==='klippy_shutdown' || item.status==='error'">
              mdi-close-circle-outline
            </v-icon>
            <v-icon color="orange" v-if="item.status==='cancelled'">
              mdi-alert-outline
            </v-icon>
            <v-icon color="blue" v-if="item.status==='in_progress'">
              mdi-progress-clock
            </v-icon>

          </template>
          <template v-slot:item.total_duration="{ item }">
            {{ toHHMMSS(item.total_duration) }}
          </template>
          <template v-slot:item.filament_used="{ item }">
            {{ toMETERS(item.filament_used) }} m
          </template>
          <template v-slot:item.metadata.layer_height="{ item }">
            {{ item.metadata.layer_height.toFixed(2) + ' mm' }}
          </template>
          <template v-slot:item.metadata.object_height="{ item }">
            {{ item.metadata.object_height.toFixed(2) + ' m' }}
          </template>
          </v-data-table>
        </div>
      </template>
    </Block>
  </v-container>
</template>
<script lang="ts">
  import { Component, Watch, Vue } from 'vue-property-decorator'
  import axios from 'axios'
  import helpers from '@/mixins/helpers'
  import Block from '@/components/General/Block.vue'

  @Component({
    components: {
      Block
    },
    mixins: [helpers]
  })
  export default class HistoryClass extends Vue {
    totalJobs = 0
    jobs: any[] = []
    loading = true
    options = {page: 1, itemsPerPage: 10}
    headers = [
      {
        text: this.$t('History.Job'),
        align: 'start',
        sortable: false,
        value: 'filename',
      },
      { text: this.$t('History.Status'), value: 'status' },
      { text: this.$t('History.Duracion'),align: 'end', value: 'total_duration' },
      { text: this.$t('History.Filament'),align: 'end', value: 'filament_used' },
      { text: this.$t('History.Layer'),align: 'end', value: 'metadata.layer_height' },
      { text: this.$t('History.Object Height'),align: 'end', value: 'metadata.object_height' },
    ]

    @Watch('webSocketId', { deep: true })
    oncChangeWebSocketId () { this.getDataFromApi() }

    @Watch('options', { deep: true })
    oncChangeOptions () { this.getDataFromApi() }

    getDataFromApi () {
      this.loading = true
      this.fakeApiCall().then((data)=>{

        this.jobs = data.items
        this.totalJobs = data.total
        this.loading = false
      })
    }
    async fakeApiCall  () {
      const { page, itemsPerPage } = this.options
      var items
      const url = 'http://'+this.apiUrl+'/server/history/list?limit=' + itemsPerPage + '&start=' + (page-1)*itemsPerPage + '&order=desc'

      items = await axios.get(url)

      return {
        "items": items.data.result.jobs,
        "total": items.data.result.count,
      }
    }

    get apiUrl():string {
      return this.$store.getters['websocket/getApiUrl']
    }
    get updateMessages ( ) {
      return this.$store.getters['printer/getUpdateMessages']
    }
    get webSocketId(): number {
      return this.$store.getters['websocket/getId']
    }
}
</script>
<style lang="scss" scoped>
</style>
