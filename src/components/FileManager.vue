// IMPROVE: Averiguar si algun otro archivo desencadena el reinicio de algun servicio
// IMPROVE: Implementar Cpiar y Mover
<template>
  <div id="">
    <FileDialogClass/>

    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list dense>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="contextMenu(item.code)"
        >
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-data-table
      @click:row="rowClick"
      @contextmenu:row="show"
      :headers="headers"
      :items="desserts"
      item-key="filename"
      class="elevation-1"
      dense
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-row align="center">
          <v-col cols="7">
            <v-text-field
              v-model="search"
              :label="$t('FileManager.Search')"
              class="mx-4"
            ></v-text-field>
          </v-col>
          <v-col v-if="root === 'config'" cols="4">

            <v-tooltip dense top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  text
                  v-bind="attrs"
                  v-on="on"
                  dark
                  @click="createFile"
                >
                  <v-icon>mdi-file-plus</v-icon>
                </v-btn>
              </template>
              <span>{{$t('FileManager.CreateFile')}}</span>
            </v-tooltip>

            <v-tooltip dense top>
              <template v-slot:activator="{ on, attrs }">
                <label>
                  <label>
                    <v-icon
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                    >
                      mdi-file-upload
                    </v-icon>
                    <input  @change="handlerUploadFile" type="file" ref="file" hidden/>
                  </label>
                </label>
              </template>
              <span>{{$t('FileManager.UploadFile')}}</span>
            </v-tooltip>

            <v-tooltip dense top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  text
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="createFolder"
                >
                  <v-icon>mdi-folder-plus</v-icon>
                </v-btn>
                </template>
                <span>{{$t('FileManager.CreateFolder')}}</span>
              </v-tooltip>

          </v-col>
        </v-row>
      </template>

      <template v-slot:item.filename="{ item }">
        <div class="text-caption" style="display:flex; align-items: center;">
          <v-icon v-if="item.typeRow === 'folder'">
            mdi-folder
          </v-icon>
          {{ item.filename }}
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Files } from '@/store/file_manager/types'
import FileDialogClass from '@/components/FileDialog.vue'
import axios from 'axios'

@Component({
  components: { FileDialogClass }
})
export default class FileManagerClass extends Vue {
  // Data
  private search = ''
  private selectedFileName = ''
  private selectedTypeRow = ''
  private x = 0
  private y = 0
  private showMenu = false
  private configMenu = [
    { title: this.$t('FileManager.Delete') ,code: 'delete' },
    { title: this.$t('FileManager.Rename') ,code: 'rename' },
    { title: this.$t('FileManager.Download') ,code: 'download' },
    { title: this.$t('FileManager.Edit') ,code: 'edit' }

  ]
  private othersMenu = [
    { title: this.$t('FileManager.Download') ,code: 'download' },
    { title: this.$t('FileManager.View') ,code: 'view' }
  ]
  //Methods

  handlerUploadFile (e: any): void{
    const file = e.target.files[0]
    let InstFormData = new FormData();
    InstFormData.append('file' , file);
    InstFormData.append('root' , this.root);
    InstFormData.append('path' , this.path);

    axios.post('http://'+this.$store.getters['websocket/getApiUrl']+'/server/files/upload', InstFormData , {headers : {'content-type': 'multipart/form-data'}})
  }

