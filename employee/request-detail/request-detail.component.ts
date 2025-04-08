import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';  // ✅ Add MatIconModule
import { MatChipsModule } from '@angular/material/chips'; // ✅ Ensure MatChipsModule is imported
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-request-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule, // ✅ Ensure MatIconModule is imported
    MatChipsModule, // ✅ Ensure MatChipsModule is imported
    MatDividerModule,
    RouterModule,
    NavbarComponent
  ],
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.css'
})
export class RequestDetailComponent implements OnInit {
  request: any;

  constructor(private route: ActivatedRoute, private requestService: RequestService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requestService.getRequestById(id).subscribe(
        (data) => {
          console.log('Request Details:', data);
          this.request = data;
        },
        (error) => {
          console.error('Error fetching request details', error);
        }
      );
    }
  }

  getStatusClass(request: any): string {
    if (request.is_approved) return 'approved-chip';
    if (request.is_pending) return 'pending-chip';
    if (request.is_rejected) return 'rejected-chip';
    if (request.is_in_progress) return 'in-progress-chip';
    if (request.is_resubmitted) return 'resubmitted-chip';
    return 'default-chip';
  }

  getStatusText(request: any): string {
    if (request.is_approved) return 'Approved';
    if (request.is_pending) return 'Pending';
    if (request.is_rejected) return 'Rejected';
    if (request.is_in_progress) return 'In Progress';
    if (request.is_resubmitted) return 'Resubmitted';
    return 'Unknown';
  }
}