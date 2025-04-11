import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MaintenanceRequestService {
  getMockRequest(status: string = 'ORÇADA') {
    const requests: { [key: string]: any } = {
      ORÇADA: {
        equipmentDescription: 'Impressora HP LaserJet 1020',
        category: 'Impressora',
        defectDescription: 'Não está imprimindo',
        date: '2025-04-10',
        status: 'ORÇADA',
      },
      REJEITADA: {
        equipmentDescription: 'Notebook Dell Inspiron',
        category: 'Notebook',
        defectDescription: 'Tela não liga',
        date: '2025-04-05',
        status: 'REJEITADA',
      },
      ARRUMADA: {
        equipmentDescription: 'Ar-condicionado LG',
        category: 'Climatização',
        defectDescription: 'Não gela',
        date: '2025-04-03',
        status: 'ARRUMADA',
      },
      APROVADA: {
        equipmentDescription: 'Servidor HP ProLiant',
        category: 'Servidor',
        defectDescription: 'Travando frequentemente',
        date: '2025-03-28',
        status: 'APROVADA',
      },
      'EM ANDAMENTO': {
        equipmentDescription: 'Projetor Epson',
        category: 'Projetor',
        defectDescription: 'Imagem desfocada',
        date: '2025-04-01',
        status: 'EM ANDAMENTO',
      },
    };
    return requests[status] || requests['ORÇADA'];
  }

  getMockHistory() {
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
