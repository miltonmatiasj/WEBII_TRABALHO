package com.web2.projeto_web2.maintenante_request_budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MaintenanceRequestBudgetRepository extends JpaRepository<MaintenanceRequestBudget, UUID> {
}
