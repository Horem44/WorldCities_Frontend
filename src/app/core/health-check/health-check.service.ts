import { Injectable } from '@angular/core';
import { BaseService } from '../http-client/base.service';
import { environment } from 'src/enviroments/enviroment';
import { IHealthCheckStatus } from './interfaces/health-status.interface';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HealthCheckService {
  private hubConnection!: signalR.HubConnection;

  private _result: Subject<IHealthCheckStatus> =
    new Subject<IHealthCheckStatus>();

  public result = this._result.asObservable();

  constructor(private readonly baseService: BaseService) {}

  getHealthStatus() {
    return this.baseService.get<IHealthCheckStatus>(
      `${environment.serverBaseUrl}/health`
    );
  }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.serverBaseUrl + '/health-hub', {
        withCredentials: false,
      })
      .build();
    console.log('Starting connection...');
    this.hubConnection
      .start()
      .then(() => console.log('Connection started.'))
      .catch((err: any) => console.log(err));
    this.updateData();
  }

  public addDataListeners() {
    this.hubConnection.on('Update', (msg) => {
      console.log('Update issued by server for the following reason: ' + msg);
      this.updateData();
    });

    this.hubConnection.on('ClientUpdate', (msg) => {
      console.log('Update issued by client for the following reason: ' + msg);
      this.updateData();
    });
  }

  public updateData() {
    console.log('Fetching data...');
    this.getHealthStatus().subscribe((result) => {
      this._result.next(result);
      console.log(result);
    });
  }

  public sendClientUpdate() {
    this.hubConnection
      .invoke('ClientUpdate', 'client test')
      .catch((err) => console.error(err));
  }
}
