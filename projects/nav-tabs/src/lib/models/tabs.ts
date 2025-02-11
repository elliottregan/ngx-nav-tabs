import {Route as NgRoute} from '@angular/router';

export type TabLabelCopy<TKeys extends string> = Record<TKeys, string>;

export interface TabbableRoute<T extends TabLabelCopy<string> | void = void>
  extends NgRoute {
  data: {
    tabData: T extends TabLabelCopy<infer Keys>
      ? {
        translationKey: Keys;
        label: string;
        order: number;
      }
      : {
        label: string;
        order: number;
      };
    [key: string]: any;
  };
}
