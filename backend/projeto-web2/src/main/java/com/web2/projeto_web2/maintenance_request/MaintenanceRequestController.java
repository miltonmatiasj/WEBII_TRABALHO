package com.web2.projeto_web2.maintenance_request;

import com.web2.projeto_web2.maintenante_request_budget.MaintenanceRequestBudget;
import com.web2.projeto_web2.maintenante_request_budget.MaintenanceRequestBudgetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/api/maintenance-requests")
public class MaintenanceRequestController {

    private final MaintenanceRequestService service;
    private final MaintenanceRequestBudgetService maintenanceRequestBudgetService;

    public MaintenanceRequestController(
            MaintenanceRequestService service,
            MaintenanceRequestBudgetService maintenanceRequestBudgetService
    ) {
        this.service = service;
        this.maintenanceRequestBudgetService = maintenanceRequestBudgetService;
    }

    @PostMapping
    public ResponseEntity<MaintenanceRequest> createMaintenanceRequest(
            @Valid @RequestBody MaintenanceRequest request) {
        MaintenanceRequest saved = service.createMaintenanceRequest(request);
        return ResponseEntity
                .created(URI.create("/api/maintenance-requests/" + saved.getId()))
                .body(saved);
    }

    @GetMapping()
    public ResponseEntity<Iterable<MaintenanceRequest>> getAllMaintenanceRequests() {
        Iterable<MaintenanceRequest> requests = service.getAllMaintenanceRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRequest> getMaintenanceRequestById(@PathVariable("id") UUID id) {
        MaintenanceRequest request = service.getMaintenanceRequestById(id);
        return ResponseEntity.ok(request);
    }

    @GetMapping("/{id}/budget")
    public ResponseEntity<MaintenanceRequestBudget> getMaintenanceRequestBudgetByRequestId(@PathVariable("id") UUID id) {
        MaintenanceRequestBudget request = maintenanceRequestBudgetService.getMaintenanceRequestBudgetByRequestId(id);
        return ResponseEntity.ok(request);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<MaintenanceRequest> updateMaintenanceRequestStatus(
            @PathVariable("id") UUID id,
            @RequestBody MaintenanceRequest request) {
        MaintenanceRequest updated = service.updateMaintenanceRequestStatusById(id, request.getStatus());
        if (request.getPaymentMethod() != null) {
            service.updatePaymentMethodById(id, request.getPaymentMethod());
        }
        return ResponseEntity.ok(updated);
    }
}