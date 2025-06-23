import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  http = inject(HttpClient);
  private categoryRevenueUrl = `${environment.baseUrl}/reports/category-revenue`;
  private periodRevenueUrl = `${environment.baseUrl}/reports/daily-revenue`;

  generatePdfReportByCategory(): Observable<Blob> {
    const headers = new HttpHeaders({
      Accept: 'application/pdf',
    });

    return this.http.get(this.categoryRevenueUrl, {
      headers,
      responseType: 'blob',
    });
  }

  generatePdfReportByPeriod(startDate: Date, endDate: Date): Observable<Blob> {
    const headers = new HttpHeaders({
      Accept: 'application/pdf',
    });

    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    return this.http.get(this.periodRevenueUrl, {
      headers,
      responseType: 'blob',
      params,
    });
  }
}
