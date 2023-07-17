import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class HubService {
  constructor() {}

  public startConnection(hubName: string) {
    const hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.serverBaseUrl + `/${hubName}`, {
        withCredentials: true,
      })
      .build();
    console.log(`Starting connection to hub ${hubName}...`);
    hubConnection
      .start()
      .then(() => console.log(`Connection to hub ${hubName} started.`))
      .catch((err: any) => console.log(err));

    return hubConnection;
  }
}
