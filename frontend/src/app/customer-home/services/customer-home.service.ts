import { Injectable } from '@angular/core';
import { CustomerData } from '../../maintenance-request-form/mainetance-request-form.service';
import { AuthService } from '../../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerHomeService {
  private storageKey = 'maintenancerequesthistory';

  constructor(private authService: AuthService) {}

  getCustomerData(): CustomerData[] {
    const data = localStorage.getItem(this.storageKey);
    const allRequests = data ? JSON.parse(data) : [];
    const currentUser = this.authService.currentUser();
    
    if (!currentUser) {
      return [];
    }
    
    return allRequests.filter((request: CustomerData) => request.userId === currentUser.id);
  }
}
export { CustomerData };
