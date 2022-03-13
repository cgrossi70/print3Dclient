<template>
  <Block :title="$t('GCodes.GCodeFiles')">
    <template v-slot:content>
      <v-card-text>
        <template>
          <div>
              <v-menu
                v-model="showMenu"
                :position-x="x"
                :position-y="y"
                absolute
                offset-y
              >
                <v-list dense>
                  <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                  >

                    <v-list-item-title
                      @click="contextMenu(item.title)"
                    >
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            <v-data-table
              @click:row="rowClick"
              dense
              :headers="headers"
              :items="gcodes_files"
              item-key="name"
              class="text-caption elevation-1"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              @contextmenu:row="show"
            >

              <template v-slot:top>
                <v-row>
                  <v-col>
                    <v-text-field
                        hide-details
                        dense
                        v-model="search"
                        prepend-inner-icon="mdi-magnify"
                        label="Search (UPPER CASE ONLY)"
                        class="mx-4"
                        outlined
                      ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-0 mb-2">
                  <v-col>
                    <div class="font-weight-bold mx-4">
                      Actual Route: {{ actualPath}}
                    </div>
                  </v-col>
                </v-row>
              </template>

              <template v-slot:item.name="{ item }">
                <div class="text-caption" style="display:flex; align-items: center;">
                  <v-icon v-if="item.typeRow === 'dir'">
                    mdi-folder
                  </v-icon>
                  <img
                    class="mr-3"
                    v-if="item.typeRow === 'file'"
                    :src = "'//'+$store.getters['websocket/getApiUrl']+'/server/files/gcodes'+actualPath+'/.thumbs/'+item.name.split('.')[0]+'-32x32.png'"
                  >
                  {{ item.name }}
                </div>
              </template>

            </v-data-table>
          </div>
        </template>
      </v-card-text>
    </template>
  </Block>
</template>

<script lang="ts">

interface Headers {
  text: string,
  align: string,
  sortable: boolean,
  value: string,
}

import { GcodeDirectories } from '@/store/printer/types.ts'
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
@Component({
  components: {
    Block
  }
})
export default class ListFilesClass extends Vue {
  x = 0
  y = 0
  selectedExtruderTemp = 0
  selectedBedTemp = 0
  selectedName = ''
  thumbnail_grande = ''
  showMenu = false
  selectedHeaders = ["name","size","modified"]
  search = ''
  items = [
    { title: 'Precalentar' },
    { title: 'Imprimir' },
  ]


  get actualPath (): string {
    return this.$store.getters['printer/getGCodes'].root
  }
  get gcodes_files (): GcodeDirectories[] {
    if(this.actualPath !== '')
      // Filtro siempre el thumbs en todos lados salvo el raiz
      return this.$store.getters['printer/getGCodes'].dirs.filter(function (dir: GcodeDirectories):boolean {
          return dir.name !== '.thumbs'
        })
    else
      // Filtro el thumbs y el .. en el raiz
      return this.$store.getters['printer/getGCodes'].dirs.filter(
        function (dir: GcodeDirectories): boolean {
          return  dir.name !== '.thumbs' && dir.name !== '..'
        })
  }
  get headers (): Headers[] {
    return [
      {
        text: 'Directory / File',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      {
        text: 'Size',
        align: 'end',
        sortable: true,
        value: 'size',
      },
      {
        text: 'Modified',
        align: 'end',
        sortable: true,
        value: 'modified',
      },
      {
        text: 'Layer',
        align: 'end',
        sortable: true,
        value: 'layer_height',
      },
      {
        text: 'Object Height',
        align: 'end',
        sortable: true,
        value: 'object_height',
      },
      {
        text: 'Slicer',
        align: 'end',
        sortable: true,
        value: 'slicer',
      },
      {
        text: 'Filamento',
        align: 'end',
        sortable: true,
        value: 'filament_total',
      },
    ]
  }

  contextMenu (method: string): void {
    if(method==='Precalentar'){
      console.log('Precalentando ....')
      this.$socket.sendCommand("SET_HEATER_TEMPERATURE HEATER=extruder TARGET="+this.selectedExtruderTemp);
      this.$socket.sendCommand("SET_HEATER_TEMPERATURE HEATER=heater_bed TARGET="+this.selectedBedTemp);
    }
    else if(method === "Imprimir") {
        console.log("./Varios_Casa/"+this.selectedName)
        this.$socket.sendObj("printer.print.start",4654,{ "filename": "/Varios_Casa/"+this.selectedName })
    }
  }
  // eslint-disable-next-line
  show (e: any,item: any) {
      console.log(item)
      this.thumbnail_grande = '//'+this.$store.getters['websocket/getApiUrl']+'/server/files/gcodes'+this.actualPath+'/.thumbs/'+item.item.name.split('.')[0]+'.png'
      this.selectedExtruderTemp = item.item.first_layer_extr_temp
      this.selectedBedTemp = item.item.first_layer_bed_temp
      this.selectedName = item.item.name

      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
  }
  rowClick (item: GcodeDirectories): void {
    //this.currentRowItem = item;
    if(item.typeRow === 'dir'){
      let newRoot = ''
      let newParent = ''
      if(item.name === '..')
      {
        newRoot = this.$store.getters['printer/getGCodes'].parent
        newParent = newRoot.substring(0, newRoot.lastIndexOf('/'));
      }
      else{
        newRoot = this.actualPath + '/'+item.name
        newParent =  this.actualPath
      }

      this.$store.dispatch('printer/resetGCodeFiles')
      this.$store.dispatch('printer/setRootDirectory',{newRoot,newParent})

      this.$socket.sendObj("server.files.get_directory",5644,{
        "path":  "/gcodes" + newRoot,
        "extended": true
      })
    }
  }
  filterOnlyCapsText (value: string, search: string): boolean {
    return value != null &&
      search != null &&
      typeof value === 'string' &&
      value.toString().toLocaleUpperCase().indexOf(search) !== -1
  }
}
</script>
<style lang="scss" scoped>
  .v-data-table::v-deep th {
  font-size: 12px !important;
  }
  .v-data-table::v-deep td {
  font-size: 12px !important;
  }
</style>
