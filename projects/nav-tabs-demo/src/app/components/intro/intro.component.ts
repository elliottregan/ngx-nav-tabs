// intro.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-intro',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="intro">
      <div class="feature-list">
        <h2>Key Features</h2>

        <div class="feature">
          <h3>Dynamic Tab Management</h3>
          <p>
            Add or remove tabs at runtime through a simple API. Useful for:
          </p>
          <ul>
            <li>Feature flags and permissions</li>
            <li>Dynamic content loading</li>
            <li>User customization</li>
          </ul>
        </div>

        <div class="feature">
          <h3>Async Translation Support</h3>
          <p>Built-in handling for asynchronous translations with:</p>
          <ul>
            <li>Observable-based translation streams</li>
            <li>Automatic tab updates when translations change</li>
            <li>Fallback to default labels when translations are loading</li>
          </ul>
        </div>

        <div class="feature">
          <h3>Type-Safe Translations</h3>
          <p>Enhanced type safety for translation keys:</p>
          <ul>
            <li>Generic type support for translation models</li>
            <li>Compile-time checking of translation keys</li>
            <li>Improved maintainability and refactoring support</li>
          </ul>
        </div>
      </div>
    </section>
  `,
    styles: [`
    .intro {
      margin-bottom: 2rem;
    }

    .feature-list {
      margin: 2rem 0;
    }

    .feature {
      margin: 1.5rem 0;
      padding: 1rem;
      background-color: #f8fafc;
      border-radius: 0.5rem;
    }

    .feature h3 {
      color: #0f172a;
      margin-bottom: 0.5rem;
    }

    .feature p {
      margin-bottom: 0.5rem;
    }

    .feature ul {
      margin-left: 1.5rem;
      list-style-type: disc;
    }

    .feature li {
      margin: 0.25rem 0;
      color: #475569;
    }
  `]
})
export class IntroComponent {}
