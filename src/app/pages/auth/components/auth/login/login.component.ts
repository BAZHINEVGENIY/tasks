import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacadeAuthService } from '../../../store/facade.auth.service';
import { LoginInterface } from '../../../types/login.interface';
import { Observable, of } from 'rxjs';
import { BackendErrorsInterface } from '../../../types/errors.interface';
import { SharedAuthModule } from '../../shared/shared-auth.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tasks-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [SharedAuthModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(FacadeAuthService);

  public readonly isLoading$ = this.facade.isLoading$;
  public errors$: Observable<BackendErrorsInterface | null>;
  public hidePassword = true;

  ngOnInit() {
    this.initializeForm();
    // console.log(this.sizeWindow$.typewindow());
  }

  private initializeForm() {
    this.form = this.fb.group({
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
    const request: LoginInterface = { user: this.form.value };
    this.facade.login(request);
  }
}
