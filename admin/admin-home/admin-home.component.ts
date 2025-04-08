import { Component,OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../shared/table/table.component';
import { RequestService } from '../../services/request.service';
import { RequestData } from '../../services/request.service';


@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, TableComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  requestData: RequestData[] = [];
  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.fetchRequests();
  }

  fetchRequests() {
    this.requestService.getRequests().subscribe(
      (data: RequestData[]) => {
        this.requestData = data; // ✅ Update the table with API data
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }
}
