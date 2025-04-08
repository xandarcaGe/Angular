import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { EmailService } from '../../services/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-manager-email',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NavbarComponent,
    MatProgressSpinner,
    BackButtonComponent
  ],
  templateUrl: './manager-email.component.html',
  styleUrl: './manager-email.component.css'
})
export class ManagerEmailComponent {
  emailForm:FormGroup;
  isLoading= false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private snackBar: MatSnackBar
  ){
    this.emailForm = this.fb.group({
      requestId:['', Validators.required],
      additionalRequest:['',[Validators.required, Validators.minLength(10)]]
    });
  }

    onsubmit(){
      if (this.emailForm.valid){
        this.isLoading = true;
        const{ requestId, additionalRequest} = this.emailForm.value;

        this.emailService.sendManagerEmail(requestId, additionalRequest).subscribe({
          next:(response) =>{
            this.snackBar.open(response.message, 'Close',{duration:3000});
            this.emailForm.reset();
          },
          error:(error) =>{
            this.snackBar.open(error.error.message || "Failed to send email",'Close',{duration: 3000});

          },
          complete:() =>{
            this.isLoading = false;
          }
        });

      }
    }
  }


