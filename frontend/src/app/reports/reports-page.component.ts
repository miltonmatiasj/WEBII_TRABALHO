import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReportService } from './report.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class ReportsPageComponent {
  startDate = new FormControl<Date | null>(null);
  endDate = new FormControl<Date | null>(null);

  constructor(private reportService: ReportService) {}

  downloadRevenueByCategory(): void {
    this.reportService
      .generatePdfReportByCategory()
      .subscribe((blob) => this.saveFile(blob, 'relatorio-completo.pdf'));
  }

  downloadByPeriod(): void {
    const sd = this.startDate.value;
    const ed = this.endDate.value;

    if (sd && ed) {
      this.reportService
        .generatePdfReportByPeriod(sd, ed)
        .subscribe((blob) =>
          this.saveFile(
            blob,
            `relatorio_${sd.toISOString().slice(0, 10)}_${ed
              .toISOString()
              .slice(0, 10)}.pdf`
          )
        );
    }
  }

  private saveFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
