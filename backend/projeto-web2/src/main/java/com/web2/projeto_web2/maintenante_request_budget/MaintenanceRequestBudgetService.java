package com.web2.projeto_web2.maintenante_request_budget;

import com.web2.projeto_web2.report.CategoryRevenueReport;
import com.web2.projeto_web2.report.DailyRevenueReport;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class MaintenanceRequestBudgetService {

    private final MaintenanceRequestBudgetRepository repository;

    public MaintenanceRequestBudgetService(MaintenanceRequestBudgetRepository repository) {
        this.repository = repository;
    }

    public MaintenanceRequestBudget createMaintenanceRequestBudget(MaintenanceRequestBudget request) {
        return repository.save(request);
    }

    public MaintenanceRequestBudget getMaintenanceRequestBudgetByRequestId(UUID requestId) {
        return repository.findByMaintenanceRequestId(requestId);
    }

    public List<DailyRevenueReport> getDailyRevenue(Date startDate, Date endDate) {
        return repository.calculateDailyRevenue(startDate, endDate);
    }

    public List<CategoryRevenueReport> getRevenueByCategory() {
        return repository.calculateRevenueByCategory();
    }
}
