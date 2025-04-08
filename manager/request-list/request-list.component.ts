import { Component, OnInit, Input } from '@angular/core';
import { RequestService, RequestData } from '../../services/request.service';
import { AuthService } from '../../services/auth.service';
import { ManagerViewComponent } from '../manager-view/manager-view.component';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-request-list',
  standalone: true,
  imports:[ManagerViewComponent, CommonModule, MatExpansionModule],
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
})
export class RequestListComponent implements OnInit {
  travelRequests: RequestData[] = [];
  @Input() selectedRequest: RequestData | null = null; // ✅ Accept selected request
  managerId: string = '';

  constructor(private requestService: RequestService, private authService: AuthService) {}

  ngOnInit() {
    this.fetchManagerRequests();
  }

  fetchManagerRequests() {
    this.requestService.getUserManagerDetails().subscribe(
      (data) => {
        this.managerId = data.manager_id;
        if (this.managerId) {
          this.requestService.getManagerAssignedRequests(this.managerId).subscribe(
            (requests) => {
              this.travelRequests = requests;
            },
            (error) => console.error('Error fetching requests:', error)
          );
        }
      },
      (error) => console.error('Error fetching manager ID:', error)
    );
  }
}
