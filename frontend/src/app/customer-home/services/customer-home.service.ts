import { Injectable } from '@angular/core';
import { CustomerData } from '../../maintenance-request-form/mainetance-request-form.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerHomeService {
  private storageKey = 'MaintenanceRequest';

  constructor() {}

  getCustomerData(): CustomerData[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
}
export { CustomerData };
