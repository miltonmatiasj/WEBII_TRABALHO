package com.web2.projeto_web2.maintenance_request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, UUID> {

    List<MaintenanceRequest> findByCustomerId(UUID customerId);

    List<MaintenanceRequest> findByEmployeeId(UUID employeeId);

    List<MaintenanceRequest> findByCategoryId(UUID categoryId);

    MaintenanceRequest getById(UUID id);

}