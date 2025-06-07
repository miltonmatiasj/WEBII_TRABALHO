import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {lastValueFrom} from "rxjs";

export type MaintenanceRequest = {
  id: string;
  equipmentDescription: string;
  requestDate: string;
  status: string;
  defectDescription: string;
  category: {
    id: string
  },
  customer: {
    id: string
  },
  createdAt?: string;
};

export type MaintenanceRequestPOST = Omit<MaintenanceRequest, 'id' | 'requestDate' | 'status'>;

@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestFormService {

  http = inject(HttpClient);

  async addCustomerData(newRequest: MaintenanceRequestPOST) {
    await lastValueFrom(this.http.post(environment.baseUrl + '/maintenance-requests', newRequest));
  }
}
