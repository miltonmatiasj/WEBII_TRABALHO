import {inject, Injectable} from '@angular/core';
import {User} from "../../users/User";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {lastValueFrom} from "rxjs";
import {MaintenanceRequest} from "../../maintenance-request-form/mainetance-request-form.service";

export type Customer = Partial<User>;

export type MaintenanceRequestBudget = {
  id: string;
  price: number;
  dateTime: Date;
  evaluation?: string;
  employee: Partial<User>;
  maintenanceRequest: Partial<MaintenanceRequest>;
}

export type MaintenanceRequestBudgetPost = Omit<MaintenanceRequestBudget, 'id' | 'dateTime' | 'evaluation'>;

@Injectable({
  providedIn: 'root'
})
export class ServiceQuoteService {

  http = inject(HttpClient);

  addQuote(quote: MaintenanceRequestBudgetPost): Promise<MaintenanceRequestBudget> {
    return lastValueFrom(this.http.post<MaintenanceRequestBudget>(`${environment.baseUrl}/maintenance-request-budget`, quote));
  }
}
