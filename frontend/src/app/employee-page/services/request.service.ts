import { Injectable } from '@angular/core';

export interface ServiceRequest {
  id: number;
  dateTime: string;
  equipmentDescription: string;
  categoryName: string;
  defectDescription: string;
  status: string;
  customerCPF: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private requests: ServiceRequest[] = [
    {
      id: 1,
      dateTime: '2025-04-01T08:00:00',
      equipmentDescription: 'Notebook Dell Inspiron',
      categoryName: 'Notebook',
      defectDescription: 'Não liga',
      status: 'ORÇADA',
      customerCPF: '11111111111'
    },
    {
      id: 2,
      dateTime: '2025-04-02T09:30:00',
      equipmentDescription: 'Desktop Lenovo ThinkCentre',
      categoryName: 'Desktop',
      defectDescription: 'Tela azul frequente',
      status: 'ABERTA',
      customerCPF: '22222222222'
    },
    {
      id: 3,
      dateTime: '2025-04-03T11:15:00',
      equipmentDescription: 'Impressora HP LaserJet',
      categoryName: 'Impressora',
      defectDescription: 'Erro de papel',
      status: 'ORÇADA',
      customerCPF: '33333333333'
    },
    {
      id: 4,
      dateTime: '2025-04-04T14:50:00',
      equipmentDescription: 'Teclado sem fio Logitech',
      categoryName: 'Teclado',
      defectDescription: 'Teclas não respondem',
      status: 'REJEITADA',
      customerCPF: '44444444444'
    },
    {
      id: 5,
      dateTime: '2025-04-05T10:25:00',
      equipmentDescription: 'Mouse óptico Microsoft',
      categoryName: 'Mouse',
      defectDescription: 'Movimentos falhando',
      status: 'APROVADA',
      customerCPF: '11111111111'
    },
    {
      id: 6,
      dateTime: '2025-04-06T09:00:00',
      equipmentDescription: 'Notebook Acer Aspire',
      categoryName: 'Notebook',
      defectDescription: 'Superaquecimento',
      status: 'ABERTA',
      customerCPF: '22222222222'
    },
    {
      id: 7,
      dateTime: '2025-04-06T13:00:00',
      equipmentDescription: 'Desktop Positivo',
      categoryName: 'Desktop',
      defectDescription: 'Não inicia sistema',
      status: 'REDIRECIONADA',
      customerCPF: '33333333333'
    },
    {
      id: 8,
      dateTime: '2025-04-07T08:45:00',
      equipmentDescription: 'Mouse gamer Redragon',
      categoryName: 'Mouse',
      defectDescription: 'Botão duplo com falha',
      status: 'ABERTA',
      customerCPF: '44444444444'
    },
    {
      id: 9,
      dateTime: '2025-04-07T10:20:00',
      equipmentDescription: 'Teclado mecânico Corsair',
      categoryName: 'Teclado',
      defectDescription: 'Retroiluminação falhando',
      status: 'ARRUMADA',
      customerCPF: '11111111111'
    },
    {
      id: 10,
      dateTime: '2025-04-08T09:00:00',
      equipmentDescription: 'Impressora Epson Ecotank',
      categoryName: 'Impressora',
      defectDescription: 'Falha no scanner',
      status: 'PAGA',
      customerCPF: '22222222222'
    },
    {
      id: 11,
      dateTime: '2025-04-09T10:00:00',
      equipmentDescription: 'Notebook Samsung Book',
      categoryName: 'Notebook',
      defectDescription: 'Wi-Fi desconecta sozinho',
      status: 'FINALIZADA',
      customerCPF: '33333333333'
    },
    {
      id: 12,
      dateTime: '2025-04-09T11:30:00',
      equipmentDescription: 'Teclado HP básico',
      categoryName: 'Teclado',
      defectDescription: 'Teclas soltas',
      status: 'ABERTA',
      customerCPF: '44444444444'
    },
    {
      id: 13,
      dateTime: '2025-04-10T08:00:00',
      equipmentDescription: 'Mouse Logitech MX',
      categoryName: 'Mouse',
      defectDescription: 'Desconecta do Bluetooth',
      status: 'ARPVADA',
      customerCPF: '11111111111'
    },
    {
      id: 14,
      dateTime: '2025-04-10T10:10:00',
      equipmentDescription: 'Notebook Lenovo ThinkPad',
      categoryName: 'Notebook',
      defectDescription: 'Som não funciona',
      status: 'ABERTA',
      customerCPF: '22222222222'
    },
    {
      id: 15,
      dateTime: '2025-04-11T12:00:00',
      equipmentDescription: 'Impressora Brother',
      categoryName: 'Impressora',
      defectDescription: 'Impressão desalinhada',
      status: 'REJEITADA',
      customerCPF: '33333333333'
    },
    {
      id: 16,
      dateTime: '2025-04-12T14:30:00',
      equipmentDescription: 'Desktop customizado',
      categoryName: 'Desktop',
      defectDescription: 'Problema na placa-mãe',
      status: 'ABERTA',
      customerCPF: '44444444444'
    },
    {
      id: 17,
      dateTime: '2025-04-13T08:30:00',
      equipmentDescription: 'Notebook HP ProBook',
      categoryName: 'Notebook',
      defectDescription: 'Problema de bateria',
      status: 'ARRUMADA',
      customerCPF: '11111111111'
    },
    {
      id: 18,
      dateTime: '2025-04-14T09:00:00',
      equipmentDescription: 'Impressora Canon',
      categoryName: 'Impressora',
      defectDescription: 'Sem tinta',
      status: 'REDIRECIONADA',
      customerCPF: '22222222222'
    },
    {
      id: 19,
      dateTime: '2025-04-15T10:45:00',
      equipmentDescription: 'Teclado gamer Redragon',
      categoryName: 'Teclado',
      defectDescription: 'Problemas de delay',
      status: 'PAGA',
      customerCPF: '33333333333'
    },
    {
      id: 20,
      dateTime: '2025-04-16T11:00:00',
      equipmentDescription: 'Impressora Canon',
      categoryName: 'Impressora',
      defectDescription: 'Papel enroscando',
      status: 'FINALIZADA',
      customerCPF: '44444444444'
    }
  ];

  constructor() {}

  getRequests(): ServiceRequest[] {
    return this.requests;
  }

  getRequestById(id: number): ServiceRequest | undefined {
    return this.requests.find(request => request.id === id);
  }

}
