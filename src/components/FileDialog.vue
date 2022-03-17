<template>
  <div id="">
    <v-dialog
      persistent
      width='400px'
      v-model='active'
    >

      <v-card>
        <v-toolbar
          dark
          color="primary"
          dense
        >
          {{ title }}
         </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model='textField'
            :label='fileDialog.label'
            autofocus
          >
          </v-text-field>
          <v-row>
            <v-col>
              <v-btn
                block
                dark
                color="success"
                @click="ok"
              >
              Ok
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                block
                dark
                color="red"
                @click="cancel"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>

        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Watch } from 'vue-property-decorator'
import { FileDialog } from '@/store/file_manager/types'
import axios from 'axios'

const defaultFileDialog = {
  active: false,
  mode: '',
  value: '',
  label:''
}

@Component({})
export default class FileDialogClass extends Vue {
  textField =  ''

    createFile():void {
      const file = new File([''], this.textField)

      let formData = new FormData()
      formData.append('file', file)
      formData.append('root' , this.root);
      formData.append('path' , this.subPath);

      axios.post('http://'+this.$store.getters['websocket/getApiUrl'] + '/server/files/upload',
          formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
          }
      ).then(() => {
          this.$store.dispatch('setSnackbar', {
            message: 'Archivo creado con exito',
            active: true,
            color: 'success'
          })
      }).catch(() => {
          this.$store.dispatch('setSnackbar', {
            message: 'Error create file: '+ this.textField,
            active: true,
            color: 'error'
          })
      })
      return
  }

  ok(): void {
    if(this.fileDialog.mode === 'create_folder') {
      console.log( this.path+"/"+this.textField)
      this.$socket.sendObj('server.files.post_directory',6548,{ "path": this.path+"/"+this.textField })
    }
    else if(this.fileDialog.mode === 'rename') {
      const source = this.path+'/'+this.fileDialog.value
      const dest = this.path+'/'+this.textField
      this.$socket.sendObj('server.files.move',5654,{ "source": source, "dest": dest })
    }
    else if(this.fileDialog.mode === 'create_file') {
      this.createFile()
    }
    // Reseteo el dialogo a sus valores default y lo cierro
    this.$store.dispatch('file_manager/setFileDialog',defaultFileDialog)
  }

  cancel(): void {
    this.$store.dispatch('file_manager/setFileDialog', defaultFileDialog)
  }

  @Watch('active')
  onactiveChange (newValue: boolean,oldValue: boolean): void {
    if (newValue === true && oldValue === false)
      this.textField = this.fileDialog.value
  }

  get title(): string {
      return  this.fileDialog.mode === 'create_folder'? 'Create Folder':
              this.fileDialog.mode === 'rename'? 'Rename' : 'Error'
  }
  get fileDialog(): FileDialog {
    return this.$store.getters['file_manager/getFileDialog']
  }
  get active(): FileDialog {
    return this.$store.getters['file_manager/getFileDialog'].active
  }
  get path(): string {
    return  this.$store.getters['file_manager/getPath']
  }
  get root (): string {
    if(this.$store.getters['file_manager/getPath'] === "/config")
      return 'config';
    else {
      return this.$store.getters['file_manager/getPath'].split('/')[1]
    }
  }
  get subPath (): string {
    if(this.$store.getters['file_manager/getPath'] === "/config")
      return '/';
    else {
      const paths = this.$store.getters['file_manager/getPath'].split('/')
      paths.splice(1,1)
      return paths.join('/')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
