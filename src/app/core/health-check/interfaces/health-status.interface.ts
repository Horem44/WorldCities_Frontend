export interface IHealthCheckStatus {
  checks: IHealthCheck[];
  totalResponseTime: number;
  totalStatus: number;
}

interface IHealthCheck {
  name: string;
  responseTime: number;
  status: string;
  description: string;
}
