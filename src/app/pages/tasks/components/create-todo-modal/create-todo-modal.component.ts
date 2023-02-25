import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserInterface } from '../../types/users.interface';
import { TodoInterface } from '../../types/todo.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { FormFieldAssigneesComponent } from '../../../../shared/form-field-components/form-field-assignees.component';
import { FormFieldReporterComponent } from '../../../../shared/form-field-components/form-field-reporter.component';
import { FormFieldPriorityComponent } from '../../../../shared/form-field-components/form-field-priority.component';
import { FormFieldStatusComponent } from '../../../../shared/form-field-components/form-field-status.component';
import { QuillEditorComponent } from 'ngx-quill';
import { MatButtonModule } from '@angular/material/button';

export interface CreateTodoModalData {
  users: UserInterface[];
  currentUser: UserInterface;
}

@Component({
  selector: 'tasks-create-todo',
  templateUrl: './create-todo-modal.component.html',
  styleUrls: ['./create-todo-modal.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatInputModule,

    QuillEditorComponent,

    FormFieldAssigneesComponent,
    FormFieldReporterComponent,
    FormFieldPriorityComponent,
    FormFieldStatusComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoModalComponent {
  public readonly form: FormGroup;
  private readonly formBuilder = inject(FormBuilder);

  private readonly dialogRef = inject(MatDialogRef);
  private readonly data: CreateTodoModalData = inject(MAT_DIALOG_DATA);

  public readonly users: UserInterface[] = this.data.users;
  public readonly user: UserInterface = this.data.currentUser;

  constructor() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      reporterId: ['', Validators.required],
      assigneesId: [''],
      description: [''],
      comments: [[]],
    });
  }

  public createTodo(): void {
    this.dialogRef.close({
      ...this.form.value,
      created: new Date().getTime(),
    } as TodoInterface);
  }
}
