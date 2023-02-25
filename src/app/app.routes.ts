import { Route } from '@angular/router';
import { LoginEffect } from "./pages/auth/store/auth/login.effect";
import { GetTodosEffect } from "./pages/tasks/store/storeTodo/effect";
import { todoRedusers } from "./pages/tasks/store/storeTodo/reducers";
import { userReducers } from "./pages/tasks/store/storeUser/reducers";
import { provideEffects } from "@ngrx/effects";
import { GetUsersEffect } from "./pages/tasks/store/storeUser/effect";
import { RegisterEffect } from "./pages/auth/store/auth/register.effect";
import { provideState } from "@ngrx/store";
import { AuthGuard } from "./core/guards/auth.guard";

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'demos',
        pathMatch: 'full',
    },
    {
        path: 'login',
        providers: [provideEffects(LoginEffect)],
        loadComponent: () =>
            import('./pages/auth/components/auth/login/login.component').then(
                (login) => login.LoginComponent
            ),
    },
    {
        path: 'register',
        providers: [provideEffects(RegisterEffect)],
        loadComponent: () =>
            import(
                './pages/auth/components/auth/register/register.component'
                ).then((register) => register.RegisterComponent),
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('./pages/update-current-user/profile.routes').then(
                (profile) => profile.PROFILE_ROUTES
            ),
    },
    {
        path: 'demos',
        canActivate: [AuthGuard],
        providers: [
            provideState('todos', todoRedusers),
            provideState('users', userReducers),
            provideEffects(GetUsersEffect, GetTodosEffect),
        ],
        loadChildren: () =>
            import('./pages/tasks/tasks.routes').then(
                (m) => m.TASKS_ROUTES
            ),
    },
    {
        path: 'blog',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./pages/blog/blog.component').then(
                (blog) => blog.BlogComponent
            ),
    },
    {
        path: 'cv',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./pages/cv/cv.component').then((cv) => cv.CvComponent),
    },
    {
        path: 'contacts',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./pages/contacts/contacts.component').then(
                (contacts) => contacts.ContactsComponent
            ),
    },
];
