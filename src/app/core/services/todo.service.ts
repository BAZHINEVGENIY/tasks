import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TodoInterface } from '../../pages/tasks/types/todo.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

const COLLECTION_NAME = 'tasks';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly firestore = inject(AngularFirestore);

  public get todos$(): Observable<TodoInterface[]> {
    return this.collection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((action) => ({
          ...action.payload.doc.data(),
          id: action.payload.doc.id,
        }))
      )
    );
  }

  public get collection(): AngularFirestoreCollection<TodoInterface> {
    return this.firestore.collection(COLLECTION_NAME);
  }

  public updateTodo(data: TodoInterface): void {
    this.firestore.doc(`${COLLECTION_NAME}/${data.id}`).update(data);
  }

  public addTodo(data: TodoInterface): void {
    this.collection.add(data);
  }

  public deleteTodo(id: string): void {
    this.firestore.doc(`${COLLECTION_NAME}/${id}`).delete();
  }
}
