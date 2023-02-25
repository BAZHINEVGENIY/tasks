import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Priority } from '../../pages/tasks/types/enums';
import { SharedFormFieldModule } from './shared-for-form-field.module';

@Component({
  selector: 'tasks-form-field-priority',
  template: `
    <mat-form-field [formGroup]="parentFormGroup">
      <mat-label>{{ 'TODO.PRIORITY.LABEL' | translate }}</mat-label>
      <mat-select [formControlName]="'priority'">
        <mat-option *ngFor="let key of priority" [value]="key"
          >{{ 'TODO.PRIORITY.' + key | uppercase | translate }}
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
export class FormFieldPriorityComponent {
  @Input() parentFormGroup: FormGroup;
  public readonly priority = Priority;
}
