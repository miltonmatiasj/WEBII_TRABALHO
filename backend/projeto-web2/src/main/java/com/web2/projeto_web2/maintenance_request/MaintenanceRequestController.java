package com.web2.projeto_web2.maintenance_request;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/maintenance-requests")
public class MaintenanceRequestController {

    private final MaintenanceRequestService service;

    public MaintenanceRequestController(MaintenanceRequestService service) {
        this.service = service;
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
}