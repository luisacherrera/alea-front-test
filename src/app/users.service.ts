import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiBaseUrl = 'https://reqres.in/api/';

  constructor(
    private _httpClient : HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this._httpClient.get(`${this.apiBaseUrl}users`);
  }

  updateUser(id, data): Observable<any> {
    return this._httpClient.put(`${this.apiBaseUrl}api/users/${id}`, data);
  }

  deleteUser(id): Observable<any> {
    return this._httpClient.delete(`${this.apiBaseUrl}api/users/${id}`);
  }
}
