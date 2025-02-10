import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavTabsComponent } from 'nav-tabs';
import { RouteFormComponent } from './components/route-form/route-form.component';
import { TabbableRoute } from 'nav-tabs';
import { tabbableRoutes, translatedRoutes } from './app.routes';
import { RouteDataComponent } from './components/route-data/route-data.component';
import { AppTabsCopyModel } from './models/copy';
import { TranslationServiceStub } from './services/translation-service-stub.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavTabsComponent, RouteFormComponent, CommonModule],
  template: `
    <main class="content">
      <app-route-form (routeAdded)="addRoute($event)"></app-route-form>
      
      <section class="route-list">
        <h3>Dynamic Routes</h3>
        <div *ngFor="let route of dynamicRoutes" class="route-item">
          <span>{{ route.data.tabData.label }} (/{{ route.path }})</span>
          <button (click)="removeRoute(route)" class="button delete">Remove</button>
        </div>
      </section>

      <hr />

      <article>
        <h2>TODO: Feature Flag</h2>
      </article>

      <article>
        <h2>Routes without translations:</h2>
        <lib-nav-tabs [routes]="visibleRoutes"></lib-nav-tabs>
      </article>

      <hr />

      <article>
        <h2>Routes with translations:</h2>
        <lib-nav-tabs [routes]="visibleRoutes" [translations$]="tabsCopy$"></lib-nav-tabs>
      </article>

      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
    .content {
      padding: 1rem;
    }
    .route-list {
      padding: 1rem;
    }
    .route-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 1px solid #e2e8f0;
    }
    .button.delete {
      padding: 0.5rem 1rem;
      background-color: #ef4444;
      color: white;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    .button.delete:hover {
      background-color: #dc2626;
    }
  `,
  ],
})
export class AppComponent {
  private router = inject(Router);
  private baseRoutes: TabbableRoute[] = tabbableRoutes;
  private translatedRoutes: TabbableRoute<AppTabsCopyModel>[] =
    translatedRoutes;

  tabsCopy$ = inject(TranslationServiceStub).tabsCopy$;
  dynamicRoutes: (TabbableRoute | TabbableRoute<AppTabsCopyModel>)[] = [];

  get visibleRoutes(): (TabbableRoute | TabbableRoute<AppTabsCopyModel>)[] {
    return [
      ...this.baseRoutes,
      ...this.translatedRoutes,
      ...this.dynamicRoutes,
    ];
  }

  addRoute(formData: { path: string; label: string; translationKey?: string }) {
    const route = formData.translationKey
      ? {
          path: formData.path,
          component: RouteDataComponent,
          data: {
            tabData: {
              translationKey: formData.translationKey,
              label: formData.label,
            },
          },
        }
      : {
          path: formData.path,
          component: RouteDataComponent,
          data: { tabData: { label: formData.label } },
        };

    this.dynamicRoutes.push(route);
    this.updateRouterConfig();
  }

  removeRoute(routeToRemove: TabbableRoute | TabbableRoute<AppTabsCopyModel>) {
    this.dynamicRoutes = this.dynamicRoutes.filter(
      (route) => route.path !== routeToRemove.path
    );
    this.updateRouterConfig();
  }

  private updateRouterConfig() {
    this.router.resetConfig(this.visibleRoutes);
  }
}
