package com.web2.projeto_web2.maintenance_request;

import com.web2.projeto_web2.maintenante_request_budget.MaintenanceRequestBudget;
import com.web2.projeto_web2.maintenante_request_budget.MaintenanceRequestBudgetService;
import com.web2.projeto_web2.users.User;
import com.web2.projeto_web2.users.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/maintenance-requests")
public class MaintenanceRequestController {

    private final MaintenanceRequestService service;
    private final UserService userService;
    private final MaintenanceRequestBudgetService maintenanceRequestBudgetService;

    public MaintenanceRequestController(
            MaintenanceRequestService service,
            MaintenanceRequestBudgetService maintenanceRequestBudgetService,
            UserService userService
    ) {
        this.service = service;
        this.userService = userService;
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
        if (request.getStatus() == MaintenanceRequest.Status.REDIRECIONADA && request.getEmployee().getId() != null) {
            User user = userService.getUserById(request.getEmployee().getId());
            if (user != null) {
                service.updateRequestUserId(id, user);
            }
        }
        return ResponseEntity.ok(updated);
    }
}