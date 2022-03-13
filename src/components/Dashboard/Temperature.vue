// IMPROVE: Apagar y prender trazos
// IMPROVE: Mejorar el tema de los colores
// IMPROVE: Agregar el tema  del PWM en el grafico
<template>
  <v-container>
    <Block :title="$t('Temperatures.Temperatures')">
      <template v-slot:buttons>
        <v-btn
            text
            dark
            @click="coolDown"
        >
            {{ $t('Temperatures.Cooldown') }}
        </v-btn>
        <v-menu offset-y left>
          <template v-slot:activator="{on,attrs}">
            <v-btn
              color="prymary"
              text
              v-bind="attrs"
              v-on="on"
              small
            >
              <v-icon>
                mdi-cog
              </v-icon>
            </v-btn>
          </template>
          <v-list>
              <v-list-item class = "minHeight36">
                <v-checkbox
                  class="mt-0"
                  v-model="hideTempGraph"
                  hide-details
                  :label = "$t('Temperatures.HideGraph')"
                ></v-checkbox>
              </v-list-item>
              <v-list-item class = "minHeight36">
                <v-checkbox
                  class="mt-0"
                  v-model="autoscaleTempGraph"
                  hide-details
                  :label = "$t('Temperatures.AutoscaleGraph')"
                ></v-checkbox>
              </v-list-item>

          </v-list>
        </v-menu>
      </template>
      <template v-slot:content>
        <v-simple-table dense >
            <template v-slot:default>
            <thead>
                <tr >
                    <th
                        v-for="title,id in titles"
                        :key="id"
                        class="text-left"
                    >
                        {{ title }}
                    </th>
                </tr>
            </thead>
            <tbody>
              <tr
                v-for="(sensor,id) in $store.getters['printer/getSensors']"
                :key="id">
                    <td>{{ sensor.name }}
                    </td>
                    <td align="center">
                      <v-icon
                        :color="sensor.code === 'extruder' ? 'blue' :
                                sensor.code === 'heater_bed' ? 'green' :
                                sensor.code === 'temperature_sensor raspberry_pi' ? 'red' : 'black'"
                        x-small
                      >
                        mdi-circle
                      </v-icon>
                    </td>
                    <td class="text-right">
                        {{ sensor.power === undefined ? 0 : (sensor.power * 100).toFixed(0) }} %
                    </td>
                    <td class="text-right">
                        {{ (sensor.temperature).toFixed(1)}} ºC
                    </td>
                    <td width="15px">
                        <v-text-field
                            class="text-caption"
                            height="15px"
                            v-if="sensor.isHeater"
                            v-model="sensor.target"
                            v-on:keyup.enter = "heatHeater(sensor)"
                            v-on:keyup.tab = "heatHeater(sensor)"
                        ></v-text-field>
                    </td>
                </tr>

            </tbody>
            </template>
        </v-simple-table>
        <v-card v-if="!hideTempGraph" >
          <div style="height: 300px; margin: 0px; padding :0px;">
            <Chart/>
          </div>
        </v-card>
      </template>
    </Block>
  </v-container>
</template>

<script lang="ts">
import { Sensor } from '@/store/printer/types.ts'
import Block from '@/components/General/Block.vue'
import Chart from '@/components/Dashboard/Chart.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Chart,
    Block
  }
})
export default class TemperaturesClass extends Vue {
  settings : 0
  hideGraph: false
  autoscalegraph: false
  titles = [this.$t("Temperatures.Sensors"),
            this.$t("Temperatures.Color"),
            this.$t("Temperatures.heater"),
            this.$t("Temperatures.Temperature"),
            this.$t("Temperatures.Target")]

  get heaters(): Sensor[] {
    return this.$store.getters['printer/getSensors']
  }

  get autoscaleTempGraph (): boolean {
    return this.$store.getters['getAutoscaleTempGraph']
  }
  set autoscaleTempGraph (value: boolean) {
    this.$store.dispatch('setAutoscaleTempGraph',value)
  }

  get hideTempGraph (): boolean {
    return this.$store.getters['getHideTempGraph']
  }
  set hideTempGraph (value: boolean) {
    this.$store.dispatch('setHideTempGraph',value)
  }

  coolDown (): void {
      const command = "TURN_OFF_HEATERS"
      this.$socket.sendCommand(command)
  }
  heatHeater (sensor: Sensor): void {
      const command = `SET_HEATER_TEMPERATURE HEATER=${sensor.code} TARGET=${sensor.target}`
      this.$socket.sendCommand(command)
  }
}
</script>
<style>
.minHeight36 {
  min-height: 24px;
}
</style>
