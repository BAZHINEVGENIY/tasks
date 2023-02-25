import { createActionGroup, props } from '@ngrx/store';
import {
  AuthUserInterface,
  UpdateUserInputInterface,
} from '../../auth/types/users.interface';
import { BackendErrorsInterface } from '../../auth/types/errors.interface';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Update Current User': props<{ request: UpdateUserInputInterface }>(),
    'Update Current User Success': props<{ currentUser: AuthUserInterface }>(),
    'Update Current User Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
