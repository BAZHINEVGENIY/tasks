import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Status } from '../../pages/tasks/types/enums';
import { SharedFormFieldModule } from './shared-for-form-field.module';

@Component({
  selector: 'tasks-form-field-status',
  template: `
    <mat-form-field [formGroup]="parentFormGroup">
      <mat-label>{{ 'TODO.STATUS.LABEL' | translate }}</mat-label>
      <mat-select [formControlName]="'status'">
        <mat-option *ngFor="let key of status" [value]="key"
          >{{ 'TODO.STATUS.' + key | uppercase | translate }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
  standalone: true,
  imports: [SharedFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldStatusComponent {
  @Input() parentFormGroup: FormGroup;
  public readonly status = Status;
}
