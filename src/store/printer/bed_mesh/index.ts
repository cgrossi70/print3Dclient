import { RootState } from '@/store/types'
import { Module } from 'vuex'
import { BedMeshState } from './types'
import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

const state: BedMeshState = {
    mesh_min: null,
    mesh_max:  null,
    probed_matrix: null,
    profiles: null,
    mesh_matrix: null,
    profile_name: null
}


export const BedMesh: Module<BedMeshState, RootState> = {

    namespaced: true,
    state: state,
    actions: actions,
    mutations: mutations,
    getters: getters
}