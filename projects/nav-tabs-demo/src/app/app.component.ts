import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import { NavTabsComponent } from 'nav-tabs';
import { DynamicRoutesDemoComponent } from './components/dynamic-routes-demo/dynamic-routes-demo.component';
import { FeatureFlagDemoComponent } from './components/feature-flag-demo/feature-flag-demo.component';
import {routes} from "./app.routes";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavTabsComponent,
    DynamicRoutesDemoComponent,
    FeatureFlagDemoComponent,
    CommonModule,
    RouterLink,
  ],
  template: `
    <main class="content">
      <lib-nav-tabs [routes]="routes" style="margin-top: 1em"></lib-nav-tabs>
      <h1>Nav Tabs Component Demo</h1>
      <router-outlet></router-outlet>

    </main>
  `,
})
export class AppComponent {
  routes = routes;
}
