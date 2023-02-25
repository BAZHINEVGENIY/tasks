import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { importProvidersFrom } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideStore } from "@ngrx/store";
import { environment } from "./environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { GetCurrentUserEffect } from "./app/pages/auth/store/auth/get-current-user.effect";
import { authHeaderInterceptor } from "./app/core/interceptors/auth-header-fn.interceptor";
import { reducers } from "./app/pages/auth/store/share/reducers";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const translateConfig = {
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
    },
    defaultLanguage: 'ru',
};

bootstrapApplication(AppComponent, {
  providers: [
      provideRouter(appRoutes),
      provideAnimations(),
      provideStore({auth: reducers}),
      provideEffects(GetCurrentUserEffect),
      provideHttpClient(withInterceptors([authHeaderInterceptor])),
      !environment.production ? provideStoreDevtools() : [],
    importProvidersFrom(
        TranslateModule.forRoot(translateConfig),
        AngularFireModule.initializeApp(environment.firebase)
    )
  ],
}).catch((err) => console.error(err));
