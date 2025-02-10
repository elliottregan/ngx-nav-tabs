import { TabLabelCopy } from 'nav-tabs';

export enum TabTranslationKeys {
  SETTINGS = 'SETTINGS',
}

type ValidKeys = 'SETTINGS' | 'PROFILE' | 'DASHBOARD';
export type AppTabsCopyModel = TabLabelCopy<ValidKeys>;
