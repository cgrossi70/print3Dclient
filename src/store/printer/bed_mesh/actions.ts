import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { BedMeshState } from "./types";


export const actions: ActionTree<BedMeshState, RootState> = {
  ON_MESSAGE(context,payload){
    const event = JSON.parse(payload)
    if(event.id === 111111){
      if(event.result.status['bed_mesh'])
      {
        context.commit('setBedMesh',event.result.status['bed_mesh'])
      }
    }
  }

}