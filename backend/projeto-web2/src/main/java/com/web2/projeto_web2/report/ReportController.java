package com.web2.projeto_web2.report;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.web2.projeto_web2.maintenance_request.MaintenanceRequest;
import com.web2.projeto_web2.maintenance_request.MaintenanceRequestService;
import com.web2.projeto_web2.maintenante_request_budget.MaintenanceRequestBudgetService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final MaintenanceRequestService maintenanceRequestService;
    private final MaintenanceRequestBudgetService budgetService;

    public ReportController(MaintenanceRequestService maintenanceRequestService, MaintenanceRequestBudgetService budgetService) {
        this.maintenanceRequestService = maintenanceRequestService;
        this.budgetService = budgetService;
    }

    @GetMapping("/maintenance-requests")
    public ResponseEntity<byte[]> generateMaintenanceRequestReport() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            document.add(new Paragraph("Relatório de Chamados de Manutenção"));

            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);

            String[] headers = {"ID", "Status", "Descrição"};
            for (String header : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(header));
                cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
                table.addCell(cell);
            }

            List<MaintenanceRequest> requests = maintenanceRequestService.getAllMaintenanceRequests();
            for (MaintenanceRequest req : requests) {
                table.addCell(req.getId().toString());
                table.addCell(req.getStatus().toString());
                table.addCell(req.getDefectDescription());
            }

            document.add(table);
            document.close();

            HttpHeaders headersHttp = new HttpHeaders();
            headersHttp.setContentType(MediaType.APPLICATION_PDF);
            headersHttp.setContentDispositionFormData("attachment", "relatorio_chamados.pdf");

            return ResponseEntity.ok().headers(headersHttp).body(out.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/daily-revenue")
    public ResponseEntity<byte[]> generateDailyRevenueReport(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
    ) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            document.add(new Paragraph("Relatório de Receita Diária"));

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);

            String[] headers = {"Data", "Receita Total"};
            for (String header : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(header));
                cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
                table.addCell(cell);
            }

            List<DailyRevenueReport> revenues = budgetService.getDailyRevenue(startDate, endDate);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            for (DailyRevenueReport revenue : revenues) {
                table.addCell(sdf.format(revenue.getDate()));
                table.addCell(String.format("R$ %.2f", revenue.getTotalRevenue()));
            }

            document.add(table);
            document.close();

            HttpHeaders headersHttp = new HttpHeaders();
            headersHttp.setContentType(MediaType.APPLICATION_PDF);
            headersHttp.setContentDispositionFormData("attachment", "relatorio_receita_diaria.pdf");

            return ResponseEntity.ok().headers(headersHttp).body(out.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/category-revenue")
    public ResponseEntity<byte[]> generateRevenueByCategoryReport() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            document.add(new Paragraph("Relatório de Receita por Categoria"));

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);

            String[] headers = {"Categoria", "Receita Total"};
            for (String header : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(header));
                cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
                table.addCell(cell);
            }

            List<CategoryRevenueReport> revenues = budgetService.getRevenueByCategory();

            for (CategoryRevenueReport revenue : revenues) {
                table.addCell(revenue.getCategoryName());
                table.addCell(String.format("R$ %.2f", revenue.getTotalRevenue()));
            }

            document.add(table);
            document.close();

            HttpHeaders headersHttp = new HttpHeaders();
            headersHttp.setContentType(MediaType.APPLICATION_PDF);
            headersHttp.setContentDispositionFormData("attachment", "relatorio_receita_categoria.pdf");

            return ResponseEntity.ok().headers(headersHttp).body(out.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
