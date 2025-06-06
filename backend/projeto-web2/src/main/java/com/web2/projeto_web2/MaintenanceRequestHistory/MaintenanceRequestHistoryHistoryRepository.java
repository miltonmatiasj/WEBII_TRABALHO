package com.web2.projeto_web2.maintenancerequesthistoryhistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface maintenancerequesthistoryHistoryRepository extends JpaRepository<maintenancerequesthistoryHistory, UUID> {

    List<maintenancerequesthistoryHistory> findBymaintenancerequesthistoryId(UUID maintenancerequesthistoryId);
}
