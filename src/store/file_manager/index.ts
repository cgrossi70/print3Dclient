import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { FileManagerState } from "@/store/file_manager/types.ts"
import { getters } from "@/store/file_manager/getters.ts"
import { mutations } from "@/store/file_manager/mutations.ts"
import { actions } from "@/store/file_manager/actions.ts"

const state: FileManagerState = {

  fileDialog: {
    active: false,
    mode: '',
    label: '',
    value: '',
  },
  path: '/config',
  files: [],

  
}

export const FileManager: Module<FileManagerState,RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,

}
