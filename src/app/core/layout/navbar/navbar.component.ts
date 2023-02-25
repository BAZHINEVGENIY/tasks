import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { SizeWindowService } from '../../services/size-window.service';
import { FacadeAuthService } from '../../../pages/auth/store/facade.auth.service';
import { Observable } from 'rxjs';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { LanguageFieldComponent } from './language-field/language-field.component';
import { ProfileFieldComponent } from './profile-field/profile-field.component';
import { AddClassSizeDirective } from '../../directives/add-class-size.directive';
import { AsyncPipe, NgSwitch, NgSwitchCase } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

export interface isLoggedInStore {
  isLoggedIn$: Observable<boolean>;
}

@Component({
  selector: 'tasks-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    // CommonModule,
    AsyncPipe,
    NgSwitch,
    NgSwitchCase,
    FormsModule,

    // RouterModule,
    RouterLink,
    RouterLinkActive,

    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    TranslateModule,

    LanguageFieldComponent,
    ProfileFieldComponent,
    AddClassSizeDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public readonly facadeAuth: isLoggedInStore = inject(FacadeAuthService);
  public readonly isLoggedIn$ = this.facadeAuth.isLoggedIn$;
  public readonly sizeWindow = inject(SizeWindowService);

  @Input()
  isToggleCheck: boolean;

  @Output()
  private readonly eventThemeModeSwitched = new EventEmitter();

  darkModeSwitched(change: MatSlideToggleChange) {
    this.eventThemeModeSwitched.emit(change.checked);
  }
}
