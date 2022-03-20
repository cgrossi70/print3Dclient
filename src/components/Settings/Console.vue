<template>
  <v-container>
    <v-card elevation=0>
      <FormRowInput :title="$t('Settings.HideTemperature')" :description="$t('Settings.HideTemperatureDesc')">
        <template v-slot:control>
            <v-switch dense v-model="hideTemperature" class="mt-0"></v-switch>
        </template>
      </FormRowInput>
      <FormRowInput :title="$t('Settings.ConsoleHeight')" :description="$t('Settings.ConsoleHeightDesc')">
        <template v-slot:control>
          <v-row>
            <v-col cols="12" xl="2">{{ consoleHeight }} px</v-col>
            <v-col cols="12" xl="10"><v-slider
              v-model="consoleHeight"
              min = "200"
              max = "600"
            ></v-slider></v-col>
          </v-row>
        </template>
      </FormRowInput>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FormRowInput from '@/components/General/FormRowInput.vue'
@Component ({
  components: {
    FormRowInput
  }
})
export default class Console extends Vue {

  get consoleHeight (): number {
    return this.$store.state.config.consoleHeight
  }
  set consoleHeight (value: number ) {
    this.$store.dispatch('setConfigItem',{"item": "consoleHeight","value": value})
  }

  get hideTemperature (): boolean {
    return this.$store.getters['getHideTemperature']
  }
  set hideTemperature (value: boolean ) {
    // this.$store.dispatch('hideTemperature', value)
    this.$store.dispatch('setConfigItem',{"item": "hideTemperature","value": value})
  }
}
</script>
<style lang="scss" scoped>
</style>
