package com.web2.projeto_web2.maintenance_request_history;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MaintenanceRequestHistoryRepository extends JpaRepository<MaintenanceRequestHistory, UUID> {

List<MaintenanceRequestHistory> 
    findByMaintenanceRequestId(UUID maintenanceRequestId, Sort sort);
}
