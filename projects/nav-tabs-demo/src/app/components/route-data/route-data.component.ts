import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {KeyValuePipe} from "@angular/common";

@Component({
  selector: 'app-route-data',
  standalone: true,
  template: `
      <div class="card">
          <div class="card-header">
              <h2>Route Data</h2>
          </div>
          <div class="card-content">
              <dl class="info-list">
                  <dt class="info-term">Route Path:</dt>
                  <dd class="info-description">{{ routePath }}</dd>

                  @for (item of routeData | keyvalue; track item.key) {
                      <dt class="info-term">{{ item.key }}:</dt>
                      @if (item.key === 'tabData') {
                          <dd class="info-description">
                              <ul class="properties-list">
                                  @for (prop of item.value | keyvalue; track prop.key) {
                                      <li class="property-item">
                                          <span class="property-label">{{ prop.key }}:</span>
                                          <span class="property-value">{{ prop.value }}</span>
                                      </li>
                                  }
                              </ul>
                          </dd>
                      } @else {
                          <dd class="info-description">{{ item.value }}</dd>
                      }
                  }
              </dl>
          </div>
      </div>
  `,
  styles: [`
      .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
      }

      .card-header {
          background: #f5f5f5;
          padding: 1rem;
          border-bottom: 1px solid #eee;
      }

      .card-header > * {
          margin: 0;
          font-size: 1.25rem;
          color: #333;
      }

      .card-content {
          padding: 1rem;
          overflow: scroll;
      }

      .info-list {
          display: grid;
          grid-template-columns: minmax(120px, 1fr) 2fr;
          gap: 0.5rem 1rem;
          margin: 0;
      }

      .info-term {
          font-weight: 600;
          color: #666;
          margin: 0;
          padding: 0.5rem 0;
      }

      .info-description {
          color: #333;
          margin: 0;
          padding: 0.5rem 0;
      }

      .info-description:not(:last-of-type) {
          border-bottom: 1px solid #eee;
      }

      .info-term:not(:last-of-type) {
          border-bottom: 1px solid #eee;
      }

      .properties-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
      }

      .property-item {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 1rem;
          align-items: baseline;
      }

      .property-label {
          color: #666;
          font-weight: 600;
      }
  `],
  imports: [
    KeyValuePipe
  ]
})
export class RouteDataComponent {
  private route = inject(ActivatedRoute);
  routeData = this.route.snapshot.data;
  routePath: string = this.route.snapshot.url
    .map((segment) => segment.path)
    .join('/');
}
