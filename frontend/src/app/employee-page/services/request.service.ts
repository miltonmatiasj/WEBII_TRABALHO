import { inject, Injectable } from '@angular/core';
import { MaintenanceRequest } from '../../maintenance-request-form/mainetance-request-form.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  http = inject(HttpClient);

  async getRequests(): Promise<MaintenanceRequest[]> {
    const requests = await lastValueFrom(
      this.http.get<MaintenanceRequest[]>(
        `${environment.baseUrl}/maintenance-requests`
      )
    );
    const sortedRequests = [...requests];
    sortedRequests.sort(
      (a, b) =>
        new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
    );
    return requests;
  }

  async getRequestsByStatus(status: string): Promise<MaintenanceRequest[]> {
    const requests = await lastValueFrom(
      this.http.get<MaintenanceRequest[]>(
        `${environment.baseUrl}/maintenance-requests?status=${status}`
      )
    );
    const sortedRequests = [...requests];
    sortedRequests.sort(
      (a, b) =>
        new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
    );
    return requests;
  }

  async getRequestById(id: string): Promise<MaintenanceRequest | undefined> {
    return await lastValueFrom(
      this.http.get<MaintenanceRequest>(
        `${environment.baseUrl}/maintenance-requests/${id}`
      )
    );
  }

  async getRequestHistoryById(id: string): Promise<any[]> {
    return await lastValueFrom(
      this.http.get<any[]>(
        `${environment.baseUrl}/maintenance-requests-history/${id}`
      )
    );
  }

  async changeStatus(
    id: string,
    status: string,
    paymentMethod?: string,
    redirectTo?: string
  ): Promise<MaintenanceRequest> {
    return await lastValueFrom(
      this.http.put<MaintenanceRequest>(
        `${environment.baseUrl}/maintenance-requests/${id}/status`,
        { status, paymentMethod, employee: redirectTo ? redirectTo : undefined }
      )
    );
  }
}
