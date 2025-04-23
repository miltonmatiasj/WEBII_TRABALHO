import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MaintenanceRequestService {
  private storageKey = 'MaintenanceRequest';

  getRequestById(id: string): any {
    console.log('Buscando solicitação com ID:', id);
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const requests = JSON.parse(data);
      console.log('Todas as solicitações:', requests);
      const request = requests.find((request: any) => request.id === id) || null;
      console.log('Solicitação encontrada:', request);
      return request;
    }
    return null;
  }

  updateRequestStatus(id: string, newStatus: string): void {
    console.log('Atualizando status da solicitação:', { id, newStatus });
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const requests = JSON.parse(data);
      console.log('Solicitações antes da atualização:', requests);
      const requestIndex = requests.findIndex(
        (request: any) => request.id === id
      );
      if (requestIndex !== -1) {
        console.log('Solicitação encontrada no índice:', requestIndex);
        requests[requestIndex].status = newStatus;
        console.log('Solicitação após atualização:', requests[requestIndex]);
        localStorage.setItem(this.storageKey, JSON.stringify(requests));
        console.log('Status atualizado com sucesso');
        
        // Verificar se a atualização foi persistida
        const updatedData = localStorage.getItem(this.storageKey);
        console.log('Dados após persistência:', updatedData);
      } else {
        console.log('Solicitação não encontrada');
      }
    } else {
      console.log('Nenhuma solicitação encontrada no localStorage');
    }
  }

  getMockHistory(): any[] {
    return [
      {
        dateTime: '2025-04-01 09:00',
        employee: 'Carlos Mendes',
        action: 'Solicitação registrada',
      },
      {
        dateTime: '2025-04-02 11:15',
        employee: 'Ana Clara',
        action: 'Diagnóstico realizado',
      },
      {
        dateTime: '2025-04-03 16:45',
        employee: 'Fernando Lima',
        action: 'Serviço executado',
      },
    ];
  }
}
