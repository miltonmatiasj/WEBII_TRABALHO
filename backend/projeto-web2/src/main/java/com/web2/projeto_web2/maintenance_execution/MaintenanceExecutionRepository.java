package com.web2.projeto_web2.maintenance_execution;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MaintenanceExecutionRepository extends JpaRepository<MaintenanceExecution, UUID> {

}
