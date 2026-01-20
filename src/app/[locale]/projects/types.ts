// Project-related types
export interface Project {
  id: string;
  name: string;
  url: string;
  status: string;
  isLive: boolean;
  lastChecked: string;
  responseTime: string;
  analysis: string;
  country: string;
  deployments: number;
  features: {
    pages: number;
    logs: number;
    alerts: number;
    reports: number;
  };
}

export interface ProjectToDelete {
  id: string;
  name: string;
}

export type ViewType = 'card' | 'table';
export type StatusFilter = 'all' | 'stable' | 'issue';
