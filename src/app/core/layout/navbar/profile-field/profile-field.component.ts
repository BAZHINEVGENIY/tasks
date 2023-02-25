import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FacadeAuthService } from '../../../../pages/auth/store/facade.auth.service';
import { Observable } from 'rxjs';
import { AuthUserInterface } from '../../../../pages/auth/types/users.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

export interface ProfileFieldStore {
  users$: Observable<AuthUserInterface>;
  getCurrentUserFailure: () => void;
}

@Component({
  selector: 'tasks-profile-field',
  templateUrl: './profile-field.component.html',
  styleUrls: ['./profile-field.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFieldComponent {
  public readonly facadeAuth: ProfileFieldStore = inject(FacadeAuthService);
  public readonly users$ = this.facadeAuth.users$;

  log() {
    console.log('yeah');
  }
}
