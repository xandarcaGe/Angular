import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-update-request',
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
  templateUrl: './update-request.component.html',
  styleUrl: './update-request.component.css'
})
export class UpdateRequestComponent implements OnInit {
  requestForm!: FormGroup;
  travelModes = ['Flight', 'Train', 'Bus', 'Car'];
  requestId!: string;
  requestStatus!: boolean;

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';

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

    this.loadRequestData();
  }

  loadRequestData(): void {
    this.requestService.getRequestById(this.requestId).subscribe(
      (data) => {
        console.log('Loaded Request Data:', data);
        this.requestForm.patchValue(data);
        
      },
      (error) => {
        console.error('Error loading request:', error);
      }
    );
  }

  updateRequest(): void {
    if (this.requestForm.valid) {
      this.requestService.updateRequest(this.requestId, this.requestForm.value).subscribe(
        (response) => {
          console.log('Request updated successfully:', response);
          this.router.navigate(['/employee/home']); // Redirect to requests list
        },
        (error) => {
          console.error('Error updating request:', error);
        }
      );
    }
  }
  loadRequestDataForResubmit():void {
    this.requestService.getRequestById(this.requestId).subscribe(
      (data) => {
        console.log('Loaded Request Data:', data);
        
        this.requestForm.patchValue(data);
        this.requestStatus = data.is_pending=== true;  
  
        console.log("✅ is_pending Status Set:", this.requestStatus);  // Debugging log
      },
      (error) => {
        console.error('❌ Error loading request:', error);
      }
    );

  }
  resubmitRequest(): void {
    
      this.requestService.resubmitRequest(this.requestId, this.requestForm.value).subscribe(
        (response) => {
          console.log('Request resubmitted successfully:', response);
          this.router.navigate(['/employee/home']);
        },
        (error) => {
          console.error('Error resubmitting request:', error);
        }
      );
    
  }
  
}
