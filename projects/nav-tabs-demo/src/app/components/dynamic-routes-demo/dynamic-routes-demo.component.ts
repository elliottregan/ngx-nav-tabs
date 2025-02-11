// dynamic-routes-demo.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavTabsComponent, TabbableRoute } from 'nav-tabs';
import { RouteFormComponent, RouteFormData } from '../route-form/route-form.component';
import { RouteDataComponent } from '../route-data/route-data.component';
import { AppTabsCopyModel } from '../../models/copy';
import { tabbableRoutes, translatedRoutes } from '../../app.routes';

@Component({
  selector: 'app-dynamic-routes-demo',
  standalone: true,
  imports: [CommonModule, NavTabsComponent, RouteFormComponent],
  template: `
    <section class="dynamic-routes-demo">
      <app-route-form (routeAdded)="addRoute($event)"></app-route-form>

      <section class="route-list">
        <h3>Dynamic Routes</h3>
        <div *ngFor="let route of dynamicRoutes" class="route-item">
          <span>{{ route.data.tabData.label }} (/{{ route.path }})</span>
          <button (click)="removeRoute(route)" class="button delete">
            Remove
          </button>
        </div>
      </section>

      <article>
        <h2>Dynamic Routes Demo</h2>
        <lib-nav-tabs [routes]="visibleRoutes"></lib-nav-tabs>
      </article>
    </section>
  `,
  styles: [
    `
      .dynamic-routes-demo {
        margin-bottom: 2rem;
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
export class DynamicRoutesDemoComponent {
  private router = inject(Router);
  private baseRoutes: TabbableRoute[] = tabbableRoutes;
  private translatedRoutes: TabbableRoute<AppTabsCopyModel>[] =
    translatedRoutes;
  dynamicRoutes: (TabbableRoute | TabbableRoute<AppTabsCopyModel>)[] = [];

  get visibleRoutes(): (TabbableRoute | TabbableRoute<AppTabsCopyModel>)[] {
    return [
      ...this.baseRoutes,
      ...this.translatedRoutes,
      ...this.dynamicRoutes,
    ];
  }

  addRoute(formData: RouteFormData) {
    const route = formData.translationKey
      ? {
          path: formData.path,
          component: RouteDataComponent,
          data: {
            tabData: {
              translationKey: formData.translationKey,
              label: formData.label,
              order: formData.order,
            },
          },
        }
      : {
          path: formData.path,
          component: RouteDataComponent,
          data: { tabData: { label: formData.label, order: formData.order, } },
        };

    this.dynamicRoutes.push(route);
    this.updateRouterConfig();
  }

  removeRoute(routeToRemove: TabbableRoute | TabbableRoute<AppTabsCopyModel>) {
    this.dynamicRoutes = this.dynamicRoutes.filter(
      (route) => route.path !== routeToRemove.path,
    );
    this.updateRouterConfig();
  }

  private updateRouterConfig() {
    this.router.resetConfig(this.visibleRoutes);
  }
}
