import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TabbableRoute, TabLabelCopy} from '../../models/tabs';
import {isObservable, Observable, of} from 'rxjs';

const DEFAULT_TITLE = 'Page Navigation';

@Component({
  selector: 'lib-nav-tabs',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  styleUrls: ['./nav-tabs.component.scss'],
  template: `
      <nav [class]="baseClass" [attr.aria-label]="title$ | async">
          <a
              *ngFor="let route of sortedRoutes"
              [routerLink]="route.path"
              [routerLinkActive]="baseClass + '__tab--active'"
              [class]="baseClass + '__tab'"
              [ariaCurrentWhenActive]="'page'"
          >
              <ng-container *ngIf="translations$ | async as translations">
                  {{ getLabel(route, translations) }}
              </ng-container>
              <ng-container *ngIf="!translations$">
                  {{ getLabel(route) }}
              </ng-container>
          </a>
      </nav>
  `,
})
export class NavTabsComponent<TKeys extends string = string> implements OnChanges {
  @Input() translations$?: Observable<TabLabelCopy<TKeys>>;
  @Input({required: true}) routes: TabbableRoute<TabLabelCopy<TKeys> | void>[] = [];
  @Input() set title(value: string | Observable<string>) {
    this.title$ = isObservable(value) ? value : of(value || DEFAULT_TITLE);
  }
  @Input() useLinks = false;

  baseClass: string = 'nav-tabs';
  title$: Observable<string> = of(DEFAULT_TITLE);
  sortedRoutes: TabbableRoute<TabLabelCopy<TKeys> | void>[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['routes']) {
      this.sortRoutes();
    }
    if (changes['useLinks']) {
      this.baseClass = changes['useLinks'] ? 'nav-links' : 'nav-tabs'
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
