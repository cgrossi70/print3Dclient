import { GetterTree } from 'vuex'
import { UpdateState } from './types'
import { RootState } from '@/store/types'

export const getters: GetterTree<UpdateState, RootState>={
  needUpdate(state): boolean{
    for(const service in state.updates.version_info){
      // @ts-expect-error: Not reachable error
      if(service === 'system' && state.updates.version_info.system.package_count !== 0)
        return true
      // @ts-expect-error: Not reachable error
      else if(service !== 'system' && state.updates.version_info[service].version !== state.updates.version_info[service].remote_version)
        return true
    }
    return false
  },

  getUpdateMessages(state){
    return state.updateMessages
  },
}