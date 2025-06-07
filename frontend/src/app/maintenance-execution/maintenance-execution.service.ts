import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../users/User";
import {MaintenanceRequest} from "../maintenance-request-form/mainetance-request-form.service";

export type MaintenanceExecution = {
  id: string;
  description: string;
  orientations: string;
  employee: Partial<User>;
  maintenanceRequest: Partial<MaintenanceRequest>;
  createdAt: Date;
}

export type MaintenanceExecutionPost = Omit<MaintenanceExecution, 'id' | 'createdAt'>;

@Injectable({
  providedIn: 'root'
})
export class MaintenanceExecutionService {

  http = inject(HttpClient);

  execute(quote: MaintenanceExecutionPost): Promise<MaintenanceExecution> {
    return lastValueFrom(this.http.post<MaintenanceExecution>(`${environment.baseUrl}/maintenance-executions`, quote));
  }
}
