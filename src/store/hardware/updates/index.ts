import { Module } from 'vuex'
import { UpdateState } from "@/store/hardware/updates/types"
import { RootState } from "@/store/types"
import { actions } from './actinos'
import { mutations } from './mutations'
import { getters } from "./getters"

const state: UpdateState = {
  updates: {
    busy: null,
    github_rate_limit:  null,
    github_requests_remaining:  null,
    github_limit_reset_time:  null,
    version_info:  null
  },
  updateMessages: [],
}

export const Update: Module<UpdateState,RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}