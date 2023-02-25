import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Priority } from '../../../../types/enums';
import { Observable } from 'rxjs';
import { FacadeUser } from '../../../../store/facade.user';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

export interface isLoadingUserStore {
  isLoading$: Observable<boolean>;
}

@Component({
  selector: 'tasks-card-todo',
  templateUrl: './card-todo.component.html',
  styleUrls: ['./card-todo.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,

    DragDropModule,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTodoComponent {
  @Input() id: string;
  @Input() priority: string;
  @Input() title: string;
  @Output() removeEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<string>();

  private readonly facadeUser: isLoadingUserStore = inject(FacadeUser);
  public readonly isLoadingUser$ = this.facadeUser.isLoading$;

  public arrow: 'arrow_downward' | 'arrow_upward';

  public colorIconPriority(): string {
    const index = Priority.findIndex((item) => item === this.priority);

    switch (index) {
      case 0:
        this.arrow = 'arrow_downward';
        return 'color: limegreen';
      case 1:
        this.arrow = 'arrow_downward';
        return 'color: green';
      case 2:
        this.arrow = 'arrow_upward';
        return 'color: yellow';
      case 3:
        this.arrow = 'arrow_upward';
        return 'color: orange';
      case 4:
        this.arrow = 'arrow_upward';
        return 'color: red';
    }
  }

  public removeTodo(id) {
    this.removeEvent.emit(id);
  }

  public editTodo(id) {
    this.editEvent.emit(id);
  }
}
