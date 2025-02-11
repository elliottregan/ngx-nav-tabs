import {Routes} from '@angular/router';
import {TabbableRoute} from 'nav-tabs';
import {FeatureFlagDemoComponent} from "./components/feature-flag-demo/feature-flag-demo.component";
import {DynamicRoutesDemoComponent} from "./components/dynamic-routes-demo/dynamic-routes-demo.component";
import {StaticDemosComponent} from "./components/static-demos/static-demos.component";
import {IntroComponent} from "./components/intro/intro.component";
import {featureFlagRoutes, tabbableRoutes, translatedRoutes} from "./stubs.routes";

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
    children: featureFlagRoutes
  },
];
