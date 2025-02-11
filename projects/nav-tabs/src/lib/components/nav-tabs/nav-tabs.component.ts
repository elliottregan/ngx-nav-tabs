import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TabbableRoute, TabLabelCopy} from '../../models/tabs';
import {Observable} from 'rxjs';

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
  styleUrls: ['./nav-tabs.scss'],
})
export class NavTabsComponent<TKeys extends string = string> implements OnChanges {
  @Input() translations$?: Observable<TabLabelCopy<TKeys>>;
  @Input({required: true}) routes: TabbableRoute<TabLabelCopy<TKeys> | void>[] = [];

  sortedRoutes: TabbableRoute<TabLabelCopy<TKeys> | void>[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['routes']) {
      this.sortRoutes();
    }
  }

  // TODO: avoid a getter in the template
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

  private sortRoutes() {
    this.sortedRoutes = [...this.routes].sort(
      (a, b) => a.data.tabData.order - b.data.tabData.order
    );
  }
}
