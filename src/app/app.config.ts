import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ErrorInterceptorService } from './error-interceptor.service';
import { APP_BASE_HREF } from '@angular/common';
import { Store, StoreModule, provideStore } from '@ngrx/store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomersEffects } from './customers/store/customers.effects';
import { authFeature } from './auth/store/auth.reducer';
import { customerFeature } from './customers/store/customers.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      BrowserModule, 
      ToastModule, 
      MenubarModule, 
      RouterModule, 
      StoreModule.forRoot({}), 
      StoreModule.forFeature(authFeature), 
      StoreModule.forFeature(customerFeature),  
      TranslateModule.forRoot({
        defaultLanguage: 'it',
        useDefaultLang: true,
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        },
    })),
    provideStore(),
    provideEffects(AuthEffects, CustomersEffects), 
    provideRouter(routes), 
    //provideClientHydration(),
    MessageService,
    { provide: APP_BASE_HREF, useValue: '/icecream-recipe-manager-fe/'},
    provideHttpClient(withInterceptorsFromDi(),withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true, deps:[MessageService, Store] },
    provideAnimations()
  ]
};
