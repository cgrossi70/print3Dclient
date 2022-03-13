import { GetterTree } from 'vuex'
import { EditorState} from "@/store/editor/types.ts"

import { RootState } from "@/store/types.ts"

export const getters: GetterTree<EditorState,RootState> = {
  getShowState(state):boolean {
    return state.show
  },
  getSourceCode(state):string {
    return state.sourceCode
  },
  getFileName(state): string {
    return state.fileName
  },
  getPath(state): string {
    return state.path
  },
  getReadOnly(state) {
    return state.readOnly
  }
}
