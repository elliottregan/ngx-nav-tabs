import { Routes } from '@angular/router';
import { RouteDataComponent } from './components/route-data/route-data.component';
import { TabbableRoute } from 'nav-tabs';
import { AppTabsCopyModel, TabTranslationKeys } from './models/copy';
import {FeatureFlagDemoComponent} from "./components/feature-flag-demo/feature-flag-demo.component";
import {DynamicRoutesDemoComponent} from "./components/dynamic-routes-demo/dynamic-routes-demo.component";
import {StaticDemosComponent} from "./components/static-demos/static-demos.component";
import {IntroComponent} from "./components/intro/intro.component";

export const tabbableRoutes: TabbableRoute[] = [
  {
    path: 'dashboard',
    component: RouteDataComponent,
    data: {
      tabData: {
        label: 'Dashboard',
        order: 1,
      },
      description: 'Main dashboard view',
      features: ['Analytics', 'Reports', 'Settings'],
    },
  },
  {
    path: 'profile',
    component: RouteDataComponent,
    data: {
      tabData: {
        label: 'User Profile',
        order: 1,
      },
      description: 'User profile and preferences',
      lastUpdated: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
  },
];

export const translatedRoutes: TabbableRoute<AppTabsCopyModel>[] = [
  {
    path: 'settings',
    component: RouteDataComponent,
    data: {
      tabData: {
        translationKey: TabTranslationKeys.SETTINGS,
        label: 'Settings',
        order: 1,
      },
      description: 'Application settings and configuration',
      categories: ['General', 'Security', 'Notifications'],
    },
  },
  {
    path: 'profile',
    component: RouteDataComponent,
    data: {
      tabData: {
        translationKey: 'PROFILE',
        label: 'Profile 2',
        order: 1,
      },
      description: 'This tab uses a translated value.',
    },
  },
];

export const baseRoute: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
]

export const routes: TabbableRoute[] = [
  {
    path: 'about',
    component: IntroComponent,
    pathMatch: 'full',
    data: {
      tabData: {
        label: 'About',
        order: 1,
      },
    }
  },
  {
    path: 'simple-demos',
    component: StaticDemosComponent,
    children: [
      ...tabbableRoutes,
      ...translatedRoutes
    ],
    data: {
      tabData: {
        label: 'Simple Demos',
        order: 1,
      },
    },
  },
  {
    path: 'dynamic-routes',
    component: DynamicRoutesDemoComponent,
    children: [
      ...tabbableRoutes,
      ...translatedRoutes
    ],
    data: {
      tabData: {
        label: 'Dynamic Routes',
        order: 1,
      },
    },
  },
  {
    path: 'feature-flags',
    component: FeatureFlagDemoComponent,
    data: {
      tabData: {
        label: 'Feature Flags',
        order: 1,
      },
    },
    children: [
      {
        path: 'basic-feature',
        component: RouteDataComponent,
        data: {
          tabData: {
            label: 'Basic Feature',
            order: 1,
          },
        },
      },
      {
        path: 'basic-feature-2',
        component: RouteDataComponent,
        data: {
          tabData: {
            label: 'Basic Feature 2',
            order: 2,
          },
        },
      },
      {
        path: 'beta-feature',
        component: RouteDataComponent,
        data: {
          tabData: {
            label: 'Beta Feature',
            order: 3,
          },
        },
      }
    ]
  },
];
