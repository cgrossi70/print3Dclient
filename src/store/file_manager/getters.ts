import { GetterTree } from 'vuex'
import { FileManagerState } from "@/store/file_manager/types.ts"
import { RootState } from "@/store/types.ts"

export const getters: GetterTree<FileManagerState,RootState> = {
  getPath(state): string {
    return state.path
  },
  getFiles(state){
    return state.files
  },
  // WINDOWS: Cambiar
  isRoot(state): boolean {
    const paths = state.path.split('/')
    if(paths.length == 2)
      return true
    else
      return false
  },
  getFileDialog(state){
    return state.fileDialog
  }
}
