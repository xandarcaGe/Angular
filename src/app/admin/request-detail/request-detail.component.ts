import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-request-detail',
  standalone: true, // ✅ Marking it as a standalone component
  imports: [CommonModule,NavbarComponent,BackButtonComponent], // ✅ Importing CommonModule for *ngIf and other directives
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  requestId: string | null = null;
  requestDetail: any;

  constructor(private route: ActivatedRoute, private requestService: RequestService) {}

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id');
    if (this.requestId) {
      this.fetchRequestDetail(this.requestId);
      this.loadRequestDetail(this.requestId); 
    }
  }

 

  fetchRequestDetail(id: string) {
    this.requestService.getRequests().subscribe(
      (response) => {
        this.requestDetail = response;
      },
      (error) => {
        console.error('Error fetching request details:', error);
      }
    );
  }

  loadRequestDetail(id: string) {
    const apiUrl = `http://127.0.0.1:8000/request_by_id/${id}/`; // ✅ Construct URL
    console.log('📡 Fetching Request Detail from:', apiUrl); // ✅ Log the full API URL
  
    this.requestService.getRequestById(id).subscribe(
      (response) => {
        console.log('✅ Fetched Request Detail:', response); // ✅ Log response
        this.requestDetail = response;
      },
      (error) => {
        console.error('❌ Error fetching request details:', error);
      }
    );
  }
  
  
  
}
