import { inject, Injectable } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TodoInterface } from '../../../types/todo.interface';
import { TodoService } from '../../../../../core/services/todo.service';

@Injectable()
export class DropCardService {
  private readonly todoService = inject(TodoService);

  drop(event: CdkDragDrop<TodoInterface[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    if (event.previousContainer === event.container) return;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    event.container.data.forEach((element) => {
      const newElement = structuredClone(element);
      newElement.status = event.container.id;
      this.todoService.updateTodo(newElement);
    });
  }
}
