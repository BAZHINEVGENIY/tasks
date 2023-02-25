import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BackendErrorsInterface } from '../../types/errors.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tasks-backend-error',
  template: `
    <ul class="error__messages">
      <li *ngFor="let errorMessage of errorMessages" style="color: red">
        {{ errorMessage }}
      </li>
    </ul>
  `,
  styles: [
    `
      .error__messages {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackendErrorComponent implements OnInit {
  @Input() backendErrors: BackendErrorsInterface;
  errorMessages: string[];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map(
      (name) => `${name} ${this.backendErrors[name].join(', ')}`
    );
  }
}
