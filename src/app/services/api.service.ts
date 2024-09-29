import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient) { }

  public get<T = void>(url: string, params = {}): Observable<T> {
    return this.http.get<T>(url, {
      params: new HttpParams(params)
    })
  }
}

