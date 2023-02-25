import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tasks-dialog-comfirm-form',
  templateUrl: './dialog-comfirm-form.component.html',
  styles: [
    `
      p {
        text-align: center;
      }
    `,
  ],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslateModule],
})
export class DialogComfirmFormComponent {}
