import { Injectable } from '@angular/core';

export interface ServiceRequest {
  id: string;
  userId: string;
  userName?: string;
  customerName?: string;
  equipmentDescription: string;
  categoryName: string;
  defectDescription: string;
  status: string;
  requestDate: string;
  customerCPF: string;
  quoteValue?: number;
  serviceDescription?: string;
  maintenanceDescription?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly STORAGE_KEY = 'MaintenanceRequest';

  constructor() {
    console.log('RequestService inicializado');
  }

  private get requests(): ServiceRequest[] {
    const storedRequests = localStorage.getItem(this.STORAGE_KEY);
    console.log('Dados armazenados no localStorage:', storedRequests);
    try {
      const parsedRequests = storedRequests ? JSON.parse(storedRequests) : [];
      console.log('Requisições parseadas:', parsedRequests);
      return parsedRequests;
    } catch (error) {
      console.error('Erro ao fazer parse das requisições:', error);
      return [];
    }
  }

  getRequests(): ServiceRequest[] {
    const requests = this.requests;
    console.log('Lista completa de requisições:', requests);
    return requests;
  }

  getRequestById(id: string): ServiceRequest | undefined {
    console.log('Tentando buscar requisição com ID:', id);
    console.log('Tipo do ID:', typeof id);
    
    const requests = this.requests;
    console.log('Lista de requisições disponíveis:', requests);
    
    const foundRequest = requests.find((request: ServiceRequest) => {
      console.log('Comparando com requisição:', request);
      return request.id === id;
    });
    
    console.log('Requisição encontrada:', foundRequest);
    return foundRequest;
  }

  updateRequest(updatedRequest: ServiceRequest): void {
    const requests = this.requests;
    const index = requests.findIndex(request => request.id === updatedRequest.id);
    
    if (index !== -1) {
      requests[index] = updatedRequest;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));
    }
  }
}
