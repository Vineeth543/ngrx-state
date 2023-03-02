import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AppState } from '../store/app.state';
import { HttpClient } from '@angular/common/http';
import { autoLogout } from '../auth/state/auth.action';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/authResponseData.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeOutInterval: any;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }

  formatUser(data: AuthResponseData) {
    const expiryDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.idToken, data.localId, expiryDate);
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email Already Exists';
      default:
        return 'Unknown Error. Please try again later...';
    }
  }

  runTimeOutInterval(user: User): void {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;
    this.timeOutInterval = setTimeout(
      () => this.store.dispatch(autoLogout()),
      timeInterval
    );
  }

  setUserInLocalStorage(user: User): void {
    localStorage.setItem('user_data', JSON.stringify(user));
    this.runTimeOutInterval(user);
  }

  getUserFromLocalStorage(): User | null {
    const userStringData = localStorage.getItem('user_data');
    if (userStringData) {
      const userData = JSON.parse(userStringData);
      const user = new User(
        userData.email,
        userData.token,
        userData.userId,
        new Date(userData.expirationDate)
      );
      this.runTimeOutInterval(user);
      return user;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('user_data');
    if (this.timeOutInterval) {
      clearTimeout(this.timeOutInterval);
      this.timeOutInterval = null;
    }
  }
}
