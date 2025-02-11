import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import {baseRoute, routes} from './app/app.routes';
import { AppComponent } from './app/app.component';
import {provideExperimentalZonelessChangeDetection} from "@angular/core";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([...baseRoute, ...routes]),
    provideExperimentalZonelessChangeDetection(),
  ],
});
