import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { SizeWindowService } from '../services/size-window.service';
import { DestroyService } from '../services/destroy-subs.service';
import { takeUntil } from 'rxjs';

@Directive({ selector: '[addClassSize]', standalone: true })
export class AddClassSizeDirective implements OnInit {
  private readonly sizeWindow = inject(SizeWindowService);
  private readonly destroy$ = inject(DestroyService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  @Input() addClassSize: string;
  @HostBinding('class') addSizeClass;

  ngOnInit() {
    if (this.addClassSize)
      this.sizeWindow.isSm$
        .pipe(takeUntil(this.destroy$))
        .subscribe((sizeBool: boolean) => {
          this.changeDetector.markForCheck();
          this.addSizeClass = sizeBool
            ? `${this.addClassSize}__sm`
            : `${this.addClassSize}__lg`;
        });
  }
}
