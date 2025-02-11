import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { NavTabsComponent } from 'nav-tabs';

import {routes} from "./app.routes";

@Component({
    selector: 'app-root',
    imports: [
    RouterOutlet,
    NavTabsComponent
],
    standalone: true,
    template: `
        <main class="content">
            <lib-nav-tabs [routes]="routes" style="margin-top: 1em" [useLinks]="true"></lib-nav-tabs>
            <h1>Nav Tabs Component Demo</h1>
            <router-outlet></router-outlet>
        </main>
    `
})
export class AppComponent {
  routes = routes;
}
