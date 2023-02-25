import { inject, Injectable } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable, share, takeUntil } from 'rxjs';
import { DestroyService } from './destroy-subs.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SizeWindowService {
  private readonly destroy$ = inject(DestroyService);
  private readonly breakpointObserver = inject(BreakpointObserver);

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  private get observeBreakpoints(): Observable<BreakpointState> {
    return this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]);
  }

  get typeWindow$(): Observable<string> {
    return this.observeBreakpoints.pipe(
      map((currentState: BreakpointState) => {
        const currentBreakpointsKey: string = Object.keys(
          currentState.breakpoints
        ).find((value: string) => currentState.breakpoints[value]);

        return this.displayNameMap.get(currentBreakpointsKey);
      }),
      share(),
      takeUntil(this.destroy$)
    );
  }

  get isXs$(): Observable<boolean> {
    return this.typeWindow$.pipe(
      map((size) => {
        return size === 'XSmall';
      })
    );
  }

  get isSm$(): Observable<boolean> {
    return this.typeWindow$.pipe(
      map((size) => {
        return size === 'XSmall' || size === 'Small';
      })
    );
  }

  get isLg$(): Observable<boolean> {
    return this.typeWindow$.pipe(
      map((size) => {
        return size === 'Medium' || size === 'Large' || size === 'XLarge';
      })
    );
  }
}
