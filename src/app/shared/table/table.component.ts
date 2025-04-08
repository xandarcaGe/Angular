import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

export interface RequestData {
  name: string;
  requestId: string;
  status: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule,RouterModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() requestData: any[] = []; // Data passed from parent
  @Input() displayedColumns: string[] = []; // Columns to display
  @Input() role: string = ''; // Role (admin, manager, etc.)

  approveRequest(requestId: string) {
    console.log(`Approved request: ${requestId}`);
  }

  rejectRequest(requestId: string) {
    console.log(`Rejected request: ${requestId}`);
  }

  viewDetails(request: any) {
    console.log('View Request:', request);
  }

  ngOnChanges() {
    console.log('Table Received Data:', this.requestData); // ✅ Debug received data
  }
  constructor(private router: Router) {}
  viewRequest(request: any) {
    if (request?.id) {
      console.log('Navigating to:', `/admin/request-detail/${request.id}`); // Debugging
      this.router.navigate([`/admin/request-detail/${request.id}`, request.id]);
    } else {
      console.error('Invalid request ID');
    }
  }


}
