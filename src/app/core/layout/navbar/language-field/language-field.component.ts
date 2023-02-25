import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from '../../../../../assets/i18n/languages.enum';
import { keysFrom } from '../../../../shared/utils/get-obj-keys.utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'tasks-language-field',
  templateUrl: './language-field.component.html',
  styles: [
    `
      .language {
        width: 100%;
        max-width: 80px;
      }
    `,
  ],
  standalone: true,
  imports: [NgForOf, MatFormFieldModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageFieldComponent {
  public readonly translate = inject(TranslateService);
  public readonly enumLanguages = Languages;
  public readonly enumKeys = keysFrom;
}
