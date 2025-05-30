package com.web2.projeto_web2.maintenance.repository;

import com.web2.projeto_web2.maintenance.entity.MaintenanceExecutionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MaintenanceExecutionRepository extends JpaRepository<MaintenanceExecutionEntity, UUID> {

    List<MaintenanceExecutionEntity> findByMaintenanceRequestId(UUID maintenanceRequest);
}