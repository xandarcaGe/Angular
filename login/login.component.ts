import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,        // ✅ Enables *ngIf, *ngFor, etc.
    ReactiveFormsModule, // ✅ Enables form controls
    MatCardModule,       // ✅ Enables <mat-card>
    MatFormFieldModule,  // ✅ Enables <mat-form-field>
    MatInputModule,      // ✅ Enables <input matInput>
    MatIconModule,       // ✅ Enables <mat-icon>
    MatButtonModule,     // ✅ Enables <button mat-raised-button>
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {  // ✅ Add this method
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.authService.saveToken(response.token, response.role); // Store token & role

          // Redirect Based on Role
          if (response.role === 'admin') {
            this.router.navigate(['/admin/home']);
          } else if (response.role === 'manager') {
            this.router.navigate(['/manager/home']);
          } else {
            this.router.navigate(['/employee/home']);
          }
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
