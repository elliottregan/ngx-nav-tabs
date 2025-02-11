import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TabbableRoute, TabLabelCopy } from '../../models/tabs';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-nav-tabs',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="nav-tabs">
      <!-- When translations$ is provided -->
      <ng-container *ngIf="translations$ | async as translations">
        <a
        *ngFor="let route of sortedRoutes"
        [routerLink]="route.path"
        routerLinkActive="active"
        class="nav-tab"
        >
        {{ getLabel(route, translations) }}
        </a>
      </ng-container>
      <!-- When translations$ is not provided -->
      <ng-container *ngIf="!translations$">
        <a
        *ngFor="let route of sortedRoutes"
        [routerLink]="route.path"
        routerLinkActive="active"
        class="nav-tab"
        >
        {{ getLabel(route) }}
        </a>
      </ng-container>
    </nav>
  `,
  styles: [
    `
      .nav-tabs {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid #e2e8f0;
      }
      .nav-tab {
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: #64748b;
        border-radius: 0.25rem;
      }
      .nav-tab:hover {
        color: #334155;
        background-color: #f1f5f9;
      }
      .nav-tab.active {
        color: #0f172a;
        background-color: #e2e8f0;
      }
    `,
  ],
})
export class NavTabsComponent<TKeys extends string = string> implements OnChanges {
  @Input({ required: true })
  routes: TabbableRoute<TabLabelCopy<TKeys> | void>[] = [];

  @Input() translations$?: Observable<TabLabelCopy<TKeys>>;

  sortedRoutes: TabbableRoute<TabLabelCopy<TKeys> | void>[] = [];

  ngOnChanges() {
    this.sortRoutes();
  }

  private sortRoutes() {
    this.sortedRoutes = [...this.routes].sort(
        (a, b) => a.data.tabData.order - b.data.tabData.order
    );
  }

  getLabel(
      route: TabbableRoute<TabLabelCopy<TKeys> | void>,
      translations?: TabLabelCopy<TKeys>
  ): string {
    if (translations && 'translationKey' in route.data.tabData) {
      return (
          translations[route.data.tabData.translationKey as TKeys] ||
          route.data.tabData.label
      );
    }
    return route.data.tabData.label;
  }
}
