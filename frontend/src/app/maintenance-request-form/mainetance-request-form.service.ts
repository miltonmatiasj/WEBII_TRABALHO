import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { User } from '../users/User';
import { Category } from '../category/category.service';

export type MaintenanceRequest = {
  id: string;
  equipmentDescription: string;
  requestDate: string;
  status: string;
  defectDescription: string;
  category: Partial<Category>;
  customer: Partial<User>;
  createdAt?: string;
};

export type MaintenanceRequestPOST = Omit<
  MaintenanceRequest,
  'id' | 'requestDate' | 'status'
>;

@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestFormService {
  http = inject(HttpClient);

  async addCustomerData(newRequest: MaintenanceRequestPOST) {
    await lastValueFrom(
      this.http.post(environment.baseUrl + '/maintenance-requests', newRequest)
    );
  }
}
