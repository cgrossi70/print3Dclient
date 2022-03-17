<template>
    <v-card elevation="0">
      <v-card-text>
      <FormRowInput :title="$t('Settings.PrinterName')" :description="$t('Settings.PrinterNameDesc')">
        <template v-slot:control>
          <v-text-field height="40px" dense class="text-caption" hide-details="auto" v-model="printerName" outlined></v-text-field>
        </template>
      </FormRowInput>
      <FormRowInput :title="$t('Settings.Language')" :description="$t('Settings.LanguageDesc')">
        <template v-slot:control>
          <v-select  hide-details="auto" class="text-caption"  outlined :items="languages" v-model="language"></v-select>
        </template>
      </FormRowInput>
      <FormRowInput :title="$t('Settings.ConfimEmergencyStop')" :description="$t('Settings.ConfimEmergencyStopDesc')">
        <template v-slot:control>
          <v-switch dense v-model="confirmEmergencyStop" class="mt-0"></v-switch>
        </template>
      </FormRowInput>
      </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FormRowInput from '@/components/General/FormRowInput.vue'
@Component ({
  components:{
    FormRowInput
  }
})
export default class General extends Vue {
  
  languages = ['Spanish', 'English']

  get printerName (): string {
    return this.$store.getters['getPrinterName']
  }
  set printerName (name: string ) {
    this.$store.dispatch('setPrinterName',name)
  }

  get confirmEmergencyStop (): boolean {
    return this.$store.getters['getConfirmEmergencyStop']
  }
  set confirmEmergencyStop (value: boolean ) {
    this.$store.dispatch('setConfirmEmergencyStop',value)
  }

  get language (): string {
    return this.$store.getters['getLanguage']
  }
  set language (language: string ) {
    this.$i18n.locale = language === 'English' ? 'en' : 'es'
    this.$store.dispatch('setLanguage',language)
  }
}
</script>
<style lang="scss">
.v-text-field .v-input__control .v-input__slot {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
  }
</style>
