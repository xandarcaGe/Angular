import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'http://127.0.0.1:8000/admin_email';  // Update with your backend URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  sendEmail(requestId: number, additionalRequest: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.put(
      `${this.baseUrl}/${requestId}/`,
      { additional_requests: additionalRequest },
      { headers }
    );
  }

  sendManagerEmail(requestId:number, additionalRequest: string):Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);

    return this.http.put(
      `http://127.0.0.1:8000/manager_email/${requestId}/`,
      {additional_requests:additionalRequest},
      {headers}
    );
  }
}
