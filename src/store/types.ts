export interface Printer {
  name: string
  url: string
}

export interface General {
  language: string
  printerName: string
  confirmEmergencyStop: boolean
}

export interface Temperature {
  autoscaleGraph: boolean
  hideGraph: boolean
  preheats: Preheat[] 
}
export interface Console {
  hideTemperature: boolean
  consoleHeight: number
}

export interface Printer {
  description: string
  url: string
}

export interface Config {
  initVersion: string 
  console: Console
  temperature: Temperature
  general: General
  remotePrinters: Printer[]
}

export interface Preheat {
  name:  string,
  script: string
}

export interface Snackbar {
  message: string
  active: boolean
  color: string
}

export interface Announcement{
  id: string,
  title: string,
  description: string,
  url: string,
  dismissed: boolean
}

export interface RootState {
  sidebar: boolean;
  rightbar: boolean;
  snackbar: Snackbar;
  config: Config;
  announcements: Announcement[];
  
}
