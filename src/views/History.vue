<template>
  <div id="">
    <v-row>
      <v-col >
        <Statistics/>
      </v-col>
    </v-row>
    <v-row class="pt-0 mt-0">
      <v-col class="pt-0 mt-0" >
        <History/>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import History from '@/components/History/History.vue'
import Statistics from '@/components/History/Statistics.vue'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
    Statistics,
    History
  }
})
export default class HistoryClass extends Vue {

}
</script>
<style lang="scss" scoped>
</style>
