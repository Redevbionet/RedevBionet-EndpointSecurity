
export enum ThreatSeverity {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
  Informational = 'Informational',
}

export interface Threat {
  name: string;
  type: string;
  severity: ThreatSeverity;
  description: string;
}

export type ScanState = 'idle' | 'scanning' | 'complete' | 'error';

export interface ScanHistoryItem {
  id: number;
  date: string;
  threatCount: number;
  threats: Threat[];
}
