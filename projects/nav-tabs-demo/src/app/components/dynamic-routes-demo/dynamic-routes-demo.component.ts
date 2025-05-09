// dynamic-routes-demo.component.ts
import {Component, inject } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { NavTabsComponent, TabbableRoute } from 'nav-tabs';
import { RouteFormComponent, RouteFormData } from '../route-form/route-form.component';
import { RouteDataComponent } from '../route-data/route-data.component';
import { AppTabsCopyModel } from '../../models/copy';
import { DynamicRoutesService } from "../../services/dynamic-routes.service";
import {TranslationServiceStub} from "../../services/translation-service-stub.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-dynamic-routes-demo',
  imports: [NavTabsComponent, RouteFormComponent, RouterOutlet, NgForOf],
  template: `
      <section class="dynamic-routes-demo">
          <h2>Dynamic Routes</h2>
          <app-route-form (routeAdded)="addRoute($event)"></app-route-form>

          <section class="route-list">
              <h3>Created Routes</h3>
              <div *ngFor="let route of visibleRoutes()" class="route-item">
                  <span>{{ route.data.tabData.label }} <em>/{{ route.path }}</em></span>
                  <button (click)="removeRoute(route)" class="button delete">
                      Remove
                  </button>
              </div>
          </section>

          <article>
              <lib-nav-tabs [routes]="visibleRoutes()" [translations$]="tabsCopy$"></lib-nav-tabs>
              <router-outlet></router-outlet>
          </article>
      </section>
  `,
  standalone: true,
  styles: [
    `
        .dynamic-routes-demo {
            margin-bottom: 2rem;
        }

        .route-list {
            padding: 2rem;
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

            > * {
                margin-top: 0;
            }
        }

        .route-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem;
            border-bottom: 1px solid #e2e8f0;

            &:last-of-type {
                border-bottom: none;
            }
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
  ]
})
export class DynamicRoutesDemoComponent {
  private router = inject(Router);
  private routesService = inject(DynamicRoutesService);
  tabsCopy$ = inject(TranslationServiceStub).tabsCopy$;

  visibleRoutes = this.routesService.getRoutes();

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
          data: { tabData: { label: formData.label, order: formData.order } },
        };

    this.routesService.addRoute(route);
    this.updateRouterConfig();
  }

  removeRoute(route: (TabbableRoute | TabbableRoute<AppTabsCopyModel>)) {
    this.routesService.removeRoute(route);
    this.updateRouterConfig();
  }

  private updateRouterConfig() {
    const currentConfig = [...this.router.config];
    const dynamicRoutesIndex = currentConfig.findIndex(route => route.path === 'dynamic-routes');
      currentConfig[dynamicRoutesIndex] = {
        ...currentConfig[dynamicRoutesIndex],
        children: this.visibleRoutes()
      };

      this.router.resetConfig(currentConfig);

      if (this.visibleRoutes().length > 0) {
        this.router.navigate(['/dynamic-routes', this.visibleRoutes()[this.visibleRoutes().length - 1].path]);
      }
  }
}