  show (e: any,item: any): void {
    this.selectedTypeRow = item.item.typeRow;
    this.selectedFileName = item.item.filename;

    e.preventDefault()
    this.showMenu = false
    this.x = e.clientX
    this.y = e.clientY
    this.$nextTick(() => {
      this.showMenu = true
    })
  }
  contextMenu (code: string) :void {

    const path = this.$store.getters['file_manager/getPath']+'/'+this.selectedFileName
    if (code === 'delete' && this.selectedTypeRow === 'folder'){
      this.$socket.sendObj('server.files.delete_directory',6545,{ "path": path, "force": false })
    }
    else if (code === 'delete' && this.selectedTypeRow === 'file'){
      this.$socket.sendObj('server.files.delete_file',1323,{ "path": path })
    }
    else if (code === 'rename'){
      this.$store.dispatch('file_manager/setFileDialog',{active: true, label: 'New Name' , mode: 'rename', value: this.selectedFileName})
    }
    else if(code === 'edit' && this.selectedTypeRow === 'file'){
      this.$store.dispatch('editor/setReadOnly',false)
      this.$store.dispatch('editor/openFile',{
        path:     this.$store.getters['file_manager/getPath'],
        filename: this.selectedFileName
      })
      this.$store.dispatch('editor/setShowState',true)
    }
    else if(code === 'view' && this.selectedTypeRow === 'file'){
      this.$store.dispatch('editor/setReadOnly',true)
      this.$store.dispatch('editor/openFile',{
        path:     this.$store.getters['file_manager/getPath'],
        filename: this.selectedFileName
      })
      this.$store.dispatch('editor/setShowState',true)
    }
    else if(code === 'download' && this.selectedTypeRow === 'file'){
      // WINDOWS: Cambiar
      const url = 'http://'+this.$store.getters['websocket/getApiUrl']+'/server/files'+this.$store.getters['file_manager/getPath']+'/'+this.selectedFileName
      console.log(url)
      axios.get(url,{responseType: 'blob'})
      .then((response)=>{
        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = this.selectedFileName
        link.click()
      })
    }
  }
  createFile ():void {
    this.$store.dispatch('file_manager/setFileDialog',{active: true, label: 'New File' , mode: 'create_file'})
  }
  createFolder ():void {
    this.$store.dispatch('file_manager/setFileDialog',{active: true, label: 'New Folder' , mode: 'create_folder'})
  }
  rowClick (item: Files): void {
    //this.currentRowItem = item;
    if(item.typeRow === 'folder'){
      if(item.filename === '..')
      {
        // WINDOWS: cambiar
        const paths = this.$store.getters['file_manager/getPath'].split('/')
        // Elimino el ultimo  elemento del pathy
        paths.splice(-1,1);
        // WINDOWS: cambiar
        this.$store.dispatch('file_manager/setPath',paths.join('/'))
        this.$socket.sendObj("server.files.get_directory",777777,{
          "path":  this.$store.getters['file_manager/getPath'],
          "extended": true
        })
      }
      else{
        // WINDOWS: Cambiar
        this.$store.dispatch('file_manager/resetFiles')
        this.$store.dispatch('file_manager/setPath',this.$store.getters['file_manager/getPath']+'/'+item.filename)
        this.$socket.sendObj("server.files.get_directory",777777,{
          "path":  this.$store.getters['file_manager/getPath'],
          "extended": true
        })
      }

    } else {
      if(this.root === 'config')
        this.$store.dispatch('editor/setReadOnly',false)
      else
        this.$store.dispatch('editor/setReadOnly',true)
      this.$store.dispatch('editor/openFile',{
        path:     this.$store.getters['file_manager/getPath'],
        filename: item.filename
      })
      this.$store.dispatch('editor/setShowState',true)
    }
  }
  filterOnlyCapsText (value: string, search: string, item: Files): boolean {
    return value != null &&
      search != null &&
      typeof value === 'string' &&
      value.toString().toLocaleUpperCase().indexOf(search) !== -1
  }
  // Computed
  get root (): string {
    if(this.$store.getters['file_manager/getPath'] === "/config")
      return 'config';
    else {
      return this.$store.getters['file_manager/getPath'].split('/')[1]
    }
  }
  get path (): string {
    if(this.$store.getters['file_manager/getPath'] === "/config")
      return '/';
    else {
      const paths = this.$store.getters['file_manager/getPath'].split('/')
      paths.splice(1,1)
      return paths.join('/')
    }
  }
  get desserts () {
    return this.$store.getters['file_manager/getFiles']
  }

  get headers () {
    return [
      {
        text:  this.$t('FileManager.Name'),
        align: 'start',
        sortable: false,
        value: 'filename',
      },
      { text:  this.$t('FileManager.Size'), value: 'size', align: 'end' },
      { text:  this.$t('FileManager.Modified'), value: 'modified', align: 'end' },
    ]
  }
  get menuItems (){
    if (this.root === 'config')
      return this.configMenu
    else
      return this.othersMenu
  }

}
</script>
<style lang="scss" scoped>
</style>
