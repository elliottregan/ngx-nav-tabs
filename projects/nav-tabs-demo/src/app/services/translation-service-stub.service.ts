import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AppTabsCopyModel } from '../models/copy';

const TABS_COPY: AppTabsCopyModel = {
  SETTINGS: 'Settings (Translated)',
  DASHBOARD: 'Dashboard (Translated)',
  PROFILE: 'Profile (Translated)',
};

@Injectable({
  providedIn: 'root',
})
export class TranslationServiceStub {
  public readonly tabsCopy$ = of(TABS_COPY);
}
