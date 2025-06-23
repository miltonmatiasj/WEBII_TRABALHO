package com.web2.projeto_web2.maintenance_request_history;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/maintenance-requests-history")
public class MaintenanceRequestHistoryController {

    private final MaintenanceRequestHistoryService maintenanceRequestHistoryService;

    public MaintenanceRequestHistoryController(MaintenanceRequestHistoryService maintenanceRequestHistoryService) {
        this.maintenanceRequestHistoryService = maintenanceRequestHistoryService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<MaintenanceRequestHistory>> getMaintenanceRequestById(@PathVariable UUID id) {
        List<MaintenanceRequestHistory> request = maintenanceRequestHistoryService.getHistoryByMaintenanceRequestId(id);

        return ResponseEntity.ok(request);
    }
}