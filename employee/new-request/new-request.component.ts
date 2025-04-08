import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    NavbarComponent,
    BackButtonComponent
  ],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.css'
})
export class NewRequestComponent implements OnInit {
  requestForm!: FormGroup;
  travelModes = ['Flight', 'Train', 'Bus', 'Car'];
  assignedManager: any = null;

  constructor(private fb: FormBuilder, private requestService: RequestService, private router: Router) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      from_location: ['', Validators.required],
      to_location: ['', Validators.required],
      travel_mode: ['', Validators.required],
      starting_date: ['', Validators.required],
      ending_date: ['', Validators.required],
      is_lodging_required: [false],
      lodging_location: [''],
      travel_purpose: ['', Validators.required],
      additional_requests: ['']
    });

    this.getAssignedManager();
  }

  getAssignedManager() {
    console.log("Manager data:")

    this.requestService.getAssignedManager().subscribe(
      (data) => {
        this.assignedManager = data;
        // console.log("manager data:",data)
        console.log('Assigned Manager:', this.assignedManager);
      },
      (error) => {
        console.error('Error fetching assigned manager:', error);
      }
    );
  }

  submitRequest(): void {
    if (this.requestForm.valid) {

      let requestData=this.requestForm.value
      const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.error("⚠️ User ID is missing. Ensure the user is logged in.");
      return;
    }
      requestData.employee = Number(userId);
      requestData.starting_date = this.formatDate(requestData.starting_date);
      requestData.ending_date = this.formatDate(requestData.ending_date);
      console.log('Request Payload:', this.requestForm.value);
      this.requestService.createRequest(this.requestForm.value).subscribe(
        (response) => {
          console.log('Request created successfully:', response);
          this.router.navigate(['/employee/home']); // Navigate back to requests list
        },
        (error) => {
          console.error('Error creating request:', error);
        }
      );
    }
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }
}
