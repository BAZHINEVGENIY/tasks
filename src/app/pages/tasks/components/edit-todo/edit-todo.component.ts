import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
  Optional,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, switchMap, take } from 'rxjs';
import { UserInterface } from '../../types/users.interface';
import { TodoInterface } from '../../types/todo.interface';
import { FacadeTodo } from '../../store/facade.todo';
import { FacadeUser } from '../../store/facade.user';
import { TodoService } from '../../../../core/services/todo.service';
import { CommentInterface } from '../../types/comment.interface';
import { tap } from 'rxjs/operators';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UsersAndUserStore } from '../demos-page/search-bar/search-bar.component';
import { FacadeAuthService } from '../../../auth/store/facade.auth.service';
import { AuthUserInterface } from '../../../auth/types/users.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { FormFieldAssigneesComponent } from '../../../../shared/form-field-components/form-field-assignees.component';
import { FormFieldPriorityComponent } from '../../../../shared/form-field-components/form-field-priority.component';
import { FormFieldStatusComponent } from '../../../../shared/form-field-components/form-field-status.component';
import { QuillEditorComponent } from 'ngx-quill';

export interface TodoStore {
  searchTodo$: (id: string) => Observable<TodoInterface>;
}

@Component({
  selector: 'tasks-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
  providers: [FacadeUser, FacadeTodo],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    RouterModule,
    TranslateModule,

    QuillEditorComponent,

    FormFieldAssigneesComponent,
    FormFieldPriorityComponent,
    FormFieldStatusComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTodoComponent implements OnInit {
  public form: FormGroup;
  public commentForm: FormGroup;
  private readonly formBuilder = inject(FormBuilder);

  private readonly todoService = inject(TodoService);
  // private readonly destroy$ = inject(DestroyService) //todo
  private readonly fadaceTodo: TodoStore = inject(FacadeTodo);
  private readonly facadeUser: UsersAndUserStore = inject(FacadeUser);
  private readonly facadeCurrentUser = inject(FacadeAuthService);
  public currentUser: AuthUserInterface;

  public readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  public isTypeWindowModal = true;
  public isVisibleCommentBtn = false;

  public readonly users$ = this.facadeUser.users$;
  public resultTodo: TodoInterface;

  constructor(
    @Optional() public readonly dialogRef: MatDialogRef<EditTodoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private readonly dialogData
  ) {
    this.initializeCurrentTodo();

    this.facadeCurrentUser.users$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  private initializeCurrentTodo() {
    if (this.dialogData) {
      this.fadaceTodo
        .searchTodo$(this.dialogData)
        .subscribe((todo) => (this.resultTodo = structuredClone(todo)));
    }
    if (!this.dialogData) {
      this.activatedRoute.params
        .pipe(
          take(1),
          tap(() => (this.isTypeWindowModal = false)),
          switchMap((params: { id: string }) =>
            this.fadaceTodo.searchTodo$(params.id)
          ),
          take(1)
        )
        .subscribe((todo) => (this.resultTodo = structuredClone(todo)));
    }
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      title: [this.resultTodo.title, Validators.required],
      priority: this.resultTodo.priority,
      status: this.resultTodo.status,
      description: this.resultTodo.description,
      assigneesId: this.resultTodo.assigneesId,
    });

    this.commentForm = this.formBuilder.group({
      authorId: this.currentUser?.username,
      text: ['', Validators.required],
    });
  }

  public sendingData() {
    this.editTodo();
    this.router.navigate(['/demos', this.resultTodo.id]);
  }

  public get reporter(): UserInterface {
    //todo
    let reporter;
    this.facadeUser
      .searchUser$(+this.resultTodo.reporterId)
      .subscribe((user) => (reporter = user));
    return reporter;
  }

  public editTodo() {
    this.todoService.updateTodo({
      ...this.resultTodo,
      ...this.form.value,
      updated: Date.now(),
    } as TodoInterface);
  }

  public addComment(event) {
    console.log(this.resultTodo);
    event.stopPropagation();
    if (!this.commentForm.value.text.trim()) return;

    const newComment: CommentInterface = {
      authorId: this.commentForm.value.authorId,
      text: this.commentForm.value.text,
      time: Date.now(),
    };

    this.resultTodo.comments.unshift(newComment);
    this.commentForm.get('text').reset();
    this.isVisibleCommentBtn = false;
    this.editTodo();
  }

  public editComment(commentText) {
    this.resultTodo.comments = this.resultTodo.comments.filter(
      (comment) => comment.text !== commentText
    );

    this.commentForm.patchValue({ text: commentText });
  }

  public removeComment(commentTime) {
    this.resultTodo.comments = this.resultTodo.comments.filter(
      (comment) => comment.time !== commentTime
    );

    this.editTodo();
  }

  public cancelComment(event) {
    event.stopPropagation();
    this.commentForm.get('text').reset();
    this.isVisibleCommentBtn = false;
  }
}
