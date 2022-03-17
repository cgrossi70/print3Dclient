export interface Printer {
  name: string
  url: string
}

export interface Config {
  autoscaleGraph: boolean
  confirmEmergencyStop: boolean
  hideGraph: boolean
  hideTemperature: boolean
  initVersion: string
  language: string
  printerName: string
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
