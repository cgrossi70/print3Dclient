import { ActionTree } from 'vuex'
import { EditorState } from "@/store/editor/types.ts"
import { RootState } from "@/store/types.ts"
import axios from 'axios'

export const actions: ActionTree<EditorState,RootState> = {
  openFile(context,payload){
    const url='http://'+context.rootGetters['websocket/getApiUrl']+'/server/files'+payload.path+'/'+payload.filename+'?timestamp='+new Date().getTime()
    console.log(url)
    axios.get(url,{responseType: 'blob'
    }).then(res => res.data.text())
        .then(file => {
          context.commit('openFile',{
            fileName:   payload.filename,
            path:       payload.path,
            sourceCode: file
          })
        })
  },
  setShowState(context,payload){
    context.commit('setShowState',payload)
  },
  setReadOnly(context,payload){
    context.commit('setReadOnly',payload)
  },
  setSourceCode(context,payload){
    context.commit('setSourceCode',payload)
  }
}
