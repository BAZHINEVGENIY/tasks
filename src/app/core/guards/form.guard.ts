import { inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComfirmFormComponent } from '../../shared/dialog-comfirm-form/dialog-comfirm-form.component';

export interface SafeData {
  isSavingData: boolean;
}

@Injectable({ providedIn: 'root' })
export class FormGuard implements CanDeactivate<SafeData> {
  private readonly dialog = inject(MatDialog);

  canDeactivate(component: SafeData): Observable<boolean> {
    return component.isSavingData
      ? this.dialog.open(DialogComfirmFormComponent).afterClosed()
      : of(true);
  }
}
