<template>
  <v-container>
    <Block title="Controls">
      <template v-slot:buttons>
        <v-btn

          text
          @click="$socket.sendCommand('M84')"
          dark
        >
          Motor Off
        </v-btn>
      </template>

      <template v-slot:content>
        <v-card-text v-if="canMove">
            <v-row>
                <v-col class="text-center">
                    <v-btn
                        color="orange"
                        dark
                        @click="home('')"
                        small
                        tile
                    >
                        <v-icon small>mdi-home</v-icon>
                        All
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col lg="12" xl="12" >
                    <v-btn
                        v-for="(movementX,id) in movementsX" :key="id"
                        :color="movementX.color"
                        dark
                        small
                        tile
                        @click="movementX.label === 'X' ? home('X') : move('X',movementX.label)"
                    >
                        <v-icon small v-if="movementX.label==='X'">
                            mdi-home
                        </v-icon>
                        {{movementX.label}}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row  class="justify-between">
                <v-col lg="12" xl="12" >
                    <v-btn
                        v-for="(movementY,id) in movementsY" :key="id"
                        :color="movementY.color"
                        dark
                        small
                        @click="movementY.label === 'Y' ? home('Y') : move('Y',movementY.label)"

                    >
                        <v-icon small v-if="movementY.label==='Y'">
                            mdi-home
                        </v-icon>
                        {{movementY.label}}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row  class="justify-between">
                <v-col lg="12" xl="12" >
                    <v-btn
                        v-for="(movementZ,id) in movementsZ" :key="id"
                        :color="movementZ.color"
                        dark
                        small
                         @click="movementZ.label === 'Z' ? home('Z') : move('Z',movementZ.label)"
                    >
                        <v-icon small v-if="movementZ.label==='Z'">
                            mdi-home
                        </v-icon>
                        {{movementZ.label}}
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text v-if="canExtrude">
            <v-row>
                <v-col>
                    <v-text-field
                        dense
                        label = "Extrude Lage (in mm)"
                        v-model = "extrudeLarge"
                    ></v-text-field>
                </v-col>
                <v-col >
                    <v-text-field
                        dense
                        label = "Extrude velocity (in mm/s)"
                        v-model = "extrudeVelocity"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row class="mt-0">
                <v-col class="pt-0 text-center">
                    <v-btn
                        @click="extrude()"
                        block
                        color="success"
                        dark
                        small
                    >
                        Extrude
                    </v-btn>
                </v-col>
                <v-col class="pt-0 text-center">
                    <v-btn
                        @click="retract()"
                        color="success"
                        block
                        dark
                        small
                    >
                        Retract
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text
          v-if="canFlow"
          class="my-0 py-0"
        >
          <v-row align="center" class="my-0 py-0">

            <v-col class="pa-0">
              <v-text-field
              label="Flow"
                class="right-input mb-0 pb-0"
                dense
                suffix="%"
                prepend-inner-icon="mdi-restart"
                height="15px"
                outlined
                @click:prepend-inner = "resetFlow"
                @keydown.enter="flowChange"
                @blur="flowChange"
                v-model="flow"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Feed Speed"
                class="right-input ma-0 pa-0"
                dense
                suffix="%"
                prepend-inner-icon="mdi-restart"
                height="15px"
                @click:prepend-inner = "resetFeedSpped"
                @keydown.enter="feedSpeedChange"
                @blur="feedSpeedChange"
                outlined
                v-model="feedSpeed"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-n10 py-0">
            <v-col>
              <v-slider
                  v-model="flow"
                  height="10px"
                  @change="flowChange()"
                  max="200"
                  min="0"
              ></v-slider>
            </v-col>
            <v-col>
              <v-slider

                  v-model="feedSpeed"
                  height="10px"
                  @change="feedSpeedChange()"
                  max="200"
                  min="0"
              ></v-slider>
            </v-col>
          </v-row>
        </v-card-text>
      </template>
    </Block>
  </v-container>
</template>

<script lang="ts">
import { Sensor } from '@/store/printer/types.ts'
import { Component, Vue} from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
@Component({
  components: {
    Block
  }
})
export default class ControlsClass extends Vue {
  feedSpeed = 100
  flow = 100
  extrudeLarge = 10
  // TODO: por ahora la velocidad va fija ver como calcularla
  extrudeVelocity = 5
  movementsX = [   {label:'-50',color:"primary"},
                  {label:'-10',color:"primary"},
                  {label:'-1',color:"primary"},
                  {label:'X',color:"orange"},
                  {label:'+1',color:"primary"},
                  {label:'+10',color:"primary"},
                  {label:'+50',color:"primary"}
  ]
  movementsY = [   {label:'-50',color:"primary"},
                  {label:'-10',color:"primary"},
                  {label:'-1',color:"primary"},
                  {label:'Y',color:"orange"},
                  {label:'+1',color:"primary"},
                  {label:'+10',color:"primary"},
                  {label:'+50',color:"primary"}
  ]
  movementsZ = [   {label:'-25',color:"primary"},
                  {label:'-5',color:"primary"},
                  {label:'-1',color:"primary"},
                  {label:'Z',color:"orange"},
                  {label:'+1',color:"primary"},
                  {label:'+5',color:"primary"},
                  {label:'+25',color:"primary"}
  ]

  get canMove(): boolean {
    return  this.$store.getters['printer/getMasterStatus'].state === 'standby' ||
            this.$store.getters['printer/getMasterStatus'].state === 'cancelled'
  }
  get canExtrude(): boolean {
    return this.retractVisible() && (
            this.$store.getters['printer/getMasterStatus'].state === 'standby' ||
            this.$store.getters['printer/getMasterStatus'].state === 'cancelled'
          )
  }
  get canFlow(): boolean {
    return  this.$store.getters['printer/getMasterStatus'].state === 'printing' ||
            this.$store.getters['printer/getMasterStatus'].state === 'cancelled' ||
            this.$store.getters['printer/getMasterStatus'].state === 'standby'
  }
  get sensors(): Sensor[]{
    return this.$store.getters['printer/getSensors']
  }

get settings(){
  return this.$store.getters['printer/getSettings']
}

  resetFeedSpped(): void {
    this.feedSpeed=100;
    this.feedSpeedChange()
  }

  resetFlow(): void {
    this.flow=100;
    this.flowChange()
  }
  flowChange(): void {
    this.$socket.sendCommand("M221 S"+this.flow)
  }
  feedSpeedChange(): void {
    this.$socket.sendCommand("M220 S"+this.feedSpeed)
  }
  extrude (): void {
    this.$socket.sendCommand("M83");
    this.$socket.sendCommand("G1 E+"+this.extrudeLarge+" F60")
  }
  retract (): void {
    this.$socket.sendCommand("M83");
    this.$socket.sendCommand("G1 E-"+this.extrudeLarge+" F60")
  }

  retractVisible(): boolean {
    let obj = this.sensors.find(function (o : Sensor):boolean { return o.code === 'extruder'});
    if(obj && this.settings)
        if(obj.temperature >= this.settings.extruder.min_extrude_temp)
            return true
      return false
  }
  move (axis: string,distance: string): void{
      this.$socket.sendCommand("G91");
      this.$socket.sendCommand(`G1 ${axis}${distance}`)
      this.$socket.sendCommand("G90");
  }
  home (what: string): void {
      let command = `G28 ${what}`;
      this.$socket.sendCommand(command)
  }
}
</script>

<style>
#home.Y {
    background-color: orange;
}
.right-input input {
  text-align: right
}
</style>
