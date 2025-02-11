import {TabbableRoute} from "nav-tabs";
import {AppTabsCopyModel, TabTranslationKeys} from "./models/copy";
import {RouteDataComponent} from "./components/route-data/route-data.component";

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
        label: 'User Profile',
        order: 1,
      },
      description: 'This tab uses a translated value.',
    },
  },
  {
    path: 'dashboard',
    component: RouteDataComponent,
    data: {
      tabData: {
        translationKey: TabTranslationKeys.DASHBOARD,
        label: 'Dashboard',
        order: 1,
      },
      description: 'This tab uses a translated value.',
    },
  },
];

export const tabbableRoutes: TabbableRoute[] = [
  {
    path: 'dashboard',
    component: RouteDataComponent,
    data: {
      tabData: {
        label: 'Settings',
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

export const featureFlagRoutes = [
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
];
