import { Injectable } from '@angular/core';
import { ServiceRequest } from './request.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService {
  private readonly STORAGE_KEY = 'MaintenanceRequest';

  constructor(private userService: UserService) {}

  getRequests(): ServiceRequest[] {
    const storedRequests = localStorage.getItem(this.STORAGE_KEY);
    const requests: ServiceRequest[] = storedRequests ? JSON.parse(storedRequests) : [];
    return requests.map(request => ({
      ...request,
      userName: this.userService.getUserNameById(request.userId)
    }));
  }

  saveRequests(requests: ServiceRequest[]): void {
    const requestsToSave = requests.map(({ userName, ...request }) => request);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requestsToSave));
  }

  getRequestById(id: string): ServiceRequest | undefined {
    console.log('Buscando requisição com ID:', id);
    const requests = this.getRequests();
    console.log('Lista de requisições disponíveis:', requests);
    const foundRequest = requests.find(request => {
      console.log('Comparando com requisição:', request);
      return request.id === id;
    });
    console.log('Requisição encontrada:', foundRequest);
    return foundRequest;
  }

  updateRequest(updatedRequest: ServiceRequest): void {
    const requests = this.getRequests();
    const index = requests.findIndex(request => request.id === updatedRequest.id);
    
    if (index !== -1) {
      requests[index] = updatedRequest;
      this.saveRequests(requests);
    }
  }
} 