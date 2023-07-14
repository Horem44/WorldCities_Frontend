import { Component, OnDestroy, OnInit } from '@angular/core';
import { HealthCheckService } from '../../core/health-check/health-check.service';
import { IHealthCheckStatus } from 'src/app/core/health-check/interfaces/health-status.interface';
import { takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.scss'],
})
export class HealthCheckComponent implements OnInit, OnDestroy {
  result!: Observable<IHealthCheckStatus | null>;
  healthCheckStatus!: IHealthCheckStatus;

  private destroy$ = new Subject<void>();

  constructor(private readonly _healthCheckService: HealthCheckService) {
    this.result = this._healthCheckService.result;
  }

  onRefresh() {
    this._healthCheckService.sendClientUpdate();
  }

  ngOnInit() {
    this._healthCheckService.startConnection();
    this._healthCheckService.addDataListeners();

    this._healthCheckService
      .getHealthStatus()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (healthCheckStatus) => (this.healthCheckStatus = healthCheckStatus)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
