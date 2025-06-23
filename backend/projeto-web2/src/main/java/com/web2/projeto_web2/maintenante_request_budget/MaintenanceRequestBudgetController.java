package com.web2.projeto_web2.maintenante_request_budget;

import com.web2.projeto_web2.maintenance_request.MaintenanceRequest;
import com.web2.projeto_web2.maintenance_request.MaintenanceRequestService;
import com.web2.projeto_web2.maintenance_request_history.MaintenanceRequestHistoryService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/maintenance-request-budget")
public class MaintenanceRequestBudgetController {

    private final MaintenanceRequestBudgetService service;
    private final MaintenanceRequestService maintenanceRequestService;
    private final MaintenanceRequestHistoryService maintenanceRequestHistoryService;

    public MaintenanceRequestBudgetController(
            MaintenanceRequestBudgetService service,
            MaintenanceRequestService maintenanceRequestService,
            MaintenanceRequestHistoryService maintenanceRequestHistoryService
    ) {
        this.service = service;
        this.maintenanceRequestService = maintenanceRequestService;
        this.maintenanceRequestHistoryService = maintenanceRequestHistoryService;
    }

    @PostMapping
    public ResponseEntity<MaintenanceRequestBudget> createMaintenanceRequestBudget(
            @Valid @RequestBody MaintenanceRequestBudget request) {
        MaintenanceRequestBudget saved = service.createMaintenanceRequestBudget(request);
        maintenanceRequestService.updateMaintenanceRequestStatusById(saved.getMaintenanceRequest().getId(), MaintenanceRequest.Status.ORCADA);
        maintenanceRequestHistoryService.registrarHistorico("ENVIAR ORÇAMENTO", saved.getMaintenanceRequest(), request.getEmployee());
        return ResponseEntity
                .created(URI.create("/api/maintenance-request-budget/" + saved.getId()))
                .body(saved);
    }
}
