<template>
  <div>

        <v-dialog persistent
            v-model="show"
            fullscreen
            hide-overlay
            :transition="false"
        >
          <v-toolbar
            color="primary"
            dark
            dense
          >

            {{ fileName }}
            <v-spacer></v-spacer>
            <v-btn
              v-if="!readOnly"
              @click="handlerSave(true)"
              text
            >
              <v-icon>mdi-restart</v-icon>
              Save and Restart
            </v-btn>
            <v-btn
              v-if="!readOnly"
              @click="handlerSave(false)"
              text
            >
              <v-icon>mdi-content-save</v-icon>
              Save
            </v-btn>
            <v-btn
              small
              text
              @click="close"
            >
              <v-icon>mdi-close</v-icon>
              Close
            </v-btn>

          </v-toolbar>
          <codemirror
            ref="cmEditor"
            :value="code"
            :options="cmOptions"
            @ready="onCmReady"
            @focus="onCmFocus"
            @input="onCmCodeChange"
          />
      </v-dialog>
  </div>


</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { codemirror } from 'vue-codemirror'

// import base style
import 'codemirror/lib/codemirror.css'
// import language js
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/display/fullscreen.css';//full screen display editor
import 'codemirror/addon/display/fullscreen.js';//full screen display editor
import axios from 'axios'
// import theme style
import 'codemirror/theme/base16-dark.css'

@Component({
  components: { codemirror }
})
export default class FileEditorClass extends Vue {
  // Data
  cmOptions = {
    tabSize: 4,
    mode: 'text/javascript',
    theme: 'base16-dark',
    lineNumbers: true,
    line: true,
  }

  handlerSave(restartService) {
    let InstFormData = new FormData();
    const content = new Blob([this.code], { type: 'text/plain' })
    InstFormData.append('file' , content , this.fileName);
    InstFormData.append('root' , this.root);
    InstFormData.append('path' , this.path);

    axios.post('http://'+this.$store.getters['websocket/getApiUrl']+'/server/files/upload', InstFormData , {headers : {'content-type': 'multipart/form-data'}})
    .then( () => {
      this.$socket.sendObj("server.files.get_directory",777777,{
        "path": this.$store.getters['file_manager/getPath'],
        "extended": false
      })
      this.close()
      if(restartService && this.fileName === 'moonraker.conf'){
        this.$socket.sendObj(`server.restart`,4656)
        this.$router.push('/')
      }
      if(restartService && this.fileName === 'printer.cfg'){
        this.$socket.sendObj(`machine.services.restart`,4645,{"service": 'klipper'})
        this.$router.push('/')
      }

    })

  }
  close(){
    this.$store.dispatch('editor/setShowState',false)
  }
  
  onCmReady(cm) {
    console.log('the editor is readied!', cm)
  }
  onCmFocus(cm) {
    console.log('the editor is focused!', cm)
  }

  onCmCodeChange(newCode) {
    this.code = newCode
  }

  get fileName(){
    return this.$store.getters['editor/getFileName']
  }
  get root () {
    if(this.$store.getters['editor/getPath'] === "/config")
      return 'config';
    else {
      return this.$store.getters['editor/getPath'].split('/')[1]
    }
  }
  get path () {
    if(this.$store.getters['editor/getPath'] === "/config")
      return '/';
    else {
      const paths = this.$store.getters['editor/getPath'].split('/')
      paths.splice(1,1)
      return paths.join('/')
    }
  }
  get code() {
    return this.$store.getters['editor/getSourceCode']
  }
  set code(value) {
    return this.$store.dispatch('editor/setSourceCode',value)
  }
  get show(){
    return this.$store.getters['editor/getShowState']
  }
  get codemirror() {
    return this.$refs.cmEditor.codemirror
  }
  get readOnly (){
    return this.$store.getters['editor/getReadOnly']
  }

}
</script>
<style>
.CodeMirror
{
  height: calc(100vh - 48px)
}
</style>
