<template>
    <div class="App">
        <ECharts
            class="chart"
            ref="chart"
            :option="option"
            :setOptionOpts="{ notMerge: false,lazyUpdate: true }"
            :loadingOpts="{ text: 'Wait for 0.5s' }"
        />

    </div>
</template>

<script>
import { Component, Watch, Vue } from 'vue-property-decorator'
import axios from 'axios'

//let count = 2000

function generetaXaxis () {
  let res = [];
  var currentDateObj = new Date();
  var numberOfMlSeconds = currentDateObj.getTime();
  for (var i = 0; i < 1200; i++){
    numberOfMlSeconds = numberOfMlSeconds - 1000 // milisegundos
    var newDateObj = new Date(numberOfMlSeconds);
    res.push(newDateObj.getHours()+':'+newDateObj.getMinutes())
  }
  return res.reverse();
}
let categories2 = generetaXaxis()

@Component({})
export default class ChartClass extends Vue {
  bedTemperatures = []
  extruderTemperatures = []
  piTemperatures = []
  extruderTarget = []
  bedTarget = []
  count = 10
  option =  {

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56'
        }
      }
    },
    // legend: {
    //   data: ['Bed', 'Extruder', 'Pi','Target Bed','Temperature Target']
    // },
    xAxis: [
      {
        type: 'category',
        splitNumber: 10 ,
        splitLine: {
            show: true,
            lineStyle: {
                color: "#dddddd",
            },
        },
        axisLabel: {
            color: 'rgba(100,100,100)',
            margin: 10,
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: this.$t('Charts.Temperature') + ' (ªC)',
        max: (value) => {
          if(this.autoscaleTempGraph)
            return Math.ceil((value.max + 5) / 20) * 20
          else
            return 250
        },
        min: 0,
        splitLine: {
            show: true,
            lineStyle: {
                color: "#dddddd",
            },
        },
        boundaryGap: [0.2, 0.2]
      },
    ],
    series: [
      {
        symbol: 'none',
        itemStyle: {
          color: 'green',
        },
        lineStyle: {
          color: 'green',
          width: 2
        },
        name: 'Bed',
        type: 'line',
        data:  this.bedTemperatures,
        smooth: true,
      },
      {
        symbol: 'none',
        itemStyle: {
          color: 'blue',
        },

        lineStyle: {
          color: 'blue',
          width: 2
        },
        name: 'Extruder',
        type: 'line',
        data:  this.extruderTemperatures,
        smooth: true,
      },
      {
        symbol: 'none',
        itemStyle: {
          color: 'red',
        },

        lineStyle: {
          color: 'red',
          width: 2
        },
        name: 'Pi',
        type: 'line',
        data:  this.piTemperatures,
        smooth: true,
      },
      {

        name: 'Target Bed',
        type: 'line',
        data:  this.bedTarget,
        symbol: 'none',
        itemStyle: {
          color: 'green',
        },
        areaStyle: {
          color: 'rgba(0, 255, 0, 0.3)',

        },
        lineStyle: {
          type: 'dashed',
          color: 'green',
          width: 1
        },
      },
      {

        name: 'Target Extruder',
        type: 'line',
        data:  this.extruderTarget,
        symbol: 'none',
        itemStyle: {
          color: 'blue',

        },
        areaStyle: {
          color: 'rgba(0, 0, 255, 0.2)'
        },
        lineStyle: {
          type: 'dashed',
          color: 'blue',
          width: 1
        },
      },
    ]
  }

  async refreshChart ()  {

    const url = `http://${this.$store.getters['websocket/getApiUrl']}/server/temperature_store`
    let data = []

    await axios.get(url)
    .then((response) => { data = response })
    .catch((e) => { console.log(e.message) })

    if(data.data.result.heater_bed.temperatures.length !== 1200){
      const auxiliar_bed = new Array(1200-data.data.result.heater_bed.temperatures.length).fill(0);
      const auxiliar_ext = new Array(1200-data.data.result.extruder.temperatures.length).fill(0);
      const auxiliar_rpi = new Array(1200-data.data.result['temperature_sensor raspberry_pi'].temperatures.length).fill(0);
      const auxiliar_target_bed = new Array(1200-data.data.result.heater_bed.targets.length).fill(0);
      const auxiliar_target_ext = new Array(1200-data.data.result.extruder.targets.length).fill(0);


      this.bedTemperatures = auxiliar_bed.concat(data.data.result.heater_bed.temperatures)
      this.extruderTemperatures = auxiliar_ext.concat(data.data.result.extruder.temperatures)
      this.piTemperatures = auxiliar_rpi.concat(data.data.result['temperature_sensor raspberry_pi'].temperatures)
      this.bedTarget = auxiliar_target_bed.concat(data.data.result.heater_bed.targets)
      this.extruderTarget = auxiliar_target_ext.concat(data.data.result.extruder.targets)

    }
    else{
      this.bedTemperatures = data.data.result.heater_bed.temperatures
      this.extruderTemperatures = data.data.result.extruder.temperatures
      this.piTemperatures = data.data.result['temperature_sensor raspberry_pi'].temperatures
      this.bedTarget = data.data.result.heater_bed.targets
      this.extruderTarget = data.data.result.extruder.targets

    }

    const newDateObj = new Date();
    categories2.shift()
    categories2.push(newDateObj.getHours()+':'+newDateObj.getMinutes())

    try{
      this.$refs.chart.setOption({
        xAxis: [
          {
            data: categories2
          }
        ],

        series: [
          {
            data: this.bedTemperatures
          },
          {
            data: this.extruderTemperatures
          },
          {
            data: this.piTemperatures
          },
          {
            data: this.bedTarget
          },
          {
            data: this.extruderTarget
          },

        ]
      })
    }
    catch(e){
      console.log()
    }
  }
  get autoscaleTempGraph () {
    return this.$store.getters['getAutoscaleTempGraph']
  }
  get hideTempGraph () {
    return this.$store.getters['getHideTempGraph']
  }
  get masterStatus() {
    return this.$store.getters['printer/getMasterStatus'].state
  }
  get graphTemperatures(){
    return this.$store.getters['printer/getGraphTemperatures']
  }

  // Para que se active el tiem la primera vez cuando detecta une stado valido de la impresora
  @Watch('masterStatus')
  onMasterStatusChange (newVal,oldVal){
    if(newVal !== '' && oldVal === ''){
      const error = ['error','startup','shutdown']

      if(!error.includes(this.masterStatus) && !this.hideTempGraph){
        this.refreshChart
        setInterval( this.refreshChart, 1000);
      }
    }
  }
  // Para que se active el tiemer si me voy y vengo de la pantaalla (no funciona al ingresaar por primera vez)
  mounted() {
    const error = ['','error','startup','shutdown']

    if(!error.includes(this.masterStatus) && !this.hideTempGraph){
      this.refreshChart
      setInterval( this.refreshChart, 1000);
    }
  }
}
</script>
<style>
 html, body {
    height: 100%;
    margin: 0;
}

@media (max-width: 992px) {
    #app {
        width: 80%;
        height: 80%;
    }
}
</style>
<style scoped>
.App {
    margin-top: 0;
    padding:  0;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.chart {
    height: 0;
    flex-grow: 1;
}
</style>
