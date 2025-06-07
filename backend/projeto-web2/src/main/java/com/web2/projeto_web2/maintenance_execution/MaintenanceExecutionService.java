package com.web2.projeto_web2.maintenance_execution;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MaintenanceExecutionService {
    private final MaintenanceExecutionRepository repository;

    public MaintenanceExecutionService(MaintenanceExecutionRepository repository) {
        this.repository = repository;
    }

    public MaintenanceExecution createMaintenanceExecution(MaintenanceExecution execution) {
        return repository.save(execution);
    }

    public Iterable<MaintenanceExecution> getAllMaintenanceExecutions() {
        return repository.findAll();
    }

    public MaintenanceExecution getMaintenanceExecutionById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Maintenance Execution not found with id: " + id));
    }
}
