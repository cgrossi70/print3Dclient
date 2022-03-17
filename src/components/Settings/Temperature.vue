<template>
  <v-container>
    <v-card elevation=0>
      <FormRowInput :title="$t('Settings.HideGraph')" :description="$t('Settings.HideGraphDesc')">
        <template v-slot:control>
            <v-switch dense v-model="hideGraph" class="mt-0"></v-switch>
        </template>
      </FormRowInput>
      <FormRowInput :title="$t('Settings.AutoscaleGraph')" :description="$t('Settings.AutoscaleGraph')">
        <template v-slot:control>
            <v-switch dense v-model="autoscaleGraph" class="mt-0"></v-switch>
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
export default class Temperature extends Vue {
  
  get autoscaleGraph (): boolean {
    return this.$store.getters['getAutoscaleGraph']
  }
  set autoscaleGraph (value: boolean) {
    this.$store.dispatch('setAutoscaleGraph',value)
  }

  get hideGraph (): boolean {
    return this.$store.getters['getHideGraph']
  }
  set hideGraph (value: boolean) {
    this.$store.dispatch('setHideGraph',value)
  }
}
</script>
<style lang="scss" scoped>
</style>
