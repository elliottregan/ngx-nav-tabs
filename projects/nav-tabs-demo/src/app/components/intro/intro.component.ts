import {Component} from '@angular/core';

@Component({
  selector: 'app-intro',
  standalone: true,
  template: `
      <section>

          <h2>Purpose</h2>
          <p>Provides an accessible navigation menu that is easy to configure using your application's existing Angular
              Routes. This component eliminates the complexity of manually synchronizing navigation state with your
              router, reduces boilerplate code for common navigation patterns, and solves accessibility compliance
              challenges by implementing proper ARIA attributes and keyboard interactions out of the box.
          </p>

          <h2>Key Features</h2>

          <h3>WCAG Compliant</h3>
          <p>
              Built-in accessibility support that meets WCAG 2.2 AA guidelines. Includes keyboard navigation, screen
              reader compatibility, and semantic HTML with ARIA notations.
          </p>

          <h3>Config-Based Tab Configuration</h3>
          <p>
              Declaratively define tabs using existing Angular route configurations.
          </p>

          <h3>Add or Remove Tabs at Runtime</h3>
          <p>
              Programmatically add, remove or reorder tabs at runtime. Supports feature flags, conditional content
              loading, and runtime tab customization through a simple API.
          </p>

          <h3>Type-Safe Translations</h3>
          <p>
              Built-in handling for asynchronous translations, automatically updating tabs when translations change.
              Correct translation keys are automatically enforced with TypeScript to ensure translations are available.
          </p>
      </section>
  `,
})
export class IntroComponent {
}
