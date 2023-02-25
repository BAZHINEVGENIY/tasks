import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import {
  CreateTodoModalComponent,
  CreateTodoModalData,
} from '../../create-todo-modal/create-todo-modal.component';
import { TodoInterface } from '../../../types/todo.interface';
import { UserInterface } from '../../../types/users.interface';
import { combineLatest, filter, Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoService } from '../../../../../core/services/todo.service';
import { FacadeUser } from '../../../store/facade.user';
import { FacadeTodo } from '../../../store/facade.todo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export interface UsersAndUserStore {
  isLoading$: Observable<boolean>;
  users$: Observable<UserInterface[]>;
  searchUser$: (id: number) => Observable<UserInterface>;
}

export interface isLoadingTodoStore {
  isLoading$: Observable<boolean>;
}

@Component({
  selector: 'tasks-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [FacadeUser],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  public searchStr = '';
  public readonly dialog = inject(MatDialog);
  private readonly todoService = inject(TodoService);
  private readonly facadeUser: UsersAndUserStore = inject(FacadeUser);

  private readonly facadeTodo: isLoadingTodoStore = inject(FacadeTodo);

  public readonly users$ = this.facadeUser.users$;
  public readonly user$ = this.facadeUser.searchUser$(1);
  public readonly isLoadingUser$ = this.facadeUser.isLoading$;
  public readonly isLoadingTodo$ = this.facadeTodo.isLoading$;

  public createTodo(): void {
    combineLatest([this.users$, this.user$])
      .pipe(
        switchMap(([users, currentUser]) =>
          this.dialog
            .open(CreateTodoModalComponent, {
              data: { users, currentUser } as CreateTodoModalData,
            })
            .afterClosed()
            .pipe(
              filter((data) => !!data),
              tap((data: TodoInterface) => this.todoService.addTodo(data))
            )
        )
      )
      .subscribe();
  }
}
