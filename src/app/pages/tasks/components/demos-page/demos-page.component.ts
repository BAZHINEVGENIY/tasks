import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Status } from '../../types/enums';
import { FacadeTodo } from '../../store/facade.todo';
import { FacadeUser } from '../../store/facade.user';
import { SizeWindowService } from '../../../../core/services/size-window.service';
import { AsyncPipe } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnTodoComponent } from './column-todo/column-todo.component';
import { FormsModule } from '@angular/forms';
import { AddClassSizeDirective } from '../../../../core/directives/add-class-size.directive';

export interface FetchTodosStore {
  fetchTodos: () => void;
}

export interface FetchUsersStore {
  fetchUsers: () => void;
}

@Component({
  selector: 'tasks-demos-todo',
  templateUrl: './demos-page.component.html',
  styleUrls: ['./demos-page.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    SearchBarComponent,
    MatDividerModule,
    DragDropModule,
    AddClassSizeDirective,
    ColumnTodoComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemosPageComponent implements OnInit {
  private readonly facadeTodo: FetchTodosStore = inject(FacadeTodo);
  private readonly facadeUser: FetchUsersStore = inject(FacadeUser);
  public readonly sizeWindow = inject(SizeWindowService);
  public readonly status = Status;

  ngOnInit() {
    this.facadeTodo.fetchTodos();
    this.facadeUser.fetchUsers();
  }
}
