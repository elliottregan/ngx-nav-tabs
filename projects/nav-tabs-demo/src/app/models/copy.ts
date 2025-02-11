import { TabLabelCopy } from 'nav-tabs';

export enum TabTranslationKeys {
  SETTINGS = 'SETTINGS',
  PROFILE = 'PROFILE',
  DASHBOARD = 'DASHBOARD',
}

export type AppTabsCopyModel = TabLabelCopy<keyof typeof TabTranslationKeys>;
