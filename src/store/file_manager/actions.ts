import { ActionTree } from 'vuex'
import { FileManagerState, Files, Dirs } from "@/store/file_manager/types.ts"
import { RootState } from "@/store/types.ts"

function timastampToDate  (timestamp: number) :string {
    return (new Date(timestamp*1000)).toLocaleDateString();
}
function formatSize(size: number): string {
    return  size < 1024 ? size + ' B' :
            size < 1048576 ? Number(size/1024).toFixed(2) + ' Kb' : Number(size / 1048576).toFixed(2) + ' Mb'
}

export const actions: ActionTree<FileManagerState,RootState> = {
  setPath(context,payload) {
    context.commit('setPath',payload)
  },
  resetFiles(context){
    context.commit('resetFiles')
  },
  setFileDialog(state,payload) {
    state.commit('setFileDialog',payload)
  },
  ON_MESSAGE(context,payload) {
    const event = JSON.parse(payload);
    const filesArray: Files[] = []
    // Crear directorio
    if (event.id === 6548) {
      console.log()
    }
    if(event.method === 'notify_filelist_changed')
    {

      if(event.params[0].action === 'create_dir' || event.params[0].action === 'create_file') {
        let typeRow = 'folder'
        if(event.params[0].action === 'create_file')
          typeRow = 'file'
        context.commit('addFile',{ typeRow: typeRow,
          // WINDOWS: Cambiar
          filename: event.params[0].item.path.split('/').reverse()[0],
          size: formatSize(Number(event.params[0].size)),
          modified: timastampToDate(Number(event.params[0].modified))
        })
      }
      if(event.params[0].action === 'delete_dir' || event.params[0].action === 'delete_file') {
        context.commit('deleteFile',event.params[0].item.path.split('/').reverse()[0])
      }
      if(event.params[0].action === 'move_dir' || event.params[0].action === 'move_file') {
        context.commit('deleteFile',event.params[0].  source_item.path.split('/').reverse()[0])

        let typeRow = 'folder'
        if(event.params[0].action === 'move_file')
          typeRow = 'file'
        context.commit('addFile',{ typeRow: typeRow,
          // WINDOWS: Cambiar
          filename: event.params[0].item.path.split('/').reverse()[0],
          size: formatSize(Number(event.params[0].size)),
          modified: timastampToDate(Number(event.params[0].modified))
        })
      }
    }
    if (event.id === 777777) {
      if(event.result){
        if(!context.getters.isRoot) {
          filesArray.push({
            typeRow: 'folder',
            filename: '..',
            size: formatSize(Number(4096)),
            modified: timastampToDate(Number(new Date()))
          })
        }
        event.result.dirs.forEach((dir: Dirs) => {
          filesArray.push({
            typeRow: 'folder',
            filename: dir.dirname,
            size: formatSize(Number(dir.size)),
            modified: timastampToDate(Number(dir.modified))
          })
        })
        event.result.files.forEach((file: Files) => {
          filesArray.push({
            typeRow: 'file',
            filename: file.filename,
            size: formatSize(Number(file.size)),
            modified: timastampToDate(Number(file.modified))
          })
        })
        context.commit('setFiles',filesArray)
      }
    }
  }
}
