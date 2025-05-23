package com.web2.projeto_web2.maintenanceRequest;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/maintenance-requests")
public class MaintenanceRequestController {

    private final MaintenanceRequestService service;

    public MaintenanceRequestController(MaintenanceRequestService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<MaintenanceRequest> createMaintenanceRequest(
            @Valid @RequestBody MaintenanceRequest request) {
        MaintenanceRequest saved = service.createMaintenanceRequest(request);
        return ResponseEntity
                .created(URI.create("/api/maintenance-requests/" + saved.getId()))
                .body(saved);
    }

    // UPDATE STATUS
    @PatchMapping("/{id}/status")
    public ResponseEntity<MaintenanceRequest> updateStatus(
            @PathVariable UUID id,
            @RequestParam("newStatus") MaintenanceRequest.Status newStatus) {
        MaintenanceRequest updated = service.updateMaintenanceRequestStatusById(id, newStatus);
        return ResponseEntity.ok(updated);
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<MaintenanceRequest>> getAllMaintenanceRequests() {
        return ResponseEntity.ok(service.getAllMaintenanceRequests());
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRequest> getById(@PathVariable UUID id) {
        MaintenanceRequest req = service.getMaintenanceRequestById(id);
        return ResponseEntity.ok(req);
    }

    // READ BY EMPLOYEE
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<MaintenanceRequest>> getByEmployee(
            @PathVariable UUID employeeId) {
        return ResponseEntity.ok(service.getAllEmployeeMaintenanceRequests(employeeId));
    }

    // READ BY CUSTOMER
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<MaintenanceRequest>> getByCustomer(
            @PathVariable UUID customerId) {
        return ResponseEntity.ok(service.getAllCustomerMaintenanceRequests(customerId));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.deleteMaintenanceRequest(id);
        return ResponseEntity.noContent().build();
    }
}