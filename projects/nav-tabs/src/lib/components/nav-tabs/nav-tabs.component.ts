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
    styles: [
        `/* Navigation Tabs Base Styles */
        :root {
            /* Border and Separator Colors */
            --nav-border-color-light: #e2e8f0; /* Soft slate blue, light mode */
            --nav-border-color-dark: #475569; /* Slate gray, dark mode */

            /* Background Colors */
            --nav-background-light: #ffffff; /* Pure white, light mode */
            --nav-background-dark: #1e293b; /* Dark slate blue, dark mode */

            /* Tab Text Colors */
            --tab-text-color-light: #475569; /* Slate gray, light mode */
            --tab-text-color-dark: #cbd5e1; /* Light slate, dark mode */

            /* Tab Hover Background */
            --tab-hover-bg-light: #f1f5f9; /* Very light slate blue, light mode */
            --tab-hover-bg-dark: #334155; /* Darker slate blue, dark mode */

            /* Tab Hover Text */
            --tab-hover-text-light: #1e293b; /* Very dark slate blue, light mode */
            --tab-hover-text-dark: #ffffff; /* White, dark mode */

            /* Active Tab Colors */
            --tab-active-bg-light: #e2e8f0; /* Light slate blue, light mode */
            --tab-active-bg-dark: #334155; /* Slightly lighter dark slate blue, dark mode */
            --tab-active-text-light: #0f172a; /* Almost black, light mode */
            --tab-active-text-dark: #ffffff; /* White, dark mode */
        }

        .nav-tabs {
            --border-color: var(--nav-border-color-light);
            --nav-background: var(--nav-background-light);
            --tab-text-color: var(--tab-text-color-light);
            --tab-hover-bg: var(--tab-hover-bg-light);
            --tab-hover-text: var(--tab-hover-text-light);
            --tab-active-bg: var(--tab-active-bg-light);
            --tab-active-text: var(--tab-active-text-light);
        }

        /* Optional: Responsive Adjustments */
        @media (max-width: 640px) {
            .nav-tabs {
                flex-direction: column;
                align-items: stretch;
                gap: 0.5rem;
            }

            .nav-tab {
                text-align: center;
                width: 100%;
            }
        }

        /* Accessibility Enhancements */
        .nav-tabs .nav-tab:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }

        .nav-tabs {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--border-color, #e2e8f0);
            background-color: var(--nav-background, #ffffff);
        }

        .nav-tab {
            position: relative;
            padding: 0.5rem 1rem;
            text-decoration: none;
            color: var(--tab-text-color, #475569);
            font-weight: 500;
            border-radius: 0.375rem;
            transition: all 0.2s ease-in-out;
            overflow: hidden;
            z-index: 1;
        }

        .nav-tab::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--tab-hover-bg, #f1f5f9);
            opacity: 0;
            z-index: -1;
            transition: opacity 0.2s ease-in-out;
            border-radius: 0.375rem;
        }

        .nav-tab:hover::before {
            opacity: 1;
        }

        .nav-tab:hover {
            color: var(--tab-hover-text, #1e293b);
        }

        .nav-tab.active {
            color: var(--tab-active-text, #0f172a);
            background-color: var(--tab-active-bg, #e2e8f0);
        }

        .nav-tab.active::before {
            opacity: 1;
        }
        `,
    ],
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
