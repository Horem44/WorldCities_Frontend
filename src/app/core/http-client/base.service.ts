import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private readonly httpClient: HttpClient) { }

  get<T>(url: string): Observable<T>{
    return this.httpClient.get<T>(url);
  }

  post<T>(url: string, body: unknown): Observable<T>{
    return this.httpClient.post<T>(url, body);
  }

  put<T>(url: string, body: unknown): Observable<T>{
    return this.httpClient.put<T>(url, body);
  }

  delete<T>(url: string): Observable<T>{
    return this.httpClient.delete<T>(url);
  }
}
