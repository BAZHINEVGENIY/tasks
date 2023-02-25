import { Route } from '@angular/router';
import { DemosPageComponent } from './components/demos-page/demos-page.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';

export const TASKS_ROUTES: Route[] = [
  {
    path: '',
    component: DemosPageComponent,
  },
  {
    path: ':id',
    component: EditTodoComponent,
  },
];
