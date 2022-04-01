import { Module } from 'vuex'
import { TemperatureGraphState } from "./types"
import { RootState } from "@/store/types"
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'


const state: TemperatureGraphState = {
  extruder: null,
  bed: null,
  pi: null
}

export const TemperatureGraph: Module<TemperatureGraphState,RootState> = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}