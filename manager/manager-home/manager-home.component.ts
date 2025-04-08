import { Component,OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RequestService, RequestData } from '../../services/request.service';
import { UserService } from '../../services/user.service'; // ✅ Correct Import
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { RequestListComponent } from '../request-list/request-list.component';
import { SearchComponent } from '../search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterComponent } from '../filter/filter.component';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-manager-home',
  standalone: true,
  imports: [NavbarComponent,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    RequestListComponent,
    CommonModule,
    SearchComponent,
    MatIconModule,
    FilterComponent,
    MatListModule,
    MatExpansionModule

  ],
  templateUrl: './manager-home.component.html',
  styleUrl: './manager-home.component.css'
})
export class ManagerHomeComponent implements OnInit {
  assignedRequests: RequestData[] = [];
  managerId!: string; // Store manager ID
  selectedRequest: RequestData | null = null;
  

  constructor(
    private requestService: RequestService, 
    private authService: AuthService,
    private userService: UserService
  ) {}
  

  ngOnInit(): void {
    this.getManagerId();
  }

  getManagerId() {
    this.requestService.getUserManagerDetails().subscribe(
      (data) => {
          console.log(" User Manager Data:", data);
          this.managerId = data.manager_id;
          this.fetchAssignedRequests()
      },
      (error) => {
          console.error(" Error fetching manager details:", error);
      }
  );
  
  }
  
  
  

  fetchAssignedRequests() {
    this.requestService.getManagerAssignedRequests(this.managerId).subscribe(
      (data) => {
        this.assignedRequests = data;
        console.log(' Assigned Requests:', this.assignedRequests);
      },
      (error) => {
        console.error(' Error fetching assigned requests', error);
      }
    );
  }

  getStatusText(request: any): string {
    if (request.is_approved) {
      return "Approved ✅";
    } else if (request.is_rejected) {
      return "Rejected ❌";
    } else if (request.is_in_progress) {
      return "In Progress ⏳";
    } else if (request.is_pending) {
      return "Pending ⏺";
    } else {
      return "Unknown Status ❓";
    }
  }
  
  getStatusColor(request: any): string {
    if (request.is_approved) {
      return "primary"; // Blue
    } else if (request.is_rejected) {
      return "warn"; // Red
    } else if (request.is_in_progress) {
      return "accent"; // Yellow
    } else {
      return "default"; // Grey
    }
  }
  
  loadManagerRequests() { // ✅ New function name to avoid conflicts
    const managerId = 'your-manager-id'; // Fetch from service
    this.requestService.getManagerAssignedRequests(managerId).subscribe(
      (requests) => {
        this.assignedRequests = requests;
      },
      (error) => console.error('Error fetching requests:', error)
    );
  }

  selectRequest(request: RequestData) {
    this.selectedRequest = request; // ✅ Send selected request
  }


  filteredRequests: any[] = [];
  searchPerformed = false;

  handleSearchResults(results:any){
    this.filteredRequests = results;
    this.searchPerformed=true;
  }

  filteredRequests2: any[] = [];

  updateRequestList(requests: any[]) {
    this.filteredRequests2 = requests;
  }

}