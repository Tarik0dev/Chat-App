import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private apiUrl = 'http://localhost:3000'

  constructor( private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<any> {

    return this.http.post(this.apiUrl, credentials)
  }
  register(credentials: LoginCredentials): Observable<any> {

    return this.http.post(this.apiUrl + '/register', credentials)
  }

  


}
