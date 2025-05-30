import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerData {
  userId?: string;
  equipmentDescription: string;
  status: string;
  equipmentCategory: string;
  defectDescription: string;
}

export interface CreateCustomerData {
  equipmentDescription: string;
  category: string;
  defectDescription: string;
  status: string;
  customer: string;
}

@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestFormService {
  private readonly createMaintenanceRequestUrl =
    'http://localhost:8080/api/maintenance-requests';

  private readonly categoriesUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}
  createMaintenanceRequest(
    newRequest: CreateCustomerData
  ): Observable<CreateCustomerData> {
    return this.http.post<CreateCustomerData>(
      this.createMaintenanceRequestUrl,
      newRequest
    );
  }

  getCategories(): Observable<
    { id: string; categoryName: string; isActivated: boolean }[]
  > {
    return this.http.get<
      { id: string; categoryName: string; isActivated: boolean }[]
    >(this.categoriesUrl);
  }
}
