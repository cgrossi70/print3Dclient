<template>
    <v-container class="mb-5">
      <Block :title="$t('Hardware.HardwareDetails')">
        <v-card-text slot="content">
            <v-row class="align-center ">
                <v-col class="py-0" cols="11" lg="8" xl="9">
                    <v-card-title class="grey--text pb-0">{{ $t('Hardware.Host' )}}</v-card-title>
                    <v-card-text class="pb-0">
                        <span class="text-uppercase font-weight-bold text-lg-caption">{{ $t('Hardware.CPU') }}: </span>
                        <span class="text-lg-caption">{{host_cpu_info.description }}</span>
                        <br/>
                        <span class="text-uppercase font-weight-bold text-lg-caption">{{ $t('Hardware.Architecture') }}: </span>
                        <span class="text-lg-caption">{{host_cpu_info.processor}}</span>
                        <br/>
                        <span class="text-uppercase font-weight-bold text-lg-caption">{{ $t('Hardware.Memory') }}: </span>
                        <span class="text-lg-caption">{{ Number(host_cpu_info.totalMemory/1024/1024,2).toFixed(2)}} Mb</span>
                        <br/>
                        <span class="text-uppercase font-weight-bold text-lg-caption">{{ $t('Hardware.CPUCount') }}: </span>
                        <span class="text-lg-caption">{{ host_cpu_info.cpuCount }}</span>
                        <br/>
                        <span class="text-uppercase font-weight-bold text-lg-caption">{{ $t('Hardware.OS') }}: </span>
                        <span class="text-lg-caption">{{ host_cpu_info.soDistribution }}</span>
                    </v-card-text>
                </v-col>
                <v-col class="py-0" lg="3" xl="3">
                    <v-progress-circular
                        :rotate="-90"
                        :size="100"
                        :width="25"
                        :value="host_cpu_info.systemCpuUsage"
                        color="teal"
                    >
                        {{  host_cpu_info.systemCpuUsage }}
                    </v-progress-circular>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="py-0" cols="11" lg="8" xl="9">
                    <v-card-title class="grey--text py-0">{{ $t('Hardware.MCU') }}</v-card-title>
                    <v-card-text>
                            <span class="text-uppercase font-weight-bold text-lg-caption">{{ $t('Hardware.Type') }}: </span>
                            <span class="text-lg-caption">{{ mcu_info.name }}</span>
                            <br/>
                            <span class="text-uppercase font-weight-bold text-lg-caption">{{ $t('Hardware.Version') }}: </span>
                            <span class="text-lg-caption">{{ mcu_info.version }}</span>
                            <br/>
                            <span class="text-uppercase font-weight-bold text-lg-caption">{{ $t('Hardware.Memory') }}: </span>
                            <span class="text-lg-caption">{{ mcu_info.frequency }}</span>
                        </v-card-text>
                </v-col>
                <v-col class="py-0" lg="3" xl="3">
                    <v-progress-circular
                        :rotate="-90"
                        :size="100"
                        :width="25"
                        :value="mcu_info.cpuLoad"
                        color="teal"
                    >
                        {{  mcu_info.cpuLoad }}
                    </v-progress-circular>
                </v-col>
            </v-row>
        </v-card-text>
      </Block>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'

@Component({
  components: {
    Block
  }
})
export default class MachineClass extends Vue {
  get host_cpu_info() {
    return this.$store.getters['hardware/getHostCpuInfo']
  }
  get mcu_info()  {
    return this.$store.getters['printer/getMcuInfo']
  }
}
</script>

<style>

</style>
