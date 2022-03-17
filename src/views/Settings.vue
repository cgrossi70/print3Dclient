<template>
  <v-container>
    <Block :title="$t('Settings.General')" toolbarColor="primary">
      <template v-slot:content>
        <v-expansion-panels accordion>
          <v-expansion-panel >
            <v-expansion-panel-header class="my-0 py-0" color="indigo lighten-4">
              <span class="text-button">{{ $t('Settings.General') }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <General/>
            </v-expansion-panel-content>
          </v-expansion-panel >
          <v-expansion-panel >
            <v-expansion-panel-header  class="my-0 py-0" color="indigo lighten-4">
              <span class="text-button">{{ $t('Settings.Console') }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Console/>
            </v-expansion-panel-content>
          </v-expansion-panel >
          <v-expansion-panel >
            <v-expansion-panel-header  class="my-0 py-0" color="indigo lighten-4">
              <span class="text-button">{{ $t('Settings.Temperature') }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Temperature/>
            </v-expansion-panel-content>
          </v-expansion-panel>

        </v-expansion-panels>
        <Auxiliar/>
      </template>
    </Block>
  </v-container>
</template>
<script lang="ts">

interface Headers {
  text: string,
  align: string,
  sortable: boolean,
  value: string,
}

import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
import General from '@/components/Settings/General.vue'
import Temperature from '@/components/Settings/Temperature.vue'
import Console from '@/components/Settings/Console.vue'
import Auxiliar from '@/views/Auxiliar.vue'
@Component({
  components: {
    Block,
    General,
    Console,
    Temperature,
    Auxiliar
  }
})
export default class Settings extends Vue {

}
</script>
<style lang="scss" scoped>
</style>
