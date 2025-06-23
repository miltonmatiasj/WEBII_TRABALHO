package com.web2.projeto_web2.maintenante_request_budget;

import com.web2.projeto_web2.report.CategoryRevenueReport;
import com.web2.projeto_web2.report.DailyRevenueReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface MaintenanceRequestBudgetRepository extends JpaRepository<MaintenanceRequestBudget, UUID> {

    @Query(value = "SELECT * FROM maintenance_request_budget WHERE maintenance_request_id = ?1 LIMIT 1", nativeQuery = true)
    MaintenanceRequestBudget findByMaintenanceRequestId(UUID maintenanceRequestId);

    @Query("""
        SELECT new com.web2.projeto_web2.report.DailyRevenueReport(
            DATE(b.createdAt), SUM(b.price)
        )
        FROM MaintenanceRequestBudget b
        WHERE (:startDate IS NULL OR b.createdAt >= :startDate)
          AND (:endDate IS NULL OR b.createdAt <= :endDate)
          AND b.maintenanceRequest.status = com.web2.projeto_web2.maintenance_request.MaintenanceRequest.Status.FINALIZADA
        GROUP BY DATE(b.createdAt)
        ORDER BY DATE(b.createdAt)
    """)
    List<DailyRevenueReport> calculateDailyRevenue(
        @Param("startDate") Date startDate,
        @Param("endDate") Date endDate
    );

    @Query("""
        SELECT new com.web2.projeto_web2.report.CategoryRevenueReport(
            b.maintenanceRequest.category.categoryName,
            SUM(b.price)
        )
        FROM MaintenanceRequestBudget b
        WHERE b.maintenanceRequest.status = com.web2.projeto_web2.maintenance_request.MaintenanceRequest.Status.FINALIZADA
        GROUP BY b.maintenanceRequest.category.categoryName
        ORDER BY SUM(b.price) DESC
    """)
    List<CategoryRevenueReport> calculateRevenueByCategory();
}
