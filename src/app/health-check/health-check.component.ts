import { Component, OnInit } from '@angular/core';
import { HealthCheckService } from '../core/health-check/health-check.service';

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.scss'],
})
export class HealthCheckComponent implements OnInit {
  constructor(private readonly healthCheckService: HealthCheckService){}

  ngOnInit(){
    this.healthCheckService.getHealthStatus().subscribe(console.log);
  }
}
