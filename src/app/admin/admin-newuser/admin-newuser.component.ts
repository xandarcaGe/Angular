import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // ✅ Correct way to import
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import as a module
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; // ✅ Add this
import { MatInputModule } from '@angular/material/input'; // ✅ Add this
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-admin-newuser',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ This is the correct module to import
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NavbarComponent,
    MatSelectModule,
    BackButtonComponent
  ],
  templateUrl: './admin-newuser.component.html',
  styleUrls: ['./admin-newuser.component.css']
})
export class AdminNewUserComponent {
  userForm: FormGroup;
  roles = ['employee', 'manager'];  // Admin role should not be selectable

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      username: ['', Validators.required], // Separate username field
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = {
        username: this.userForm.value.username, // Now using actual username
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        first_name: this.userForm.value.fullName.split(' ')[0] || '',
        last_name: this.userForm.value.fullName.split(' ')[1] || '',
        role: this.userForm.value.role,
        department: this.userForm.value.department
      };

      this.userService.addUser(formData).subscribe({
        next: (response) => {
          console.log('User Created:', response);
          alert('User successfully added!');
          this.router.navigate(['/admin/home']);  // Redirect after success
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Failed to add user.');
        }
      });
    }
  }
}