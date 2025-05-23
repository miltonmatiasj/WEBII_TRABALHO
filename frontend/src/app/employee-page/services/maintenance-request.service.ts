import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ServiceRequest } from './request.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestService {
  private readonly STORAGE_KEY = 'MaintenanceRequest';
  private readonly apiUrl = '/api/maintenance-requests';

  constructor(private http: HttpClient, private userService: UserService) {}

  // GET all
  getRequests(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(this.apiUrl).pipe(
      map((requests) =>
        requests.map((r) => ({
          ...r,
          userName: this.userService.getUserNameById(r.userId),
        }))
      )
    );
  }

  // GET by ID
  getRequestById(id: string): Observable<ServiceRequest> {
    return this.http.get<ServiceRequest>(`${this.apiUrl}/${id}`).pipe(
      map((r) => ({
        ...r,
        userName: this.userService.getUserNameById(r.userId),
      }))
    );
  }

  // CREATE
  createRequest(request: ServiceRequest): Observable<ServiceRequest> {
    return this.http.post<ServiceRequest>(this.apiUrl, request);
  }

  // UPDATE STATUS
  updateRequest(request: ServiceRequest): Observable<ServiceRequest> {
    const params = new HttpParams().set('newStatus', request.status);
    return this.http.patch<ServiceRequest>(
      `${this.apiUrl}/${request.id}/status`,
      null,
      { params }
    );
  }

  // DELETE
  deleteRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
