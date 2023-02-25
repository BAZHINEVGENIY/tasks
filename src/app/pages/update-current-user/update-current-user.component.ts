import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  AuthUserInterface,
  UpdateUserInputInterface,
} from '../auth/types/users.interface';
import { SafeData } from '../../core/guards/form.guard';
import { QuillEditorComponent } from 'ngx-quill';
import { BackendErrorsInterface } from '../auth/types/errors.interface';
import { SharedAuthModule } from '../auth/components/shared/shared-auth.module';
import { DialogComfirmFormComponent } from '../../shared/dialog-comfirm-form/dialog-comfirm-form.component';
import { FacadeProfileService } from './store/facade.profile.service';

@Component({
  selector: 'tasks-update-current-user',
  templateUrl: './update-current-user.component.html',
  styleUrls: ['./update-current-user.component.scss'],
  standalone: true,
  imports: [SharedAuthModule, QuillEditorComponent, DialogComfirmFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateCurrentUserComponent implements OnInit, SafeData {
  public form: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(FacadeProfileService);

  public readonly isLoading$ = this.facade.isLoading$;
  private readonly users$ = this.facade.users$;
  private currentUser: AuthUserInterface;
  public errors$: Observable<BackendErrorsInterface | null>;

  ngOnInit() {
    this.users$.subscribe((user) => {
      this.currentUser = user;
      this.initializeForm();
    });
  }

  private initializeForm() {
    this.form = this.fb.group({
      image: [this.currentUser?.image, Validators.required],
      username: [this.currentUser?.username, Validators.required],
      bio: [this.currentUser?.bio, Validators.required],
      email: [this.currentUser?.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get isSavingData() {
    return this.form.dirty;
  }

  getErrField(nameField: string, typeError: string) {
    return this.form.get(`${nameField}`).hasError(`${typeError}`);
  }

  clearErrors() {
    this.errors$ = of(null);
  }

  submit() {
    const currentUserInput: UpdateUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };
    this.errors$ = this.facade.errors$;
    this.facade.update(currentUserInput);
  }
}
