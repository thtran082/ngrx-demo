import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
    providers: [
    provideHttpClient(),
    BrowserModule,
    provideRouter(appRoutes),
    provideStore(),
    provideStoreDevtools(),
]
}