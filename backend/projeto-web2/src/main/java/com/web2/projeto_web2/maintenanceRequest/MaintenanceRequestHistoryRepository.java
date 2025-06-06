package com.web2.projeto_web2.maintenancerequesthistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface maintenancerequesthistoryRepository extends JpaRepository<maintenancerequesthistory, UUID> {

    List<maintenancerequesthistory> findByCustomerId(UUID customerId);

    List<maintenancerequesthistory> findByEmployeeId(UUID employeeId);

    List<maintenancerequesthistory> findByCategoryId(UUID categoryId);

    maintenancerequesthistory getById(UUID id);

}