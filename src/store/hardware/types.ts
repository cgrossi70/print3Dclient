export interface Service {
  name: string
  active_state : string
  sub_state: string
}

export interface HardwareState {
      hostCpuInfo: {
        description: string,
        processor: string,
        totalMemory: string,
        cpuCount: string,
        soDistribution: string,
        systemCpuUsage: number,
        temperature: number
      },
    services: Service[],
  }
