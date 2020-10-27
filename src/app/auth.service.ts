import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiBaseUrl = 'https://reqres.in/api';

  constructor(
    private _httpClient: HttpClient
  ) { }

  login(user: any): Observable<any> {
    return this._httpClient.post(`${this.apiBaseUrl}/login`, user)
  }

  signup(user: any): Observable<any> {
    return this._httpClient.post(`${this.apiBaseUrl}/signup`, user)
  }
}
