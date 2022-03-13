import { MutationTree } from "vuex"
import { FileManagerState } from "@/store/file_manager/types.ts"



export const mutations: MutationTree<FileManagerState> = {
    setPath (state,payload){
      state.path = payload;
    },
    setFiles(state,payload){
      state.files = payload
    },
    addFile(state,payload){
      state.files.push(payload)
      state.files.sort((a, b) => { return (b.typeRow+a.filename).localeCompare(a.typeRow+b.filename)});
    },
    deleteFile(state,payload){
      state.files = state.files.filter(function(el) { return el.filename != payload; });
    },
    resetFiles(state){
      state.files = []
    },
    setFileDialog(state,payload){
      state.fileDialog = payload
    },


}
