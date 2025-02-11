import { Component, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TabTranslationKeys} from "../../models/copy";

export interface RouteFormData {
  path: string;
  label: string;
  order: number;
  translationKey?: TabTranslationKeys;
}

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
      <div class="route-manager">
          <h3>Add New Route</h3>
          <form [formGroup]="routeForm" (ngSubmit)="onSubmit()" class="form-group">
              <div class="form-field">
                  <label for="path">Path</label>
                  <input
                          id="path"
                          formControlName="path"
                          placeholder="/home"
                          class="input"
                          [class.error]="routeForm.get('path')?.invalid && routeForm.get('path')?.touched"
                  />
              </div>
              <div class="form-field">
                  <label for="label">Label</label>
                  <input
                          id="label"
                          formControlName="label"
                          placeholder="Home"
                          class="input"
                          [class.error]="routeForm.get('label')?.invalid && routeForm.get('label')?.touched"
                  />
              </div>
              <div class="form-field">
                  <label for="order">Order</label>
                  <input
                          id="order"
                          formControlName="order"
                          placeholder="Order"
                          class="input"
                          type="number"
                          [class.error]="routeForm.get('order')?.invalid && routeForm.get('order')?.touched"
                  />
              </div>
              <div class="form-field">
                  <label for="translationKey">Translation Key (optional)</label>
                  <select
                          id="translationKey"
                          formControlName="translationKey"
                          class="input"
                          [class.error]="routeForm.get('translationKey')?.invalid && routeForm.get('translationKey')?.touched"
                  >
                      <option value="">None</option>
                      <option *ngFor="let key of translationKeys" [value]="key">
                          {{ key }}
                      </option>
                  </select>
              </div>
              <button type="submit" class="button">Add Route</button>
          </form>
      </div>
  `,
  styles: [
    `
      .route-manager {
        padding: 1rem;
        /*border: 1px solid #e2e8f0;*/
        background-color: #f8fafc;

        > * {
            margin-top: 0;
            margin-bottom: 0;
        }
      }

      .form-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
      }
      
      .form-field {
          display: flex;
          flex-direction: column;
      }

      label {
          font-weight: 600;
      }
      
      .input {
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          flex: 1;
      }

      .input.error {
          border-color: #ef4444;
      }

      .button {
          padding: 0.5rem 1rem;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          white-space: nowrap;
      }

      .button:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
      }

      .button:not(:disabled):hover {
          background-color: #2563eb;
      }

      select.input {
          appearance: auto;
      }
    `,
  ],
})
export class RouteFormComponent {
  routeForm: FormGroup;
  @Output() routeAdded = new EventEmitter<RouteFormData>();
  translationKeys = Object.values(TabTranslationKeys);

  constructor(private fb: FormBuilder) {
    this.routeForm = this.fb.group({
      path: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      label: ['', Validators.required],
      order: [1, Validators.required],
      translationKey: [''],
    });
  }

  onSubmit() {
    if (this.routeForm.valid) {
      const { path, label, order, translationKey } = this.routeForm.value;
      // Only include translationKey if it has a value
      const routeData: RouteFormData = {
        path,
        label,
        order,
        ...(translationKey && {
          translationKey,
        }),
      };
      this.routeAdded.emit(routeData);
      this.routeForm.reset();
    }
  }
}
