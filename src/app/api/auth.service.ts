import { Credentials } from './../models/credentials';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../core/auth-cookies/user.store';
import { Observable, of } from 'rxjs';
import { switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStore: UserStore
  ) {
    // Initial request for a CSRF Token. Mandatory!!
    // Angular will take care of the rest.
    this.http.get<void>(`${environment.apiUrl}/csrf-token`).subscribe();
  }

  /**
   * Registers a user
   */
  register(credentials: Credentials): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/register`, credentials);
  }

  /**
   * Logs the user in, with email and password.
   * Session is maintained with a cookie.
   * It also gets the user info and populates the state.
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, { email, password }).pipe(
      switchMapTo(this.fetchUser()),
    );
  }

  /**
   * Clears the session, clears the store and navigates to login.
   */
  logout(): void {
    this.http.get<any>(`${environment.apiUrl}/logout`).subscribe(() => {
      this.userStore.removeUser();
      this.router.navigateByUrl('/login/signIn');
    });
  }

  /**
   * Gets the User's info from server and populates the state.
   * This is _the_ way to check if the user is still logged in.
   */
  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
          ? of(user)
          : this.http.get<any>(`${environment.apiUrl}/me`, {}).pipe(
            tap(u => this.userStore.setUser(u))
          );
      })
    );
  }
}
