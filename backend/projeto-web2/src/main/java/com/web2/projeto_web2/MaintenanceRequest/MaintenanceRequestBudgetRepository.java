package com.web2.projeto_web2.MaintenanceRequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaintenanceRequestBudgetRepository extends JpaRepository<MintenanceRequestBudget, Long> {

    List<MintenanceRequestBudget> findByMaintenanceRequestId(Long maintenanceRequestId);

    Optional<MintenanceRequestBudget> findTopByMaintenanceRequestIdOrderByCreatedAtDesc(Long maintenanceRequestId);

    List<MintenanceRequestBudget> findByEmployeeId(Long employeeId);

    List<MintenanceRequestBudget> findByApprovedTrue();

    List<MintenanceRequestBudget> findByApprovedFalse();

    boolean existsByMaintenanceRequestId(Long maintenanceRequestId);

    List<MintenanceRequestBudget> findByCreatedAtBetween(java.time.LocalDateTime start, java.time.LocalDateTime end);

    List<MintenanceRequestBudget> findByValueGreaterThanEqual(Double minValue);

    List<MintenanceRequestBudget> findByValueLessThanEqual(Double maxValue);

    List<MintenanceRequestBudget> findByMaintenanceRequestIdAndApproved(Long maintenanceRequestId, Boolean approved);
}
