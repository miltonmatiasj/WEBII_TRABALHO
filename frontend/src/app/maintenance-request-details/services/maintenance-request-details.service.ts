import { Injectable } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';

@Injectable({ providedIn: 'root' })
export class MaintenanceRequestService {

  private storageKey = 'MaintenanceRequest';
  private currentUser = this.authService.currentUser();

  constructor(
    private authService: AuthService,
  ){}

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
    console.log(JSON.stringify(localStorage));
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
        console.log(requests);
        this.addHistoryStep(id, {
          dateTime: new Date().toISOString(),
          employee: this.currentUser?.name || '', 
          action: `${newStatus}`
        });
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

  getMockHistory(id: string): any[] {
    const data = localStorage.getItem(this.storageKey);
    if (data){
      const requests = JSON.parse(data);
      console.log(data);
      const request = requests.find((r: any) => r.id === id);
      return request?.history || [];
    }else{
      return [];
    }
  }

  addHistoryStep(requestId: string, step: { dateTime: string, employee: string, action: string }): void {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return;
  
    const requests = JSON.parse(data);
    const requestIndex = requests.findIndex((r: any) => r.id === requestId);
    if (requestIndex === -1) return;

    const request = requests[requestIndex];
    request.history = request.history.slice(-5) || [];
    request.history.push(step);
  
    requests[requestIndex] = request;
    localStorage.setItem(this.storageKey, JSON.stringify(requests));
  }
}
