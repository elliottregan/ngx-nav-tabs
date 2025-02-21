import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavTabsComponent } from 'nav-tabs';
import { TranslationServiceStub } from '../../services/translation-service-stub.service';
import { translatedRoutes } from "../../stubs.routes";

@Component({
    selector: 'app-static-demos',
    standalone: true,
    imports: [NavTabsComponent, RouterOutlet],
    template: `
    <article class="translation-demo">
      <section>
        <h2>Routes without translations:</h2>
        <lib-nav-tabs [routes]="translatedRoutes"></lib-nav-tabs>

        <h2>Routes with translations:</h2>
        <lib-nav-tabs 
          [routes]="translatedRoutes" 
          [translations$]="tabsCopy$">
        </lib-nav-tabs>
      </section>
      <section>
        <router-outlet></router-outlet>
      </section>

      <section class="red-theme">
        <h2>Style adjustments without <code>::ng-deep</code>:</h2>
        <lib-nav-tabs [routes]="translatedRoutes"></lib-nav-tabs>
        <lib-nav-tabs [routes]="translatedRoutes" class="green-theme"></lib-nav-tabs>
        <lib-nav-tabs [routes]="translatedRoutes" class="blue-theme"></lib-nav-tabs>
      </section>
    </article>
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
    
    .red-theme {
      --tab-active-text: red;
      --tab-text-color: salmon;
    }
    .green-theme {
      --tab-active-text: green;
      --tab-text-color: cadetblue;
    }
    .blue-theme {
      --tab-active-text: navy;
      --tab-text-color: blue;
      --nav-background: whitesmoke;
      --tab-underline-width: 4px;
    }
    lib-nav-tabs {
      margin-bottom: 1rem;
    }
  `]
})
export class StaticDemosComponent {
    translatedRoutes = translatedRoutes;
    tabsCopy$ = inject(TranslationServiceStub).tabsCopy$;
}
