import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { TodoService } from '../../../../../core/services/todo.service';
import { DropCardService } from './drop-card.service';
import { SearchTodoPipe } from '../../../../../shared/pipes/search-todo.pipe';
import { SortTodoPipe } from '../../../../../shared/pipes/sort-todo.pipe';
import { EditTodoComponent } from '../../edit-todo/edit-todo.component';
import { FacadeTodo } from '../../../store/facade.todo';
import { Observable } from 'rxjs';
import { TodoInterface } from '../../../types/todo.interface';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { CardTodoComponent } from './card-todo/card-todo.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';

export interface TodosStore {
  isLoading$: Observable<boolean>;
  todos$: Observable<TodoInterface[]>;
}

@Component({
  selector: 'tasks-column-todo',
  templateUrl: './column-todo.component.html',
  styleUrls: ['./column-todo.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatProgressSpinnerModule,
    TranslateModule,
    CardTodoComponent,
    SearchTodoPipe,
    SortTodoPipe,
  ],
  providers: [FacadeTodo, DropCardService, SearchTodoPipe, SortTodoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnTodoComponent {
  @Input() searchStr: string;
  @Input() status: string;
  private readonly dialog = inject(MatDialog);
  private readonly todoService = inject(TodoService);
  public readonly dropCardService = inject(DropCardService);
  private readonly facadeTodo: TodosStore = inject(FacadeTodo);

  public readonly todos$ = this.facadeTodo.todos$;
  public readonly isLoading$ = this.facadeTodo.isLoading$;

  public editTodo(id: string) {
    this.dialog.open(EditTodoComponent, { data: id });
  }

  public removeTodo(id: string) {
    this.todoService.deleteTodo(id);
  }
}
