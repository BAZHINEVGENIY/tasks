import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthUserInterface } from '../../types/users.interface';
import { BackendErrorsInterface } from '../../types/errors.interface';
import { LoginInterface } from '../../types/login.interface';
import { RegisterInterface } from '../../types/register.interface';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ request: LoginInterface }>(),
    'Login Success': props<{ currentUser: AuthUserInterface }>(),
    'Login Failure': props<{ errors: BackendErrorsInterface }>(),

    Register: props<{ request: RegisterInterface }>(),
    'Register Success': props<{ currentUser: AuthUserInterface }>(),
    'Register Failure': props<{ errors: BackendErrorsInterface }>(),

    'Get Current User': emptyProps(),
    'Get Current User Success': props<{ currentUser: AuthUserInterface }>(),
    'Get Current User Failure': emptyProps(),
  },
});
