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
  private readonly STORAGE_KEY = 'maintenancerequesthistory';

  constructor() {
    console.log('RequestService inicializado');
  }

  private get requests(): ServiceRequest[] {
    const storedRequests = localStorage.getItem(this.STORAGE_KEY);
    console.log('Dados armazenados no localStorage:', storedRequests);
    try {
      const parsedRequests = storedRequests ? JSON.parse(storedRequests) : [];
      console.log('Requisições parseadas:', parsedRequests);
      if (parsedRequests.length === 0) {
        return this.loadMockServices();
      }
      return parsedRequests;
    } catch (error) {
      console.error('Erro ao fazer parse das requisições:', error);
      return [];
    }
  }

  loadMockServices(): ServiceRequest[] {
    return [
      {
        id: '1',
        userId: '123',
        userName: 'João Silva',
        customerName: 'Maria Oliveira',
        equipmentDescription: 'Computador Dell',
        categoryName: 'Hardware',
        defectDescription: 'Não liga',
        status: 'PAGA',
        requestDate: new Date().toISOString(),
        customerCPF: '12345678901'
      },
      {
        id: '2',
        userId: '124',
        userName: 'Ana Costa',
        customerName: 'Pedro Santos',
        equipmentDescription: 'Impressora HP',
        categoryName: 'Impressão',
        defectDescription: 'Sem tinta',
        status: 'APROVADA',
        requestDate: new Date('2024-06-01').toISOString(),
        customerCPF: '98765432100'
      },
      {
        id: '3',
        userId: '125',
        userName: 'Dudu Silva',
        customerName: 'Pedro Santos',
        equipmentDescription: 'Impressora HP',
        categoryName: 'Impressão',
        defectDescription: 'Sem tinta',
        status: 'ABERTA',
        requestDate: new Date().toISOString(),
        customerCPF: '98765432100',
      },
    ]
  }

  getRequests(): ServiceRequest[] {
    const requests = this.requests;
    console.log('Lista completa de requisições:', requests);
    const sortedRequests = [...requests];
    sortedRequests.sort((a, b) => new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime());
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
