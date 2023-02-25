import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { BackendErrorComponent } from './backend-error.component';

@NgModule({
  imports: [BackendErrorComponent],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,

    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,

    BackendErrorComponent,
  ],
})
export class SharedAuthModule {}
