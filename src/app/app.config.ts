import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppRoutes } from './app.routes';

export const AppConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        BrowserModule,
        provideRouter(AppRoutes)
    ]
}