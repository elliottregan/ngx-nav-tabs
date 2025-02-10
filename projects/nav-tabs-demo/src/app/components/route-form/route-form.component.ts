import { Component, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

interface RouteFormData {
  path: string;
  label: string;
  translationKey?: string;
}

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="route-manager">
      <h3>Add New Route</h3>
      <form [formGroup]="routeForm" (ngSubmit)="onSubmit()" class="form-group">
        <input
          formControlName="path"
          placeholder="Path"
          class="input"
          [class.error]="routeForm.get('path')?.invalid && routeForm.get('path')?.touched"
        />
        <input
          formControlName="label"
          placeholder="Label"
          class="input"
          [class.error]="routeForm.get('label')?.invalid && routeForm.get('label')?.touched"
        />
        <input
          formControlName="translationKey"
          placeholder="Translation Key (optional)"
          class="input"
          [class.error]="routeForm.get('translationKey')?.invalid && routeForm.get('translationKey')?.touched"
        />
        <button type="submit" class="button" [disabled]="routeForm.invalid">Add Route</button>
      </form>
    </div>
  `,
  styles: [
    `
    .route-manager {
      padding: 1rem;
      background-color: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }
    .form-group {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
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
  `,
  ],
})
export class RouteFormComponent {
  routeForm: FormGroup;
  @Output() routeAdded = new EventEmitter<RouteFormData>();

  constructor(private fb: FormBuilder) {
    this.routeForm = this.fb.group({
      path: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      label: ['', Validators.required],
      translationKey: ['', [Validators.pattern(/^[A-Z0-9_]+$/)]],
    });
  }

  onSubmit() {
    if (this.routeForm.valid) {
      const formValue = this.routeForm.value;
      // Only include translationKey if it has a value
      const routeData: RouteFormData = {
        path: formValue.path,
        label: formValue.label,
        ...(formValue.translationKey && {
          translationKey: formValue.translationKey,
        }),
      };
      this.routeAdded.emit(routeData);
      this.routeForm.reset();
    }
  }
}
