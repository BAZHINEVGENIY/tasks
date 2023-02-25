import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserInterface } from '../../pages/tasks/types/users.interface';
import { FormGroup } from '@angular/forms';
import { SharedFormFieldModule } from './shared-for-form-field.module';

@Component({
  selector: 'tasks-form-field-assignees',
  template: `
    <mat-form-field [formGroup]="parentFormGroup">
      <mat-label>{{ 'TODO.ASSIGNEES' | translate }}</mat-label>
      <mat-select [formControlName]="'assigneesId'">
        <mat-option *ngFor="let user of users" value="{{ user.id }}">
          <img
            [src]="user.avatarUrl"
            alt=""
            style="height: 15px; width: 15px; border-radius: 50%"
          />
          {{ user.name }}
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
export class FormFieldAssigneesComponent {
  @Input() users: UserInterface[];
  @Input() parentFormGroup: FormGroup;
}
