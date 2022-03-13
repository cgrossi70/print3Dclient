import { ActionTree } from 'vuex'
import { RootState } from "@/store/types.ts"

export const actions: ActionTree<RootState,RootState> = {
  setSnackbar(context,payload){
    context.commit('setSnackbar',payload);
  },
  setHideConsoleTemp(context,payload) {
    context.commit('setHideConsoleTemp',payload)
  },
  setAutoscaleTempGraph(context,payload){
    context.commit('setAutoscaleTempGraph',payload)
  },
  setHideTempGraph(context,payload){
    context.commit('setHideTempGraph',payload)
  },
}
