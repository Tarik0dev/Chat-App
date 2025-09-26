import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { LoginCredentials } from '../models/auth.model';
import { RegisterCredentials } from '../models/register.model';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private apiUrl = 'http://localhost:3000'

  constructor( private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<any> {

    return this.http.post(this.apiUrl + '/login', credentials, {withCredentials: true})
  }
  register(credentials: RegisterCredentials): Observable<any> {

return this.http.post(this.apiUrl + '/register', credentials).pipe(
      catchError((err) => {
        // on va récupérer le message envoyé par le back
        const errorMsg = err.error?.message || 'Erreur inconnue';
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  verify() {
    return this.http.get(this.apiUrl + '/me', {withCredentials: true});
  }

}
