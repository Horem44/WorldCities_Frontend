import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { environment } from 'src/enviroments/enviroment';
import { IHealthCheckStatus } from './interfaces/health-status.interface';

@Injectable({
  providedIn: 'root',
})
export class HealthCheckService {
  constructor(private readonly baseService: BaseService) {}

  getHealthStatus() {
    return this.baseService.get<IHealthCheckStatus>(
      `${environment.serverBaseUrl}/health`
    );
  }
}
