import { Routes } from '@angular/router';
import { RouteDataComponent } from './components/route-data/route-data.component';
import { TabbableRoute } from 'nav-tabs';
import { AppTabsCopyModel, TabTranslationKeys } from './models/copy';

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
    path: 'profile-2',
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

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  ...tabbableRoutes,
  ...translatedRoutes,
];
