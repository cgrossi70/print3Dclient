export interface Printer {
  name: string
  url: string
}

export interface Config {
  printers: Printer []
  default: number
  hideConsoleTemp: boolean
  autoscaleTempGraph: boolean,
  hideTempGraph: boolean
}

export interface Snackbar {
  message: string
  active: boolean
  color: string
}

export interface RootState {
  sidebar: boolean;
  rightbar: boolean;
  config: Config;
  snackbar: Snackbar;
}
