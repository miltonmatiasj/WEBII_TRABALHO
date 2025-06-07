package com.web2.projeto_web2.maintenante_request_budget;

import com.web2.projeto_web2.maintenance_request.MaintenanceRequest;
import com.web2.projeto_web2.maintenance_request.MaintenanceRequestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/maintenance-request-budget")
public class MaintenanceRequestBudgetController {

    private final MaintenanceRequestBudgetService service;
    private final MaintenanceRequestService maintenanceRequestService;

    public MaintenanceRequestBudgetController(
            MaintenanceRequestBudgetService service,
            MaintenanceRequestService maintenanceRequestService
    ) {
        this.service = service;
        this.maintenanceRequestService = maintenanceRequestService;
    }

    @PostMapping
    public ResponseEntity<MaintenanceRequestBudget> createMaintenanceRequestBudget(
            @Valid @RequestBody MaintenanceRequestBudget request) {
        MaintenanceRequestBudget saved = service.createMaintenanceRequestBudget(request);
        maintenanceRequestService.updateMaintenanceRequestStatusById(saved.getMaintenanceRequest().getId(), MaintenanceRequest.Status.ORCADA);
        return ResponseEntity
                .created(URI.create("/api/maintenance-request-budget/" + saved.getId()))
                .body(saved);
    }
}
