import { TabLabelCopy } from 'nav-tabs';

export enum TabTranslationKeys {
  SETTINGS = 'SETTINGS',
  PROFILE = 'PROFILE',
  DASHBOARD = 'DASHBOARD',
}

// other option:
// type ValidKeys = 'SETTINGS' | 'PROFILE' | 'DASHBOARD';
// export type AppTabsCopyModel = TabLabelCopy<ValidKeys>;

export type AppTabsCopyModel = TabLabelCopy<keyof typeof TabTranslationKeys>;
