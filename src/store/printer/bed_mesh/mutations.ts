import { MutationTree } from "vuex"
import { BedMeshState } from './types'


export const mutations: MutationTree<BedMeshState> = {
  setBedMesh(state, payload): void {
    state.mesh_matrix = payload.mesh_matrix
    state.mesh_max = payload.mesh_max
    state.mesh_min = payload.mesh_min
    state.probed_matrix = payload.probed_matrix
    state.profile_name = payload.profile_name
    state.profiles = payload.profiles
  }
}