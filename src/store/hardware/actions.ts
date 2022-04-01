import { ActionTree } from 'vuex'
import { HardwareState } from "@/store/hardware/types"
import { RootState } from "@/store/types"


export const actions: ActionTree<HardwareState,RootState> = {
  resetServices: function(context){
    context.commit('resetServices');
  },
  ON_MESSAGE(context,payload) {

    const event = JSON.parse(payload);
    if(event.id === 4665)
    {
      context.commit('setHostCpuInfo',event.result.system_info)
      context.commit('setServices',event.result.system_info)
    }
    if(event.method === 'notify_proc_stat_update') {

      context.commit('setSystemCpuUsage',event.params[0])
    }
    if(event.method === 'notify_service_state_changed')
    {
      context.commit('updateService',event.params[0])
    }
  },
}
