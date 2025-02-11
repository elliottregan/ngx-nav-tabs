// feature-flag-demo.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabsComponent } from 'nav-tabs';
import { TabbableRoute } from 'nav-tabs';
import { RouteDataComponent } from '../route-data/route-data.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-flag-demo',
  standalone: true,
  imports: [CommonModule, NavTabsComponent, FormsModule],
  template: `
    <section class="feature-flag-demo">
      <h2>Feature Flag Demo</h2>
      <p>Toggle features to add/remove corresponding tabs:</p>

      <div class="feature-toggles">
        <div *ngFor="let feature of availableFeatures" class="toggle-item">
          <label class="toggle-label">
            <input
              type="checkbox"
              [checked]="isFeatureEnabled(feature)"
              (change)="toggleFeature(feature)" />
            {{ feature.data.tabData.label }}
          </label>
        </div>
      </div>

      <article class="demo-section">
        <lib-nav-tabs [routes]="visibleRoutes"></lib-nav-tabs>
      </article>
    </section>
  `,
  styles: [
    `
      .feature-flag-demo {
        margin: 2rem 0;
      }

      .feature-toggles {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 1rem 0;
        padding: 1rem;
        background-color: #f8fafc;
        border-radius: 0.5rem;
      }

      .toggle-item {
        display: flex;
        align-items: center;
      }

      .toggle-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
      }

      .demo-section {
        margin-top: 1rem;
      }
    `,
  ],
})
export class FeatureFlagDemoComponent {
  private router = inject(Router);
  availableFeatures: TabbableRoute[] = [
    {
      path: 'basic-feature',
      component: RouteDataComponent,
      data: {
        tabData: {
          label: 'Basic Feature',
        },
      },
    },
    {
      path: 'basic-feature-2',
      component: RouteDataComponent,
      data: {
        tabData: {
          label: 'Basic Feature 2',
        },
      },
    },
    {
      path: 'beta-feature',
      component: RouteDataComponent,
      data: {
        tabData: {
          label: 'Beta Feature',
        },
      },
    },
  ];

  // Start with just the basic feature enabled
  visibleRoutes: TabbableRoute[] = [this.availableFeatures[0]];

  isFeatureEnabled(feature: TabbableRoute): boolean {
    return this.visibleRoutes.some((route) => route.path === feature.path);
  }

  toggleFeature(feature: TabbableRoute): void {
    if (this.isFeatureEnabled(feature)) {
      this.visibleRoutes = this.visibleRoutes.filter(
        (route) => route.path !== feature.path,
      );
    } else {
      this.visibleRoutes = [...this.visibleRoutes, feature];
    }
    this.router.resetConfig(this.visibleRoutes);
  }
}
