import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface RequestData {
  id: number;
  name: string;
  requestId: string;
  status: string;
  is_approved: boolean;
  is_pending: boolean;
  is_rejected: boolean;
  is_in_progress: boolean;
  is_resubmitted: boolean;
  is_lodging_required: boolean;

  from_location: string;
  to_location: string;
  travel_mode: string;
  starting_date: string;
  ending_date: string;
  lodging_location?: string;
  travel_purpose: string;
  additional_requests:string;
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = 'http://127.0.0.1:8000/requestslist/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getRequests(): Observable<RequestData[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<RequestData[]>(this.apiUrl, { headers });
  }
  
  getRequestById(id: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    const url = `http://127.0.0.1:8000/request_by_id/${id}/`;
  
    console.log('📡 Making API Call to:', url); // ✅ Log URL before calling API
    return this.http.get<any>(url, { headers });
  }
  
  createRequest(requestData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.post('http://127.0.0.1:8000/new/', requestData,{headers});
  }

  getAssignedManager(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get(`http://127.0.0.1:8000/get_assigned_manager/`,{headers});  // Replace with your actual API URL
  }
  
  updateRequest(id: string, requestData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.put(`http://127.0.0.1:8000/update_request/${id}/`, requestData, { headers });
  }

  getManagerAssignedRequests(managerId: string): Observable<RequestData[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    const url = `http://127.0.0.1:8000/manager_requests/${managerId}/`;  // Update with actual API endpoint
    
    return this.http.get<RequestData[]>(url, { headers });
  }
  
  getUserManagerDetails(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get(`http://127.0.0.1:8000/get_managerid/`, { headers });
}
  
  updateRequeststatus(requestId:number, status: string): Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    });
    const body = { status: status };
    return this.http.put(`http://127.0.0.1:8000/update_travel_status/${requestId}/`,body, { headers });
  }

  searchRequestById(requestId:number):Observable<any>{
    const token= this.authService.getToken();
    const headers= new HttpHeaders().set('Authorization',`Token ${token}`);

    return this.http.get(`http://127.0.0.1:8000/search/${requestId}/`,{headers})
  }

  filterRequests(startDate?: string, endDate?: string, name?: string, sort?: string): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    let params: any = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    if (name) params.name = name;
    if (sort) params.sort = sort === 'asc' ? 'employee__first_name' : '-employee__first_name';

    return this.http.get<any[]>(`http://127.0.0.1:8000/filter/`, { headers, params });
  }

  approveRequestWithNote(requestId: number, note: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    });
  
    const body = { status: 'approved', note: note };
    return this.http.put(`http://127.0.0.1:8000/approve_request_with_note/${requestId}/`, body, { headers });
  }

  resubmitRequest(id: string, requestData: any):Observable<any>{
    const token=this.authService.getToken();
    const headers= new HttpHeaders().set('Authorization', `Token ${token}`);
    
    return this.http.post(`http://127.0.0.1:8000/resubmit/${id}/`, requestData,{headers})
  }
  
  
}
