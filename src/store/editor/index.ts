import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { EditorState } from "@/store/editor/types.ts"
import { getters } from "@/store/editor/getters.ts"
import { mutations } from "@/store/editor/mutations.ts"
import { actions } from "@/store/editor/actions.ts"

const state: EditorState = {
  readOnly:   false,
  show:       false,
  fileName:   '',
  path:       '',
  sourceCode: ''
}

export const Editor: Module<EditorState,RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
