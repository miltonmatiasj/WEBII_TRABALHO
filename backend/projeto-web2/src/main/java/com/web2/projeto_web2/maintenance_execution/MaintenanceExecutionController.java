package com.web2.projeto_web2.maintenance_execution;

import com.web2.projeto_web2.maintenance_request.MaintenanceRequest;
import com.web2.projeto_web2.maintenance_request.MaintenanceRequestService;
import com.web2.projeto_web2.maintenance_request_history.MaintenanceRequestHistoryService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/api/maintenance-executions")
public class MaintenanceExecutionController {
    private final MaintenanceExecutionService service;
    private final MaintenanceRequestService maintenanceRequestService;
    private final MaintenanceRequestHistoryService maintenanceRequestHistoryService;
    public MaintenanceExecutionController(
            MaintenanceExecutionService service,
            MaintenanceRequestService maintenanceRequestService,
            MaintenanceRequestHistoryService maintenanceRequestHistoryService
    ) {
        this.service = service;
        this.maintenanceRequestService = maintenanceRequestService;
        this.maintenanceRequestHistoryService = maintenanceRequestHistoryService;
    }

    @PostMapping
    public ResponseEntity<MaintenanceExecution> createMaintenanceExecution(
            @Valid @RequestBody MaintenanceExecution execution) {
        MaintenanceExecution saved = service.createMaintenanceExecution(execution);
        maintenanceRequestService.updateMaintenanceRequestStatusById(saved.getMaintenanceRequest().getId(), MaintenanceRequest.Status.ARRUMADA);
        maintenanceRequestHistoryService.registrarHistorico("MANUTENÇÃO EFETUADA", saved.getMaintenanceRequest(), saved.getEmployee());
        return ResponseEntity
                .created(URI.create("/api/maintenance-executions/" + saved.getId()))
                .body(saved);
    }

    @GetMapping
    public ResponseEntity<Iterable<MaintenanceExecution>> getAllMaintenanceExecutions() {
        Iterable<MaintenanceExecution> executions = service.getAllMaintenanceExecutions();
        return ResponseEntity.ok(executions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceExecution> getMaintenanceExecutionById(@PathVariable("id") UUID id) {
        MaintenanceExecution execution = service.getMaintenanceExecutionById(id);
        return ResponseEntity.ok(execution);
    }
}
