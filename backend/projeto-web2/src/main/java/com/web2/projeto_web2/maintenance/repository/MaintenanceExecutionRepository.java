package com.web2.projeto_web2.maintenance.repository;

import com.web2.projeto_web2.maintenance.entity.MaintenanceExecutionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

public interface MaintenanceExecutionRepository extends JpaRepository<MaintenanceExecutionEntity, UUID> {

    List<MaintenanceExecutionEntity> findByEmployeeId(int employeeId);

    List<MaintenanceExecutionEntity> findByMaintenanceRequestId(int maintenanceRequestId);

    List<MaintenanceExecutionEntity> findByEmployeeIdAndCreatedAtBetween(int employeeId, LocalDateTime start, LocalDateTime end);

    List<MaintenanceExecutionEntity> findByCreatedAtAfter(LocalDateTime date);

    long countByEmployeeId(int employeeId);

    List<MaintenanceExecutionEntity> searchByDescriptionContaining(String keyword);
}
