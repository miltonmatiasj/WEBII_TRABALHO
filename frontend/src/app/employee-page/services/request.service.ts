import {inject, Injectable} from '@angular/core';
import {MaintenanceRequest} from "../../maintenance-request-form/mainetance-request-form.service";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  http = inject(HttpClient);

  async getRequests(): Promise<MaintenanceRequest[]> {
    const requests = await lastValueFrom(this.http.get<MaintenanceRequest[]>(`${environment.baseUrl}/maintenance-requests`));
    const sortedRequests = [...requests];
    sortedRequests.sort((a, b) => new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime());
    return requests;
  }

  getRequestById(id: string): MaintenanceRequest | undefined {
    return
    // console.log('Tentando buscar requisição com ID:', id);
    // console.log('Tipo do ID:', typeof id);
    //
    // const requests = this.requests;
    // console.log('Lista de requisições disponíveis:', requests);
    //
    // const foundRequest = requests.find((request: MaintenanceRequest) => {
    //   console.log('Comparando com requisição:', request);
    //   return request.id === id;
    // });
    //
    // console.log('Requisição encontrada:', foundRequest);
    // return foundRequest;
  }

  updateRequest(updatedRequest: MaintenanceRequest): void {
    // const requests = this.requests;
    // const index = requests.findIndex(request => request.id === updatedRequest.id);
    //
    // if (index !== -1) {
    //   requests[index] = updatedRequest;
    //   localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));
    // }
  }
}
