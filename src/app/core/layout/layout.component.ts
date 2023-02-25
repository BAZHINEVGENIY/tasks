import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { SizeWindowService } from '../services/size-window.service';
import { FacadeAuthService } from '../../pages/auth/store/facade.auth.service';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface getCurrentUser {
  getCurrentUser: () => void;
}

@Component({
  selector: 'tasks-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    // CommonModule,
    NgIf,
    AsyncPipe,
    NgTemplateOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    NavbarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  public readonly facadeAuth: getCurrentUser = inject(FacadeAuthService);
  public readonly sizeWindow = inject(SizeWindowService);
  private readonly render = inject(Renderer2);

  isToggleCheck = false;

  ngOnInit() {
    this.setClass(this.isToggleCheck);
    this.facadeAuth.getCurrentUser();
  }

  switchDarkMode(change: boolean) {
    this.setClass(change);
    this.isToggleCheck = change;
  }

  private setClass(change: boolean) {
    const setClass = change ? 'darkMode' : 'lightMode';
    this.render.setAttribute(document.body, 'class', setClass);
  }
}
