import { inject, Injectable } from '@angular/core';
import { RegisterInterface } from '../../pages/auth/types/register.interface';
import { Observable } from 'rxjs';
import {
  AuthUserInterface,
  UpdateUserInputInterface,
} from '../../pages/auth/types/users.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { LoginInterface } from '../../pages/auth/types/login.interface';

export interface AuthResponseInterface {
  user: AuthUserInterface;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  public get getCurrentUser(): Observable<AuthUserInterface> {
    const url = environment.apiUrl + '/user';
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  public login(data: LoginInterface): Observable<AuthUserInterface> {
    const url = environment.apiUrl + '/users/login';

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  public register(data: RegisterInterface): Observable<AuthUserInterface> {
    const url = environment.apiUrl + '/users';

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  public updateUser(
    userInput: UpdateUserInputInterface
  ): Observable<AuthUserInterface> {
    const url = environment.apiUrl + '/user';

    return this.http
      .put<AuthResponseInterface>(url, { user: userInput })
      .pipe(map(this.getUser));
  }

  private getUser(response: AuthResponseInterface): AuthUserInterface {
    return response.user;
  }
}
