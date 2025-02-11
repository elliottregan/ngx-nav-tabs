import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route-data',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="route-data">
      <h2>Route Data</h2>
      <pre class="data-container">
      <dl>
          <dt>Route Path:</dt>
          <dd>{{ routePath }}</dd>
          @for (item of routeData | keyvalue; track item.key) {
            <dt>{{ item.key }}:</dt>
            @if (item.key === 'tabData') {
              <dd>
                @for (prop of item.value | keyvalue; track prop.key) {
                  <strong>{{ prop.key }}:</strong> {{ prop.value }}
                }
              </dd>
            } @else {
              <dd>{{ item.value }}</dd>
            }
          }
        </dl>
      </pre>
    </div>
  `,
  styles: [
    `
    .route-data {
      padding: 2rem;
      background-color: #fff;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .data-container {
      margin-top: 1rem;
    }
    pre {
      white-space: normal;
    }
    dt {
      font-weight: bold;
      font-size: 1.2em;
    }
    dd {
      margin-left: 0;
      margin-bottom: 1rem;
    }
  `,
  ],
})
export class RouteDataComponent {
  private route = inject(ActivatedRoute);
  routeData = this.route.snapshot.data;
  routePath: string = this.route.snapshot.url
    .map((segment) => segment.path)
    .join('/');
}
