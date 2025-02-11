// translation-demo.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavTabsComponent } from 'nav-tabs';
import { TabbableRoute } from 'nav-tabs';
import { tabbableRoutes, translatedRoutes } from '../../app.routes';
import { TranslationServiceStub } from '../../services/translation-service-stub.service';

@Component({
    selector: 'app-static-demos',
    standalone: true,
    imports: [CommonModule, NavTabsComponent, RouterOutlet],
    template: `
    <section class="translation-demo">
      <article>
        <h2>Routes without translations:</h2>
        <lib-nav-tabs [routes]="baseRoutes"></lib-nav-tabs>
      </article>

      <article>
        <h2>Routes with translations:</h2>
        <lib-nav-tabs 
          [routes]="translatedRoutes" 
          [translations$]="tabsCopy$">
        </lib-nav-tabs>
      </article>

      <router-outlet></router-outlet>
    </section>
  `,
    styles: [`
    .translation-demo {
      margin: 2rem 0;
    }

    hr {
      margin: 2rem 0;
      border: none;
      border-top: 1px solid #e2e8f0;
    }
  `]
})
export class StaticDemosComponent {
    baseRoutes: TabbableRoute[] = tabbableRoutes;
    translatedRoutes = translatedRoutes;
    tabsCopy$ = inject(TranslationServiceStub).tabsCopy$;
}
