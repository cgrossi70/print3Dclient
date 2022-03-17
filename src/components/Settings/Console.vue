<template>
  <v-container>
    <v-card elevation=0>
      <FormRowInput :title="$t('Settings.HideTemperature')" :description="$t('Settings.HideTemperatureDesc')">
        <template v-slot:control>
            <v-switch dense v-model="hideTemperature" class="mt-0"></v-switch>
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
  
  get hideTemperature (): boolean {
    return this.$store.getters['getHideTemperature']
  }
  set hideTemperature (value: boolean ) {
    this.$store.state.dispatch('hideTemperature', value)
  }
}
</script>
<style lang="scss" scoped>
</style>
