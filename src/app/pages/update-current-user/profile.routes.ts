import { Route } from '@angular/router';
import { UpdateCurrentUserComponent } from './update-current-user.component';
import { UpdateCurrentUserEffect } from './store/effect';
import { provideEffects } from '@ngrx/effects';
import { SafeData } from '../../core/guards/form.guard';
import { AuthGuard } from '../../core/guards/auth.guard';
import { importProvidersFrom, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { DialogComfirmFormComponent } from '../../shared/dialog-comfirm-form/dialog-comfirm-form.component';

export const PROFILE_ROUTES: Route[] = [
  {
    path: ':username',
    canActivate: [AuthGuard],
    canDeactivate: [formGuard],
    providers: [
      provideEffects(UpdateCurrentUserEffect),
      importProvidersFrom(MatDialogModule),
    ],
    component: UpdateCurrentUserComponent,
  },
];

function formGuard(component: SafeData): Observable<boolean> {
  const dialog = inject(MatDialog);
  return component.isSavingData
    ? dialog.open(DialogComfirmFormComponent).afterClosed()
    : of(true);
}
