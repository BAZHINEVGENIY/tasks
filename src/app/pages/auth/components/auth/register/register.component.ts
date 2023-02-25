import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacadeAuthService } from '../../../store/facade.auth.service';
import { RegisterInterface } from '../../../types/register.interface';
import { Observable, of, skip } from 'rxjs';
import { BackendErrorsInterface } from '../../../types/errors.interface';
import { SharedAuthModule } from '../../shared/shared-auth.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tasks-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [SharedAuthModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(FacadeAuthService);

  public readonly isLoading$ = this.facade.isLoading$.pipe(skip(1));
  public errors$: Observable<BackendErrorsInterface | null>;
  public hidePassword = true;

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  getErrField(nameField: string, typeError: string) {
    return this.form.get(`${nameField}`).hasError(`${typeError}`);
  }

  clearErrors() {
    this.errors$ = of(null);
  }

  auth() {
    this.errors$ = this.facade.errors$;
    const request: RegisterInterface = { user: this.form.value };
    this.facade.register(request);
  }
}
