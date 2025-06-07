import {inject, Injectable} from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import {MaintenanceRequest} from "../../maintenance-request-form/mainetance-request-form.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CustomerHomeService {
  constructor(private authService: AuthService) {}

  http = inject(
    HttpClient);
  async getCustomerData(): Promise<MaintenanceRequest[]> {
    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      return [];
    }
    const requests = await lastValueFrom(this.http.get<MaintenanceRequest[]>(`${environment.baseUrl}/maintenance-requests`));
    return requests.filter((request: MaintenanceRequest) => request.customer.id === currentUser.id);
  }
}
