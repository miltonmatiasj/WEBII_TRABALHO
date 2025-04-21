import { Injectable } from '@angular/core';

export interface CustomerData {
  description: string;
  status: string;
  data: string;
  action: string;
}

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
