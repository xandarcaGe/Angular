import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RequestService } from '../../services/request.service';

import { RequestData as EmployeeRequestData } from '../../services/request.service'; // ✅ Rename it as EmployeeRequestData

import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export interface RequestData {
  id: number;
  from_location: string;
  to_location: string;
  date: string;
  is_approved: boolean;
  is_pending: boolean;
  is_rejected: boolean;
  is_in_progress: boolean;
  is_resubmitted: boolean;
  is_lodging_required: boolean;
}


@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [NavbarComponent,
    CommonModule,         // ✅ Enables *ngIf, *ngFor
    MatCardModule,        // ✅ Enables <mat-card>
    MatTableModule,       // ✅ Enables <table mat-table>
    MatButtonModule,      // ✅ Enables <button mat-button>
    MatIconModule,        // ✅ Enables <mat-icon>
    MatFormFieldModule,   // ✅ Enables form fields
    MatInputModule,
    RouterModule,
    MatToolbarModule,
    MatGridListModule,
    MatChipsModule,
    MatProgressBarModule,
    NgxChartsModule

  ],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})
export class EmployeeHomeComponent implements OnInit {

  view: [number, number] = [500, 300];  // Chart size

  // Graph data
  requestStats = [
    { name: 'Total Requests', value: 12 },
    { name: 'Pending Requests', value: 3 },
    { name: 'Approved Requests', value: 8 }
  ];

  colorScheme = 'cool';

  displayedColumns: string[] = ['from_location', 'to_location', 'date', 'status', 'actions'];
  dataSource: EmployeeRequestData[] = [];  // ✅ Use renamed type

  constructor(private requestService: RequestService, private router: Router) {}

  ngOnInit(): void {
    this.requestService.getRequests().subscribe(
      (data: EmployeeRequestData[]) => { // ✅ Use renamed type
        console.log('Requests:', data);
        this.dataSource = data.map(request => ({
          ...request,
          status: this.computeStatus(request) // Compute status dynamically
        }));
      },
      (error) => {
        console.error('Error fetching requests', error);
      }
    );
  }

  computeStatus(request: EmployeeRequestData): string {  // ✅ Use renamed type
    if (request.is_approved) return 'Approved ✅';
    if (request.is_pending) return 'Pending ⏳';
    if (request.is_rejected) return 'Rejected ❌';
    if (request.is_in_progress) return 'In Progress 🔄';
    if (request.is_resubmitted) return 'Resubmitted 🔁';
    return 'Unknown ❓';
  }

  viewRequest(id: number) {
    this.router.navigate(['/employee/detail', id]);
  }

  updateRequest(id: number) {
    this.router.navigate(['/employee/update', id]);
  }
}
