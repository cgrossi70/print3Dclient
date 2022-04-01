export interface MeshParams {
  tension: number,
  mesh_x_pps: number,
  algo: string,
  min_x: number,
  min_y: number,
  y_count: number,
  mesh_y_pps: number,
  x_count: number,
  max_x: number,
  max_y: number 
}

export interface Profiles {
  points: number[][],
  mesh_params: MeshParams,

}

export interface BedMeshState  {
  mesh_min: number[] | null,
  mesh_max: number[] | null,
  probed_matrix: number[][] | null,
  profiles: {[key: string]: Profiles }| null,
  mesh_matrix: number[][] | null,
  profile_name: string | null
}