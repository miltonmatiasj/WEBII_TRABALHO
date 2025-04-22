import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MaintenanceRequestService {
  private storageKey = 'MaintenanceRequest';

  getRequestById(id: string): any {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const requests = JSON.parse(data);
      return requests.find((request: any) => request.id === id) || null;
    }
    return null;
  }

  updateRequestStatus(id: string, newStatus: string): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const requests = JSON.parse(data);
      const requestIndex = requests.findIndex(
        (request: any) => request.id === id
      );
      if (requestIndex !== -1) {
        requests[requestIndex].status = newStatus;
        localStorage.setItem(this.storageKey, JSON.stringify(requests));
      }
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
