export interface Dirs {
  typeRow: string,
  dirname: string,
  size: string,
  modified: string
}

export interface Files {
  typeRow: string,
  filename: string,
  size: string,
  modified: string
}

export interface FileDialog {
  active: boolean,
  mode: string,
  label: string,
  value: string,
}

export interface FileManagerState {
  fileDialog: FileDialog,
  path: string,
  files: Files[],
}
