// Angular
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

// Third Party
import {Observable} from 'rxjs';
import { Auth } from 'src/app/types/auth';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  isAuth(): boolean {
    return !this.isTokenExpired();
  }

  signupUser(emailAndPassword: Auth): Observable<any> {
    return this.http.post('api/v0/user', emailAndPassword);
  }

  loginUser(emailAndPassword: Auth): Observable<any> {
    return this.http.post('api/v0/user/login', emailAndPassword);
  }

  logoutUser() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  setToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token){
      return true;
    } else {
      const date = this.getTokenExpirationDate(token);
      if (date === undefined) {
        return false;
      }
      if (date !== null){
        return !(date.valueOf() > new Date().valueOf());
      }
      else {
        return true;
      }
    }
  }
}
