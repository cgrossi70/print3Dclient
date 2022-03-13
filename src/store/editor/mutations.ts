import { MutationTree } from "vuex"
import { EditorState } from "@/store/editor/types.ts"

export const mutations: MutationTree<EditorState> = {
  setShowState (state,payload){
    state.show = payload
  },
  setReadOnly(state,payload){
    state.readOnly    = payload
  },
  setSourceCode(state,payload){
    state.sourceCode  = payload
  },
  openFile (state,payload) {
    state.fileName    = payload.fileName
    state.path        = payload.path
    state.sourceCode  = payload.sourceCode
  },

}
