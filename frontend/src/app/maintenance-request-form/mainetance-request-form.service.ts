import { Injectable } from '@angular/core';

export interface CustomerData {
  id: string;
  userId: string;
  equipmentDescription: string;
  requestDate: string;
  status: string;
  equipmentCategory: string;
  defectDescription: string;
}

@Injectable({
  providedIn: 'root',
})
export class maintenancerequesthistoryFormService {
  private storageKey = 'maintenancerequesthistory';

  constructor() {}

  getCustomerData(): CustomerData[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addCustomerData(newRequest: CustomerData): void {
    const data = this.getCustomerData();
    data.push(newRequest);
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}
