import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserInterface } from '../../pages/tasks/types/users.interface';
import { usersData } from '../../pages/tasks/models/users.data';

@Injectable({ providedIn: 'root' })
export class UserService {
  public users = usersData;

  public get getUsers$(): Observable<UserInterface[]> {
    return of(usersData);
  }
}
