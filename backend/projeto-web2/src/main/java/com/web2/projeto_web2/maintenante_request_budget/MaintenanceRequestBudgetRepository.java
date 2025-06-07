package com.web2.projeto_web2.maintenante_request_budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface MaintenanceRequestBudgetRepository extends JpaRepository<MaintenanceRequestBudget, UUID> {
    @Query(value = "select * from maintenance_request_budget where maintenance_request_id = ?1 limit 1", nativeQuery = true)
    MaintenanceRequestBudget findByMaintenanceRequestId(UUID maintenanceRequestId);
}
