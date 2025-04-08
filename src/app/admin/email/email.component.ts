import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,NavbarComponent,BackButtonComponent],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class AdminEmailComponent {
  
    emailForm: FormGroup;
    isLoading = false;
  
    constructor(
      private fb: FormBuilder,
      private emailService: EmailService,
      private snackBar: MatSnackBar
    ) {
      this.emailForm = this.fb.group({
        requestId: ['', Validators.required], // Request ID input
        additionalRequest: ['', [Validators.required, Validators.minLength(10)]]
      });
    }
  
    onSubmit() {
      if (this.emailForm.valid) {
        this.isLoading = true;
        const { requestId, additionalRequest } = this.emailForm.value;
  
        this.emailService.sendEmail(requestId, additionalRequest).subscribe({
          next: (response) => {
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
            this.emailForm.reset();
          },
          error: (error) => {
            this.snackBar.open(error.error.message || 'Failed to send email', 'Close', { duration: 3000 });
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      }
    }
  }


